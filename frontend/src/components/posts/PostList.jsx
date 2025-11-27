import PostItem from "./PostItem";

const PostList = ({ posts, currentUser }) => {
    return (
        <>
            <div>
                {
                    posts.length > 0 ? (
                        posts.map(post => <PostItem key={post._id} post={post} currentUser={currentUser} />)) : (
                        <p>Chưa có bài viết nào.</p>
                    )
                }
            </div>
        </>
    );
};

export default PostList;