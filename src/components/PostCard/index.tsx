import { Link } from 'react-router-dom';
import { SharedLogger } from '../SharedLogger';
import { Card } from 'antd';

interface PostCardProps {
    id: number;
    title: string;
    body: string;
    userName: string;
}

export const PostCard = ({ id, title, body, userName }: PostCardProps) => {
    return (
        <Card
            title={title}
            style={{
                marginTop: 16, // Adds margin above the card (equivalent to mt-4 in Tailwind)
                padding: 16,   // Adds internal padding to the card content
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Optional: subtle shadow for depth
            }}
        >
            <SharedLogger helloFrom="PostCard" />
            <p style={{ color: '#666', marginBottom: 8 }}>
                By: {userName}
            </p>
            <p style={{ marginBottom: 16 }}>{body}</p>
            <Link
                to={`/post/${id}`}
                style={{
                    color: '#1890ff', // Ant Design's default blue
                    textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
                View Details
            </Link>
        </Card>
    );
};