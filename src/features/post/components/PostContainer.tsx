import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, fetchComments } from '../api/post.Api';
import { Post, Comment } from '../types/post.types';
import { PostPage } from './PostPage';

export const PostContainer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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
                    fetchComments(id),
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

    const handleBack = () => navigate(-1);

    return (
        <PostPage
            post={post}
            comments={comments}
            loading={loading}
            onBack={handleBack}
        />
    );
};