import { Box, Button, Textarea } from '@mantine/core';
import { useField } from '@mantine/form';

const CommentSection = ({ postId }: { postId: number }) => {
  const field = useField({
    initialValue: '',
  });

  const submit = () => {
    console.log('Submitting comment:', field.getValue(), postId);
  };

  return (
    <Box>
      <Textarea {...field.getInputProps()} />
      <Button onClick={submit} mt="md">
        Submit
      </Button>
    </Box>
  );
};

export default CommentSection;
