import { usePosts } from '../../features/posts/hooks/usePosts';
import { PostCard } from '../../components/PostCard';
import { SharedLogger } from '../../components/SharedLogger';

export const PostsPage = () => {
    const { posts, loading, searchTerm, setSearchTerm } = usePosts();

    return (
        <div className="container mx-auto p-4">
            <SharedLogger helloFrom="PostsPage" />
            <h1 className="text-2xl font-bold mb-4">Posts</h1>
            <input
                type="text"
                placeholder="Search by user name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            body={post.body}
                            userName={post.userName}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};