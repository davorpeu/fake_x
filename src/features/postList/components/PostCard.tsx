import { Link } from 'react-router-dom';
import { SharedLogger } from '../../../components/SharedLogger';
import { Card } from 'antd';

interface PostCardProps {
    id: number;
    title: string;
    body: string;
    userName: string;
    className?: string;
}

export const PostCard = ({ id, title, body, userName, className }: PostCardProps) => {
    return (
        <Card
            title={title}
            style={{
                marginTop: 16,
                padding: 16,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
            }}
            className={className}
        >
            <SharedLogger helloFrom="PostCard" />
            <p style={{ color: '#666', marginBottom: 8 }}>
                By: {userName}
            </p>
            <p style={{ marginBottom: 16 }}>{body}</p>
            <Link
                to={`/post/${id}`}
                reloadDocument
                style={{
                    color: '#1890ff',
                    textDecoration: 'none',
                    position: 'relative',

                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
                View Details
            </Link>
        </Card>
    );
};