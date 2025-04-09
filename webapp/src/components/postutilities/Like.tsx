import { useMutation } from '@apollo/client';
import { Flex, Button, Tooltip } from '@mantine/core';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import unlikePost_MUTATE from '../../scripts/requests/unlikePost';
import likePost_MUTATE from '../../scripts/requests/likePost';

const Like = ({
    count,
    articleId,
    isDefaultLiked = false,
}: {
    count: number;
    articleId: number;
    isDefaultLiked?: boolean;
}) => {
    const [liked, setLiked] = useState(isDefaultLiked);
    useEffect(() => {
        setLiked(isDefaultLiked);
    }, [isDefaultLiked]);

    const [like, { loading: likeLoading }] = useMutation(likePost_MUTATE);
    const [unlike, { loading: unlikeLoading }] = useMutation(unlikePost_MUTATE);

    const toggleLike = async () => {
        if (liked) {
            await unlike({
                variables: { articleId },
            });
            setLiked(false);
        } else {
            await like({
                variables: { articleId },
            });
            setLiked(true);
        }
    };

    let trueCount = count;
    if (liked && !isDefaultLiked) {
        trueCount++;
    } else if (!liked && isDefaultLiked) {
        trueCount--;
    }

    return (
        <Flex align="center" gap={2}>
            <Tooltip label={liked ? 'You liked this!' : 'Click to like!'}>
                <Button
                    loading={likeLoading || unlikeLoading}
                    onClick={toggleLike}
                    rightSection={liked ? <IconHeartFilled /> : <IconHeart />}
                >
                    {trueCount}
                </Button>
            </Tooltip>
        </Flex>
    );
};

export default Like;
