import { Button, Card, Flex, Text, Title, UnstyledButton } from '@mantine/core';
import { NavLink } from 'react-router';
import Comment from './postutilities/Comment';
import Like from './postutilities/Like';

//FAIRE GET POUR AFFICHER LES INFORMATIONS

const PostCard = ({
  title,
  desc,
  likes,
  comments,
  id,
}: {
  title: string;
  desc: string;
  likes: number;
  comments: number;
  id: number;
}) => {
  return (
    <Card>
      <Card.Section py="md" inheritPadding withBorder>
        <Flex
          justify="flex-start"
          align="flex-start"
          direction="column"
          wrap="wrap"
        >
          <UnstyledButton component={NavLink} to={`/post/${id}`}>
            <Title size="h4">{title}</Title>
          </UnstyledButton>
          <Flex>
            <Text>Proprio du Posteu</Text>
            <Text>Date de publication</Text>
          </Flex>
        </Flex>
      </Card.Section>
      <Text lineClamp={3}>{desc}</Text>
      <Flex mt={'xs'} gap="xs" justify={'space-between'}>
        <Flex gap={'xs'}>
          <Like count={likes} />
          <Comment count={comments} />
        </Flex>
        <Flex>
          {/* // Onclick de redirection */}
          <Button component={NavLink} to={`/post/${id}`} variant="light">
            Read more
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default PostCard;
