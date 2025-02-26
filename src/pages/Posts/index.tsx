import { usePosts } from '../../features/posts/hooks/usePosts';
import { PostCard } from '../../components/PostCard';
import { SharedLogger } from '../../components/SharedLogger';
import {Col, Row} from "antd";

export const PostsPage = () => {
    const { posts, loading, searchTerm, setSearchTerm } = usePosts();

    return (

        <div className="container mx-auto p-4">
            <Row>
                <Col span={8}></Col>
                <Col span={8}>  <SharedLogger helloFrom="PostsPage" />
                    <h1 className="text-2xl font-bold mb-4">Posts</h1>
                    <input
                        type="text"
                        placeholder="Search by user name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 mt-2 mb-2 border rounded"
                    />
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div

                        >
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
                    )}</Col>
                <Col span={8}></Col>

            </Row>

        </div>
    );
};