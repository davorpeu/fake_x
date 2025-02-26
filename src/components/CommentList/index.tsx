import { Comment as CommentType } from '../../features/posts/types/posts.types';
import { SharedLogger } from '../SharedLogger';
import { List, Typography,  } from 'antd';

const { Text, Paragraph } = Typography;

interface CommentListProps {
    comments: CommentType[];
}

export const CommentList = ({ comments }: CommentListProps) => {
    return (
        <div style={{ marginTop: 16 }}>
            <SharedLogger helloFrom="CommentList" />
            <List
                header={<Text strong style={{ fontSize: 18 }}>Comments</Text>}
                dataSource={comments}
                renderItem={(comment) => (
                    <List.Item style={{ padding: '16px 0' }}>
                        <div style={{ width: '100%' }}>
                            <Text strong style={{ fontSize: 14, display: 'block' }}>
                                {comment.name}
                            </Text>
                            <Text type="secondary" style={{ fontSize: 12, marginBottom: 8, display: 'block' }}>
                                {comment.email}
                            </Text>
                            <Paragraph style={{ marginBottom: 0 }}>
                                {comment.body}
                            </Paragraph>
                        </div>
                    </List.Item>
                )}
                split={true} // Enables dividers between items
                locale={{ emptyText: 'No comments yet' }} // Custom message when empty
            />
        </div>
    );
};