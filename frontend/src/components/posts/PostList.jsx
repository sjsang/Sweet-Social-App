import PostItem from "./PostItem";
import PostItemSkeleton from "../posts/PostItemSkeleton";

const PostList = ({ posts, loggedInUserId, loading }) => {
    if (loading) {
        return (
            <div>
                {Array.from({ length: 7 }).map((_, i) => (
                    <PostItemSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div>
            {posts.length !== 0
                ? (
                    posts.map(post => (
                        <PostItem
                            key={post._id}
                            post={post}
                            loggedInUserId={loggedInUserId}
                        />
                    ))
                ) : (
                    <p className="w-full p-1 text-center bg-white shadow rounded-lg">Không có bài viết.</p>
                )
            }
        </div>
    );
};

export default PostList;