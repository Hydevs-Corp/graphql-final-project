import { Button } from '@mantine/core';
import { IconMessage2 } from '@tabler/icons-react';

const Comment = ({ count }: { count: number }) => {
  return (
    <>
      <Button variant="light" rightSection={<IconMessage2 />}>
        {count}
      </Button>
    </>
  );
};

export default Comment;
