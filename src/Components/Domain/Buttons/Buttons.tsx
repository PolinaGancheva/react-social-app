import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import * as devcamp from 'api/devcamp';

type PostHeaderProps = {
  likesCount: number;
  liked: boolean;
  dislikesCount: number;
  disliked: boolean;
  id: number;
};

const Buttons = ({
  likesCount,
  liked,
  dislikesCount,
  disliked,
  id,
}: PostHeaderProps) => {
  const [like, setLikes] = useState(likesCount);
  const [likeActive, setLikeActive] = useState(liked);
  const [dislike, setDislikes] = useState(dislikesCount);
  const [dislikeActive, setDislikeActive] = useState(disliked);
  return (
    <>
      <Button
        variant="light"
        size="sm"
        onClick={async () => {
          if (dislikeActive) {
            setDislikeActive(!dislikeActive);
            setDislikes(dislike - 1);
          }
          setLikeActive(!likeActive);
          likeActive ? setLikes(like - 1) : setLikes(like + 1);
          await devcamp.likePost(id);
        }}
      >
        {like}
        {'  '}
        <FontAwesomeIcon
          icon={faThumbsUp}
          size="2x"
          color={likeActive === true ? 'blue' : 'black'}
        />
      </Button>
      <Button
        variant="light"
        size="sm"
        onClick={async () => {
          if (likeActive) {
            setLikeActive(!likeActive);
            setLikes(like - 1);
          }
          setDislikeActive(!dislikeActive);
          dislikeActive ? setDislikes(dislike - 1) : setDislikes(dislike + 1);
          await devcamp.dislikePost(id);
        }}
      >
        {dislike}
        {'  '}
        <FontAwesomeIcon
          icon={faThumbsDown}
          size="2x"
          color={dislikeActive === true ? 'blue' : 'black'}
        />
      </Button>
    </>
  );
};

export default Buttons;
