import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments } from '../../features/posts/api/posts.Api';
import { Post, Comment } from '../../features/posts/types/posts.types';
import { CommentList } from '../../components/CommentList';
import { SharedLogger } from '../../components/SharedLogger';

export const PostDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadPostData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const [postData, commentsData] = await Promise.all([
                    fetchPost(id),
                    fetchComments(id)
                ]);
                setPost(postData);
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching post data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadPostData();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!post) return <p>Post not found</p>;

    return (
        <div className="container mx-auto p-4">
            <SharedLogger helloFrom="PostDetailPage" />
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <p>{post.body}</p>
            <CommentList comments={comments} />
        </div>
    );
};