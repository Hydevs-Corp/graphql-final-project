import { ApolloQueryResult, useMutation } from '@apollo/client';
import { Avatar, Box, Button, Card, Flex, Text, Textarea } from '@mantine/core';
import { useField } from '@mantine/form';
import { Exact, PostQuery, Scalars } from '../gql/graphql';
import { AuthProvider } from '../providers/AuthProvider';
import addComment_MUTATE from '../scripts/requests/addComment';

const CommentSection = ({
    postId,
    comments = [],
    invalidate,
    ref,
}: {
    postId: number;
    ref: React.RefObject<HTMLTextAreaElement | null>;
    comments: {
        author: {
            username: string;
        };
        content: string;
        createdAt: string;
        id: number;
    }[];
    invalidate: (
        variables?:
            | Partial<
                  Exact<{
                      id: Scalars['Int']['input'];
                  }>
              >
            | undefined
    ) => Promise<ApolloQueryResult<PostQuery>>;
}) => {
    const field = useField({
        initialValue: '',
    });
    const { token } = AuthProvider.use();

    const [createComment, { loading }] = useMutation(addComment_MUTATE);

    const submit = async () => {
        await createComment({
            variables: {
                articleId: postId,
                content: field.getValue(),
            },
        });
        await invalidate({
            id: postId,
        });
        field.setValue('');
    };

    return (
        <Box style={{ marginBottom: 20 }}>
            {token && (
                <>
                    <Textarea
                        autoFocus
                        ref={ref}
                        label="Write a comment"
                        {...field.getInputProps()}
                        autosize
                        maxRows={8}
                    />
                    <Button onClick={submit} mt="md" loading={loading}>
                        Submit comment
                    </Button>
                </>
            )}
            <Box
                mt="md"
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
                {comments.length === 0 && (
                    <Text c={'dimmed'}>No comments yet</Text>
                )}
                {comments.map((comment) => (
                    <Card key={comment.id} p="sm">
                        <Flex justify={'space-between'}>
                            <Flex align="center" gap="sm">
                                <Avatar
                                    name={comment.author.username}
                                    color="initials"
                                />
                                <Text>{comment.author.username}</Text>
                            </Flex>
                            <Text>
                                {new Date(
                                    parseInt(comment.createdAt)
                                ).toLocaleString('en-US', {
                                    month: 'long',
                                    year: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit',
                                })}
                            </Text>
                        </Flex>
                        <Text mt={'sm'}>{comment.content}</Text>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default CommentSection;
