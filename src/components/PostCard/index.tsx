import { Link } from 'react-router-dom';
import { SharedLogger } from '../SharedLogger';

interface PostCardProps {
    id: number;
    title: string;
    body: string;
    userName: string;
}

export const PostCard = ({ id, title, body, userName }: PostCardProps) => {
    return (
        <div className="border p-4 mb-4 rounded">
            <SharedLogger helloFrom="PostCard" />
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-gray-600">By: {userName}</p>
            <p>{body}</p>
            <Link to={`/post/${id}`} className="text-blue-500 hover:underline">
                View Details
            </Link>
        </div>
    );
};