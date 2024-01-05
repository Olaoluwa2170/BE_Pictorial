import { Dispatch, ReactNode, SetStateAction, createContext, useState, useContext, useEffect } from "react"
import {IContextType, IUser} from "@/lib/types"
import { getCurrentUser } from "@/lib/apprite/api"
import { useNavigate } from "react-router-dom";




    const INITIAL_USER: IUser = {
        id: "",
        name: "",
        email: "",
        username: "",
        imageUrl: "",
        bio: "",
    };

    const INITIAL_STATE: IContextType = {
        user: INITIAL_USER,
        isAuthenticated: false,
        isLoading: false,
        setUser: () => {},
        setIsAuthenticated: () => {},
        checkAuthUser: async () => false as boolean
    };

    export const AuthContext = createContext<IContextType>(INITIAL_STATE);

    const AuthProvider = ({ children }: { children: ReactNode }) => {
        const [user, setUser] = useState<IUser>(INITIAL_USER);
        const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const navigate = useNavigate()

        async function checkAuthUser(): Promise<boolean> {
            try {
                const currentAccount = await getCurrentUser();

                if (currentAccount) {
                    setUser({
                        id: currentAccount.$id,
                        name: currentAccount.name,
                        username: currentAccount.username,
                        email: currentAccount.email,
                        imageUrl: currentAccount.imageUrl,
                        bio: currentAccount.bio,
                    });
                    setIsAuthenticated(true);

                    return true;
                }
                
                return false;
            } catch (error) {
                console.log(error);
                return false;
            } finally {
                setIsLoading(false);
            }
        }

       useEffect(() => {
            if (
                localStorage.getItem('cookieFallback') === '[]' || 
                localStorage.getItem('cookieFallback') === ''
            ) navigate('/sign-in')

            checkAuthUser()
       }, [])

        const value: IContextType = {
            user,
            setUser: setUser as Dispatch<SetStateAction<IUser>>,
            isAuthenticated,
            setIsAuthenticated: setIsAuthenticated as Dispatch<SetStateAction<boolean>>,
            isLoading,
            checkAuthUser,
        };

        return (
            <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
        );
    };

    export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext)
