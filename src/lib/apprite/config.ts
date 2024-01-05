import { Client, Databases, Storage, Avatars, Account } from "appwrite";


export const appwriteConfig = {
    projectId: import.meta.env.VITE_APP_APPWRITE_PROJECT_ID,
    endpoint: import.meta.env.VITE_APP_APPWRITE_ENDPOINT,
    databaseId: import.meta.env.VITE_APP_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APP_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APP_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APP_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APP_APPWRITE_SAVES_COLLECTION_ID
}


export const appwrite = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)

export const storage = new Storage(appwrite)
export const avatars = new Avatars(appwrite)    
export const account = new Account(appwrite)
export const databases = new Databases(appwrite)



// trying()


