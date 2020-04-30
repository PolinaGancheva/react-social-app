import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import * as devcamp from 'api/devcamp';

type PostHeaderProps = {
  following: boolean;
  id: number;
};

const FollowButton = ({ following, id }: PostHeaderProps) => {
  const [followingActive, setFollowingActive] = useState(following);
  return (
    <Button
      variant="info"
      onClick={async () => {
        if (followingActive) {
          setFollowingActive(!followingActive);
          await devcamp.unfollowUser(id);
        } else {
          setFollowingActive(!followingActive);
          await devcamp.followUser(id);
        }
      }}
    >
      {followingActive ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
