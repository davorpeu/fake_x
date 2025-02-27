import { Comment as CommentType } from '../../features/posts/types/posts.types';
import { SharedLogger } from '../SharedLogger';
import { List, Typography  } from 'antd';

const { Text, Paragraph, Title } = Typography;

interface CommentListProps {
    comments: CommentType[];
}

export const CommentList = ({ comments }: CommentListProps) => {
    return (
        <div style={{ marginTop: 16 }}>
            <SharedLogger helloFrom="CommentList" />
            <Title
                level={4}
                style={{
                    textAlign: 'left',
                    fontSize: '18px',
                    color: '#1A91DA', // Blue accent for headers
                    marginBottom: '16px'
                }}
            >
                Comments
            </Title>
            <List
                dataSource={comments}
                renderItem={(comment) => (
                    <List.Item style={{ padding: '16px 0' }}>
                        <div style={{ width: '100%' }}>
                            <Text
                                type="secondary"
                                style={{
                                    fontSize: '13px', // Smaller for metadata
                                    color: '#657786', // Muted gray
                                    display: 'block',
                                    marginBottom: '4px',
                                    textAlign: 'left'
                                }}
                            >
                                {comment.email}
                            </Text>
                            <Text
                                strong
                                style={{
                                    textAlign: 'left',
                                    fontSize: '15px', // Slightly larger for name
                                    color: '#0F1419', // Darker for emphasis
                                    display: 'block',
                                    marginBottom: '8px',
                                }}
                            >
                                {comment.name}
                            </Text>
                            <Paragraph
                                style={{
                                    textAlign: 'left',
                                    marginBottom: 0,
                                    fontSize: '15px', // Readable body text
                                    color: '#0F1419',
                                    lineHeight: '1.4', // Better spacing
                                }}
                            >
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