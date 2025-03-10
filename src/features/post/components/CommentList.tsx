import { Comment as CommentType } from '../types/post.types';
import { SharedLogger } from '../../../components/SharedLogger';
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
                    color: '#1A91DA',
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
                                    fontSize: '13px',
                                    color: '#657786',
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
                                    fontSize: '15px',
                                    color: '#0F1419',
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
                                    fontSize: '15px',
                                    color: '#0F1419',
                                    lineHeight: '1.4',
                                }}
                            >
                                {comment.body}
                            </Paragraph>
                        </div>
                    </List.Item>
                )}
                split={true}
                locale={{ emptyText: 'No comments yet' }}
            />
        </div>
    );
};