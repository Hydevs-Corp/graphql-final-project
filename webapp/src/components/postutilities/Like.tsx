import { Flex, Button, Tooltip } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useState } from 'react';

//POST ET GET POUR LE BACKEND POUR LE COMPTEUR DE LIIIIIIIIIIIIIIIIIIIIIIIIIIKE

const Like = ({ count }: { count: number }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Flex align="center" gap={2}>
      <Tooltip label={liked ? 'You liked this!' : 'Click to like!'}>
        <Button
          onClick={toggleLike}
          rightSection={liked ? <IconHeartFilled /> : <IconHeart />}
        >
          {count}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default Like;
