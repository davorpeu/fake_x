import { Comment } from '../../features/posts/types/posts.types';
import { SharedLogger } from '../SharedLogger';

interface CommentListProps {
    comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => {
    return (
        <div>
            <SharedLogger helloFrom="CommentList" />
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
    {comments.map(comment => (
        <div key={comment.id} className="border-b py-2">
    <p className="font-medium">{comment.name}</p>
        <p className="text-sm text-gray-600">{comment.email}</p>
        <p>{comment.body}</p>
        </div>
    ))}
    </div>
);
};