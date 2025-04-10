import { useMutation, useQuery } from '@apollo/client';
import {
    Avatar,
    Button,
    Container,
    Divider,
    Flex,
    Loader,
    Text,
    TextInput,
    Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Markdown from 'markdown-to-jsx';
import { createRef, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import CommentSection from '../components/CommentSection';
import Comment from '../components/postutilities/Comment';
import Like from '../components/postutilities/Like';
import { AuthProvider } from '../providers/AuthProvider';
import deletePostByID_REQUEST from '../scripts/requests/deletePostbyID';
import getPostByID_REQUEST from '../scripts/requests/getPostbyID';
import updatePostbyID_MUTATE from '../scripts/requests/updatePostbyID';

const formatetdDate = Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
});

const Post = () => {
    const [edit, setEdit] = useState(false);
    const { user } = AuthProvider.use();
    const commentSectionRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const [scroll, _setScroll] = useSearchParams();
    const navigate = useNavigate();

    const ref = createRef<HTMLTextAreaElement>();
    const focus = () => {
        ref.current?.focus();
    };

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
        },

        validate: {
            title: (value) =>
                value.length < 2
                    ? 'Title should have at least 2 letters'
                    : null,
            content: (value) =>
                value.length < 10
                    ? 'Content should have at least 10 letters'
                    : null,
        },
    });

    const { data, refetch, error, loading } = useQuery(getPostByID_REQUEST, {
        variables: {
            id: parseInt(id!),
        },
        fetchPolicy: 'cache-and-network',
        refetchWritePolicy: 'overwrite',
    });

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [scroll.size, ref.current]);

    useEffect(() => {
        if (data)
            form.setValues({
                title: data?.getArticleById?.title,
                content: data?.getArticleById?.content,
            });
    }, [data]);

    const [updatePost, { loading: loadingUpdate }] = useMutation(
        updatePostbyID_MUTATE
    );

    const handleSubmit = form.onSubmit(async (values) => {
        if (!data?.getArticleById?.id) return;
        updatePost({
            variables: {
                id: data?.getArticleById?.id,
                title: values.title,
                content: values.content,
            },
        });
        setEdit(false);
    });

    const [deletePost, { loading: loadingDelete }] = useMutation(
        deletePostByID_REQUEST
    );

    const handleDelete = async () => {
        if (!data?.getArticleById?.id) return;
        deletePost({
            variables: {
                deleteArticleId: data?.getArticleById?.id,
            },
        });
        return navigate('/');
    };

    let createdAtValue = '';
    try {
        createdAtValue = data?.getArticleById?.createdAt
            ? formatetdDate.format(
                  new Date(parseInt(data?.getArticleById?.createdAt))
              )
            : '';
    } catch (error) {
        console.error('Error formatting date:', error);
    }
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: '',
        onUpdate: ({ editor }) => {
            form.setFieldValue('content', editor.getHTML());
        },
    });

    useEffect(() => {
        editor?.commands.setContent(data?.getArticleById?.content ?? '');
    }, [data?.getArticleById?.content]);
    if (loading) {
        return (
            <Container>
                <Flex
                    direction={'column'}
                    gap={20}
                    mt={100}
                    justify={'center'}
                    align={'center'}
                >
                    <Loader />
                </Flex>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Flex
                    direction={'column'}
                    gap={20}
                    mt={100}
                    justify={'center'}
                    align={'center'}
                >
                    <Flex direction={'row'}>
                        <Text size="20px">
                            This{' '}
                            <Text span fw={500} c={'red'}>
                                post{' '}
                            </Text>
                            doesn't exist
                        </Text>
                    </Flex>
                    <Button
                        onClick={() => {
                            return navigate('/');
                        }}
                    >
                        Go back to the overworld
                    </Button>
                </Flex>
            </Container>
        );
    }

    return (
        <Container>
            <Flex
                mih={50}
                maw={900}
                w={'100%'}
                gap="md"
                justify="flex-start"
                direction="column"
                wrap="wrap"
            >
                <form onSubmit={handleSubmit}>
                    <Flex
                        direction={'row'}
                        justify="space-between"
                        align={'end'}
                        gap={'md'}
                        mt={20}
                    >
                        <Flex
                            flex={1}
                            direction="column"
                            justify="flex-start"
                            gap={'md'}
                        >
                            {edit ? (
                                <TextInput
                                    placeholder="Title of your post"
                                    {...form.getInputProps('title')}
                                    label="Title of your post"
                                />
                            ) : (
                                <Title
                                    style={{ wordBreak: 'break-all' }}
                                    size="h1"
                                >
                                    {data?.getArticleById?.title}
                                </Title>
                            )}
                        </Flex>
                        {data?.getArticleById?.author?.username != user ? (
                            <></>
                        ) : (
                            <Button
                                // flex={1}
                                onClick={() => setEdit((prev) => !prev)}
                                variant="outline"
                            >
                                {edit ? 'Cancel Editing' : 'Edit'}
                            </Button>
                        )}
                    </Flex>
                    <Flex direction={'row'} align="start" gap={10} my={20}>
                        <Avatar
                            name={data?.getArticleById?.author?.username}
                            color="initials"
                        />
                        <Flex direction={'column'} justify={'flex-start'}>
                            <Text>
                                {data?.getArticleById?.author?.username}
                            </Text>
                            <Text c={'grey'} size="xs">
                                published on {createdAtValue}
                            </Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                        justify={'start'}
                        direction={'column'}
                        gap={10}
                        mt={20}
                    >
                        {edit ? (
                            // <Textarea
                            //     placeholder="Write your post here"
                            //     {...form.getInputProps('content')}
                            //     label="Content of your post"
                            //     autosize
                            //     minRows={10}
                            // />
                            <RichTextEditor editor={editor}>
                                <RichTextEditor.Toolbar
                                    sticky
                                    stickyOffset={60}
                                >
                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Bold />
                                        <RichTextEditor.Italic />
                                        <RichTextEditor.Underline />
                                        <RichTextEditor.Strikethrough />
                                        <RichTextEditor.ClearFormatting />
                                        <RichTextEditor.Highlight />
                                        <RichTextEditor.Code />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.H1 />
                                        <RichTextEditor.H2 />
                                        <RichTextEditor.H3 />
                                        <RichTextEditor.H4 />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Blockquote />
                                        <RichTextEditor.Hr />
                                        <RichTextEditor.BulletList />
                                        <RichTextEditor.OrderedList />
                                        <RichTextEditor.Subscript />
                                        <RichTextEditor.Superscript />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Link />
                                        <RichTextEditor.Unlink />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.AlignLeft />
                                        <RichTextEditor.AlignCenter />
                                        <RichTextEditor.AlignJustify />
                                        <RichTextEditor.AlignRight />
                                    </RichTextEditor.ControlsGroup>

                                    <RichTextEditor.ControlsGroup>
                                        <RichTextEditor.Undo />
                                        <RichTextEditor.Redo />
                                    </RichTextEditor.ControlsGroup>
                                </RichTextEditor.Toolbar>

                                <RichTextEditor.Content />
                            </RichTextEditor>
                        ) : (
                            <Markdown>
                                {data?.getArticleById?.content ?? ''}
                            </Markdown>
                        )}
                        <Flex justify={'space-between'}>
                            <Flex gap={10}>
                                <Like
                                    count={data?.getArticleById?.likeCount ?? 0}
                                    articleId={data?.getArticleById?.id ?? 0}
                                    isDefaultLiked={
                                        data?.getArticleById?.isLiked ?? false
                                    }
                                />
                                <Comment
                                    count={
                                        data?.getArticleById?.commentCount ?? 0
                                    }
                                    onClick={focus}
                                />
                            </Flex>
                            {edit ? (
                                <Flex gap={10}>
                                    <Button
                                        variant="filled "
                                        type="submit"
                                        loading={loadingUpdate}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={handleDelete}
                                        variant="outline"
                                        loading={loadingDelete}
                                    >
                                        Delete
                                    </Button>
                                </Flex>
                            ) : (
                                <></>
                            )}
                        </Flex>
                    </Flex>
                </form>
            </Flex>
            <Divider my={20} />
            <div ref={commentSectionRef}>
                {!edit && (
                    <CommentSection
                        ref={ref}
                        postId={parseInt(id!)}
                        comments={
                            data?.getArticleById?.comments?.filter(
                                (el) => !!el
                            ) ?? []
                        }
                        invalidate={refetch}
                    />
                )}
            </div>
        </Container>
    );
};

export default Post;
