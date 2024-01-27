import { useGetRecentPosts } from "@/lib/react-query/queryAndMutation"
import { Loader } from "@/components/shared/Loader"
import { Models } from "appwrite"
import PostCard from "@/components/shared/PostCard"

const Home = () => {
  const {data: posts, isPending: isPostLoading} = useGetRecentPosts()

  return (
    <>
   <div className="flex flex-1">
      <div className="home-container">
          <div className="home-posts">
              <h2 className="h3-hold md:h2-bold text-left w-full">
                Home Feed
              </h2>
              {isPostLoading && !posts ? (
                  <Loader />
              ) : (
                <ul className="flex flex-col flex-1 gap-9 w-full ">
                    {
                      posts?.documents.map((post: Models.Document) => (
                        <li key={post.caption}>
                          {
                            <PostCard post={ post } />
                          }
                        </li>
                      ))
                    }
                </ul>
              )
                
              }
          </div>
      </div>
    </div>
    </>
  )
}

export default Home