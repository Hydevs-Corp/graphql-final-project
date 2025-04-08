import { Container, SimpleGrid, Text, Title } from '@mantine/core';
import PostCard from '../components/PostCard';
import { useQuery } from '@apollo/client';
import React from 'react';
import getPosts_REQUEST from '../hooks/requests/getPosts';

const Dashboard = () => {
  const posts = useQuery(getPosts_REQUEST);

  return (
    <Container
      style={{ gap: '16px', display: 'flex', flexDirection: 'column' }}
    >
      <Title mt={'xl'}>
        Bienvenue sur{' '}
        <Text
          variant="gradient"
          fw={'bold'}
          gradient={{ from: 'red.4', to: 'red.8' }}
          span
          size="1em"
        >
          RedThot{' '}
          <Text span size="4">
            Chilli Pepper
          </Text>
        </Text>
      </Title>

      <SimpleGrid cols={2}>
        {posts.data?.getArticles?.map((post, i) => {
          if (!post) return <React.Fragment key={i} />;
          return (
            <PostCard
              key={post.id}
              title={post.title}
              desc={post.content}
              likes={post.likeCount ?? 0}
              comments={post.commentCount ?? 0}
              id={post.id}
            />
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Dashboard;
