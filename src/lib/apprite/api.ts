import {  INewPost, INewUser, IUpdatePost } from "../types";
import { ID, Query} from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";


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


export const getInfinitePosts = async ({ pageParam }: { pageParam: number }) => {
    const queries: string[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

    
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }


  
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        queries
      );
      
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
export const getInfiniteUsers = async ({ pageParam }: { pageParam: number }) => {
    const queries: string[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];

    
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }


  
    try {
      const users = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        queries
      );
      
      if (!users) throw Error;
  
      return users;
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
export const signOutAccount = async () => {
    try {
        const deleteSession = await account.deleteSession("current")
        return deleteSession;
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

export const createPost = async (post : INewPost) => {
    try {
        const uploadedFile = await uploadFile(post.file[0])
        if (!uploadedFile) throw Error

        const fileUrl = getFilePreview(uploadedFile.$id)
        if (!fileUrl) {
            await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id)
            throw Error
        }

        const tags = post.tags?.replace(/ /g, '').split(',') || [];

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl.href,
                ImageId: uploadedFile.$id,
                location: post.location,
                tags: tags
            }
        )

        if (!newPost) {
            await storage.deleteFile(appwriteConfig.storageId, uploadedFile.$id)
            throw Error
        }

        return newPost
    } catch (error) {
        console.log(error)
    }
}

export const uploadFile = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )

        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}

export const getFilePreview = (fileId: string) => {
    const fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "bottom",
        100
    )

    return fileUrl
}


export const getRecentPosts = async () => {
    const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if (!posts) throw Error

    return posts
}

export async function getUserById(userId: string) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPosts(userId?: string) {
    if (!userId) return;
  
    try {
      const post = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
    }
  }

export const likePost = async (postId: string, likesArray:string[]) => {
    try {        
        const updatePost = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            postId,
            {
                likes: likesArray
            }
        )
    
        if (!updatePost) throw Error
    
        return updatePost
    } catch (error) {
        console.log(error)
    }


}

export const savePost = async (postId: string, userId: string) => {
    try {
        const createSave = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            ID.unique(),
            {
                post: postId,
                user: userId
            }
        )

        if (!createSave) throw Error

        return createSave
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteSavedPost = async (savedRecordId: string) => {
    try {
        const statusCode = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.savesCollectionId,
            savedRecordId
        )
    
        if (!statusCode) throw Error
    
        return statusCode
        
    } catch (error) {
        console.log(error)
    }
}


export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl.href,
          ImageId: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;
  
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      if (!statusCode) throw Error;
  
      await deleteFile(imageId);
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getPostById(postId?: string) {
    if (!postId) throw Error;
  
    try {
      const post = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        postId
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
  
      return { status: "ok" };
    } catch (error) {
      console.log(error);
    }
  }

  export async function searchPosts(searchTerm: string) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        [Query.search("caption", searchTerm)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
    }
  }

  