import { useQuery } from '@apollo/client';
import {
    Button,
    Container,
    Flex,
    Loader,
    Select,
    SimpleGrid,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDebouncedValue } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import React, { useEffect } from 'react';
import CreatePost from '../components/CreatePost';
import PostCard from '../components/PostCard';
import { AuthProvider } from '../providers/AuthProvider';
import getPosts_QUERY from '../scripts/requests/getPosts';

const sorts = [
    {
        value: 'createdAt',
        label: 'Latest',
    },
    {
        label: 'Likes',
        value: 'likes',
    },
    {
        label: 'Comments',
        value: 'comments',
    },
    {
        label: 'Author',
        value: 'author',
    },
    {
        label: 'Title',
        value: 'title',
    },
];

const Dashboard = () => {
    const { user } = AuthProvider.use();
    const form = useForm({
        initialValues: {
            filter: '',
            sortBy: sorts[0].value,
        },
    });

    const { data, refetch, loading } = useQuery(getPosts_QUERY, {
        variables: {
            sortBy: form.values.sortBy,
        },
        refetchWritePolicy: 'merge',
    });

    const [debouncedValue] = useDebouncedValue(form.values, 500);

    useEffect(() => {
        const fetchData = async () => {
            await refetch({
                filter: debouncedValue.filter,
                sortBy: debouncedValue.sortBy,
            });
        };

        fetchData();
    }, [debouncedValue, refetch]);

    return (
        <Container
            style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}
        >
            <Title mt={'xl'}>
                Welcome to{' '}
                <Text
                    variant="gradient"
                    fw={'bold'}
                    gradient={{ from: 'red.4', to: 'red.8' }}
                    span
                    size="1em"
                >
                    ReadThot{' '}
                    <Text span size="4">
                        Chilli Pepper
                    </Text>
                </Text>
            </Title>
            {user ? (
                <Flex align="start" direction={'column'} mt={20}>
                    <Button
                        maw={150}
                        onClick={() => {
                            modals.open({
                                title: (
                                    <Text size="25px">
                                        <Text fw={600} c={'red'} span>
                                            Write{' '}
                                        </Text>{' '}
                                        your own post
                                    </Text>
                                ),
                                size: 'xl',
                                centered: true,
                                children: <CreatePost refetch={refetch} />,
                            });
                        }}
                    >
                        Write your post
                    </Button>
                </Flex>
            ) : (
                <></>
            )}
            <Flex gap="xs">
                <Select
                    flex={1}
                    label="Sort By"
                    data={sorts}
                    {...form.getInputProps('sortBy')}
                />
                <TextInput
                    flex={2}
                    label="Search"
                    placeholder="Search posts"
                    {...form.getInputProps('filter')}
                />
            </Flex>
            {loading && (
                <Flex justify={'center'}>
                    <Loader />
                </Flex>
            )}
            <SimpleGrid pb={'md'} cols={{ base: 1, sm: 2 }} spacing={'sm'}>
                {data?.getArticles?.map((post, i) => {
                    if (!post) return <React.Fragment key={i} />;
                    return (
                        <PostCard
                            key={post.id}
                            {...post}
                            likeCount={post.likeCount ?? 0}
                            commentCount={post.commentCount ?? 0}
                            isLiked={post.isLiked ?? false}
                        />
                    );
                })}
            </SimpleGrid>
            {data?.getArticles?.length === 0 && !loading && (
                <>
                    <Text
                        ta={'center'}
                        size="xl"
                        w={'100%'}
                        my={80}
                        variant="gradient"
                    >
                        {/* <VFXSpan {...Appear}> */}
                        Ah nooo ! There is no posts {':(('}
                        {/* </VFXSpan> */}
                    </Text>

                    {/* <Flex h={100}>
                        <VFXImg height={100} src={'/fly.png'} {...Appear} />
                    </Flex> */}
                </>
            )}
        </Container>
    );
};

export default Dashboard;
