import { Button, ButtonProps } from '@mantine/core';
import { IconMessage2 } from '@tabler/icons-react';

const Comment = ({
    count,
    onClick,
    ...props
}: {
    count: number;
    onClick?: () => void;
} & ButtonProps) => {
    return (
        <>
            <Button
                onClick={onClick}
                variant="light"
                rightSection={<IconMessage2 />}
                {...props}
            >
                {count}
            </Button>
        </>
    );
};

export default Comment;
