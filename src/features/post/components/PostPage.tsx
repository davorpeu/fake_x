import {Post, Comment} from '../../../types/posts.types'
import { CommentList } from './CommentList';
import { SharedLogger } from '../../../components/SharedLogger';
import { Spin, Typography, Space, Button } from 'antd';

const { Title, Paragraph } = Typography;

interface PostDetailProps {
    post: Post | null;
    comments: Comment[];
    loading: boolean;
    onBack: () => void;
}

export const PostPage = ({ post, comments, loading, onBack }: PostDetailProps) => {
    if (loading) {
        return (
            <div style={{
                padding: '32px 16px',
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
                padding: '32px 16px',
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
                    onClick={onBack}
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