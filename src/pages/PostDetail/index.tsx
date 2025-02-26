import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPost, fetchComments } from '../../features/posts/api/posts.Api';
import { Post, Comment } from '../../features/posts/types/posts.types';
import { CommentList } from '../../components/CommentList';
import { SharedLogger } from '../../components/SharedLogger';
import { Card, Spin, Typography, Space } from 'antd';

const { Title, Paragraph } = Typography;

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
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" tip="Loading..." />
            </div>
        );
    }

    if (!post) {
        return (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Paragraph type="danger">Post not found</Paragraph>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
            <SharedLogger helloFrom="PostDetailPage" />
            <Card
                style={{
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
            >
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Title level={2} style={{ marginBottom: 0 }}>
                        {post.title}
                    </Title>
                    <Paragraph style={{ fontSize: 16, color: '#595959' }}>
                        {post.body}
                    </Paragraph>
                    <div>
                        <Title level={4}>Comments</Title>
                        <CommentList comments={comments} />
                    </div>
                </Space>
            </Card>
        </div>
    );
};