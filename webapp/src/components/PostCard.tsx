import {
    Avatar,
    Button,
    Card,
    Flex,
    Text,
    UnstyledButton,
} from '@mantine/core';
import { NavLink, useNavigate } from 'react-router';
import Comment from './postutilities/Comment';
import Like from './postutilities/Like';
import { ellipsis } from '../scripts/ellipsis';
import Markdown from 'markdown-to-jsx';

//FAIRE GET POUR AFFICHER LES INFORMATIONS

const formatetdDate = Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
});

const PostCard = ({
    title,
    content,
    likeCount,
    commentCount,
    id,
    isLiked,
    author: { id: authID, username },
    createdAt,
}: {
    title: string;
    content: string;
    likeCount: number;
    commentCount: number;
    id: number;
    isLiked: boolean;
    author: {
        username: string;
        id: number;
    };
    createdAt: string;
}) => {
    let createdAtValue = '';
    try {
        createdAtValue = createdAt
            ? formatetdDate.format(new Date(parseInt(createdAt)))
            : '';
    } catch (error) {
        console.error('Error formatting date:', error);
    }
    const n = useNavigate();
    return (
        <Card p={'sm'}>
            <Card.Section py="sm" inheritPadding withBorder>
                <Flex
                    justify="flex-start"
                    align="flex-start"
                    direction="column"
                    wrap="wrap"
                >
                    <UnstyledButton component={NavLink} to={`/post/${id}`}>
                        <Text maw={400} truncate="end" size="xl">
                            {title}
                        </Text>
                    </UnstyledButton>
                    <Flex
                        justify={'center'}
                        align={'baseline'}
                        mt={10}
                        gap={10}
                    >
                        <UnstyledButton
                            component={NavLink}
                            to={`/user/${authID}`}
                            style={{
                                display: 'flex',
                                gap: 10,
                                alignItems: 'center',
                            }}
                        >
                            <Avatar name={username} color="initials" />
                            <Text>{ellipsis(username, 30)}</Text>
                        </UnstyledButton>
                        <Text size="xs">{createdAtValue}</Text>
                    </Flex>
                </Flex>
            </Card.Section>
            {/* <Text flex={1} mt={'md'} lineClamp={3}> */}
            <Markdown
                style={{
                    flex: 1,
                }}
            >
                {content}
            </Markdown>
            {/* </Text> */}
            <Flex mt={'xs'} gap="xs" justify={'space-between'}>
                <Flex gap={'xs'}>
                    <Like
                        count={likeCount}
                        isDefaultLiked={isLiked}
                        articleId={id}
                    />
                    <Comment
                        count={commentCount}
                        onClick={() => {
                            n(`/post/${id}?scroll`);
                        }}
                    />
                </Flex>
                <Flex>
                    {/* // Onclick de redirection */}
                    <Button
                        component={NavLink}
                        to={`/post/${id}`}
                        variant="light"
                    >
                        Read more
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default PostCard;
