import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost, fetchComments } from '../../features/posts/api/posts.Api';
import { Post, Comment } from '../../features/posts/types/posts.types';
import { CommentList } from '../../components/CommentList';
import { SharedLogger } from '../../components/SharedLogger';
import { Spin, Typography, Space, Button } from 'antd';

const { Title, Paragraph } = Typography;

export const PostDetailPage = () => {
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

    if (loading) {
        return (
            <div style={{
                padding: '32px 16px', // Match main container padding
                height: '100vh',
                backgroundColor: '#F7F9FC'
            }}>
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{
                padding: '32px 16px', // Match main container padding
                backgroundColor: '#F7F9FC',
                minHeight: '100vh'
            }}>
                <Paragraph type="danger" style={{ color: '#FF4D4F' }}>
                    Post not found
                </Paragraph>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: 800,
            margin: '0 auto',
            padding: '32px 16px',
            backgroundColor: '#F7F9FC',
            minHeight: '100vh'
        }}>
            <SharedLogger helloFrom="PostDetailPage" />
            <div style={{
                textAlign: 'left',
                marginBottom: '16px' }}>
                <Button
                    onClick={() => navigate(-1)}
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#E6ECF0',
                        color: '#0F1419',
                        borderRadius: '8px'
                    }}
                >
                    ← Back
                </Button>
            </div>
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: '24px',
                    border: '1px solid #E6ECF0',
                    marginBottom: '24px',
                }}
            >
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Title
                        level={2}
                        style={{
                            margin: 0,
                            fontSize: '24px',
                            fontWeight: 600,
                            color: '#0F1419',
                            textAlign: 'left'
                        }}
                    >
                        {post.title}
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: '16px',
                            color: '#536471',
                            lineHeight: '1.5',
                            textAlign: 'left'
                        }}
                    >
                        {post.body}
                    </Paragraph>
                </Space>
            </div>
            <div>
                <CommentList comments={comments} />
            </div>
        </div>
    );
};