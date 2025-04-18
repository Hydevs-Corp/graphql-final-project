import {
    ActionIcon,
    Box,
    Container,
    Divider,
    Flex,
    Group,
    Loader,
    SegmentedControl,
    SimpleGrid,
    Table,
    Text,
    Title,
    Tooltip,
    useMatches,
} from '@mantine/core';

import { useQuery } from '@apollo/client';
import { IconArrowRight } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { NavLink, useParams } from 'react-router';
import { FlyProvider } from '../providers/FlyProvider';
import { ellipsis } from '../scripts/ellipsis';
import getUserByID_QUERY from '../scripts/requests/getUserByID';
import { AuthProvider } from '../providers/AuthProvider';

const UserSettings = () => {
    const { user } = AuthProvider.use();
    const { id } = useParams();

    const { data, refetch, loading } = useQuery(getUserByID_QUERY, {
        variables: {
            id: parseInt(id!),
        },
        refetchWritePolicy: 'merge',
    });

    const dividerOrientation = useMatches<'horizontal' | 'vertical'>({
        base: 'horizontal',
        md: 'vertical',
    });

    useEffect(() => {
        refetch({
            id: parseInt(id!),
        });
    }, [id]);

    const articlesTable = useMemo(() => {
        if (!data?.getUserById?.articles) return [];

        return data.getUserById.articles.map((article) => (
            <Table.Tr key={`${article?.id}-${article?.title}`}>
                <Table.Td>{ellipsis(article?.title || 'empty', 12)}</Table.Td>
                <Table.Td>{article?.likeCount}</Table.Td>
                <Table.Td>{article?.commentCount}</Table.Td>
                <Table.Td>
                    {new Date(parseInt(article?.createdAt!)).toLocaleDateString(
                        'en-US',
                        {
                            month: 'long',
                            year: 'numeric',
                            day: 'numeric',
                        }
                    )}
                </Table.Td>
                <Table.Td>
                    <Group justify="end">
                        <Tooltip label="Go to article">
                            <ActionIcon
                                variant="light"
                                color="blue"
                                component={NavLink}
                                to={`/post/${article?.id}`}
                            >
                                <IconArrowRight />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
            </Table.Tr>
        ));
    }, [data]);

    const likeTable = useMemo(() => {
        if (!data?.getUserById?.likes) return [];

        return data.getUserById.likes.map((like) => (
            <Table.Tr key={`${like?.article?.author}-${like?.article?.title}`}>
                <Table.Td>
                    {ellipsis(like?.article.title || 'empty', 12)}
                </Table.Td>
                <Table.Td>{like?.article.author.username}</Table.Td>
                <Table.Td>
                    <Group justify="end">
                        <Tooltip label="Go to article">
                            <ActionIcon
                                variant="light"
                                color="blue"
                                component={NavLink}
                                to={`/post/${like?.article.id}`}
                            >
                                <IconArrowRight />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Table.Td>
            </Table.Tr>
        ));
    }, [data]);

    const { hasFly, setHasFly } = FlyProvider.use();

    return (
        <Container
            style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}
        >
            <Title mt={'md'}>
                User data |{' '}
                <Text
                    variant="gradient"
                    fw={'bold'}
                    gradient={{ from: 'red.4', to: 'red.8' }}
                    span
                    size="1em"
                >
                    {data?.getUserById?.username}
                </Text>
            </Title>
            <Divider />
            {loading && <Loader w={'100%'} style={{ alignSelf: 'center' }} />}
            <SimpleGrid spacing={0} cols={{ base: 1, md: 2 }}>
                <Flex
                    direction={{
                        base: 'column',
                        md: 'row',
                    }}
                >
                    <Box w={'100%'}>
                        <Title order={3}>Article(s)</Title>
                        <Table w={'100%'}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Title</Table.Th>
                                    <Table.Th>Likes</Table.Th>
                                    <Table.Th>Comments</Table.Th>
                                    <Table.Th>Creation date</Table.Th>
                                    <Table.Th></Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{articlesTable}</Table.Tbody>
                        </Table>
                    </Box>
                    <Divider
                        mx={{
                            base: 0,
                            md: 'md',
                        }}
                        my={{
                            base: 'md',
                            md: 0,
                        }}
                        orientation={dividerOrientation}
                    />
                </Flex>
                <Box w={'100%'}>
                    <Title order={3}>Like(s)</Title>
                    <Table w={'100%'}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Title</Table.Th>
                                <Table.Th>Author</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{likeTable}</Table.Tbody>
                    </Table>
                </Box>
            </SimpleGrid>
            {user === data?.getUserById?.username && (
                <Box mt={'xs'} w={'100%'}>
                    <Text>How often do you wash yourself?</Text>
                    <SegmentedControl
                        value={hasFly}
                        onChange={(value) => {
                            setHasFly(value as typeof hasFly);
                        }}
                        data={[
                            {
                                label: 'Once a day',
                                value: 'once-a-day',
                            },
                            {
                                label: 'Once a week',
                                value: 'once-a-week',
                            },
                            {
                                label: 'Once a month',
                                value: 'once-a-month',
                            },
                            {
                                label: 'Never',
                                value: 'never',
                            },
                        ]}
                    />
                </Box>
            )}
        </Container>
    );
};

export default UserSettings;
