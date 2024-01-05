import {  INewUser } from "../types";
import { ID, Query} from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";


export const createUserAccount = async(user: INewUser) => {
    try {
        
        const newAccount = await account.create(
                ID.unique(),
                user.email,
                user.password,
                user.name,
            )   
        
        if (!newAccount) throw Error;
        
        const avatarUrl = avatars.getInitials(user.name)
       
        
        const newUser = await saveUserToDB(
            {accountId: newAccount.$id,
            email : newAccount.email,
            imageUrl : avatarUrl,
            name: newAccount.name,
            username: user.username,}

        )
        return newUser;
    } catch (error) {
        console.log(error);
    }


}


export const saveUserToDB = async (
    user: {
        accountId: string,
        email: string,
        imageUrl: URL,
        username: string,
        name: string,

    }
) => {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
           
        )

        return newUser;
    } catch (error) {
        console.log(error)
    }
}

export const signInAccount = async (user: {
    email: string,
    password: string
}) => {
    try {
        const session = await account.createEmailSession(user.email, user.password)
        return session;
    } catch (error) {
        console.log(error)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [
                Query.equal('accountId', currentAccount.$id)
            ]
        )
        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

