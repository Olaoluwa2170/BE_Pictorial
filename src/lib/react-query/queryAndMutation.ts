import { useMutation} from "@tanstack/react-query";
import { createPost, createUserAccount, signInAccount, signOutAccount } from "../apprite/api";
import { INewPost, INewUser } from "../types";

// useCreateUserAccountMutation

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInAccount = () => { 
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    })
}
export const useSignOutAccount = () => { 
    return useMutation({
        mutationFn: signOutAccount
    })
}
 

export const useCreatePost = () => {
    return useMutation({
        mutationFn: (post: INewPost) => createPost(post)
    })
}