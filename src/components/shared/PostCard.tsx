import { Models } from "appwrite"
import { Link } from "react-router-dom"

const PostCard = ({ post }: Models.Document) => {
  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
            <Link to={`/profile/${post.creator.$id}`}>
                
            </Link>
        </div>
      </div>
    </div>
  )
}

export default PostCard
