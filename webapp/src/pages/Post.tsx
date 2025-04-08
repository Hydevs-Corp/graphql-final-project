import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import Like from '../components/postutilities/Like';
import Comment from '../components/postutilities/Comment';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import getPostByID_REQUEST from '../hooks/requests/getPostbyID';
import { useQuery } from '@apollo/client';

const Post = () => {
  const [edit, setEdit] = useState(false);

  const form = useForm({
    initialValues: {
      content: '',
      termsOfService: false,
    },

    validate: {
      content: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid content'),
    },
  });

  const post = useQuery(getPostByID_REQUEST, {
    variables: {
      id: 1,
    },
  });

  const { data, loading } = post;

  console.log('Post data:', data);
  console.log('Post loading:', loading);

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
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Flex direction={'row'} justify="space-between" mt={20}>
            <Flex direction="column" justify="flex-start" gap={10}>
              {edit ? (
                <TextInput
                  placeholder="Post Title"
                  label="Title of your post"
                />
              ) : (
                <Title size="h1">Post Title</Title>
              )}
              <Flex
                direction={'row'}
                justify="space-between"
                align="start"
                m={20}
              >
                <Avatar src="avatar.png" alt="it's me" />
                <Flex direction={'column'} justify={'flex-start'}>
                  <Text>Post Author</Text>
                  <Text c={'grey'} size="xs">
                    Published on *date de publication*
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Button onClick={() => setEdit((prev) => !prev)} variant="outline">
              {edit ? 'Stop Editing' : 'Edit'}
            </Button>
          </Flex>
          <Divider />
          {edit ? (
            <Textarea
              placeholder="Post Content"
              label="Content of your post"
              autosize
              minRows={10}
            />
          ) : (
            <Text>Post Content</Text>
          )}
          <Flex justify={'space-between'}>
            <Flex>
              <Like count={2} />
              <Comment count={6} />
            </Flex>
            {edit ? (
              <Flex gap={5}>
                <Button variant="filled " type="submit">
                  Submit
                </Button>
                <Button variant="outline">Delete</Button>
              </Flex>
            ) : (
              <></>
            )}
          </Flex>
        </form>
      </Flex>
    </Container>
  );
};

export default Post;
