import { ApolloQueryResult, useMutation } from '@apollo/client';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { Link, RichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { GetArticlesQuery } from '../gql/graphql';
import createPost_MUTATE from '../scripts/requests/createPost';

const CreatePost = ({
    refetch,
}: {
    refetch: () => Promise<ApolloQueryResult<GetArticlesQuery>>;
}) => {
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

    const [createPost] = useMutation(createPost_MUTATE);

    const handleSubmit = form.onSubmit(async (values) => {
        await createPost({
            variables: {
                title: values.title,
                content: values.content,
            },
        });
        modals.closeAll();
        await refetch();
    });

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

    return (
        <Flex>
            <form onSubmit={handleSubmit}>
                <Flex direction={'column'} gap={'md'}>
                    <Flex direction={'column'}>
                        <Text>Title</Text>
                        <TextInput
                            {...form.getInputProps('title')}
                            placeholder="Posts title"
                            required
                            maw={300}
                            withAsterisk
                        />
                    </Flex>
                    <Flex direction={'column'}>
                        <Text>Content</Text>
                        {/* <Textarea
                            {...form.getInputProps('content')}
                            placeholder="Write your post here"
                            minRows={10}
                            withAsterisk
                            miw={700}
                            autosize
                            required
                        /> */}
                        <RichTextEditor editor={editor}>
                            <RichTextEditor.Toolbar sticky stickyOffset={60}>
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
                    </Flex>
                    <Flex justify="end">
                        <Button maw={200} type="submit">
                            Create a post
                        </Button>
                    </Flex>
                </Flex>
            </form>
        </Flex>
    );
};

export default CreatePost;
