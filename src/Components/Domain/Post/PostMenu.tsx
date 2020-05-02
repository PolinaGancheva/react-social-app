import React from 'react';
import { PostModel } from 'types';
import { useMutation } from 'react-query';
import { useAuth } from 'hooks/domain';
import * as devcamp from 'api/devcamp';
import { removeFromCache, updateInCache } from 'utils/cache';
import { Dropdown, DropdownButton } from 'react-bootstrap';

type Props = {
  posts: PostModel;
};

const PostMenu = ({ posts }: Props) => {
  const { user } = useAuth();
  const [removePost, { status: removeStatus }] = useMutation(
    devcamp.deletePost,
    {
      onSuccess: () => {
        removeFromCache(['userPosts', posts.user?.id], posts.id);
        updateInCache<PostModel>(['posts'], posts.id, (old) => ({
          ...old,
        }));
        updateInCache<PostModel>(
          ['userPosts', posts.user.id],
          posts.id,
          (old) => ({
            ...old,
          })
        );
      },
    }
  );

  if (posts.user.id !== user?.id) {
    return null;
  }

  const isLoading = removeStatus === 'loading';

  return (
    <Dropdown
      color="link"
      style={{ display: 'inline-flex', position: 'absolute', right: '3rem' }}
    >
      <DropdownButton
        variant="link"
        id="dropdown-item-button"
        title={
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAhFBMVEX///81Njv8/Pw4OT4oKS4vMDX+/v8rLDEuLzQzNDn+/vwlJisoKC44OUA5Oj76+vrGxshJSk6fn6C7u7zg4OBbXGClpaeZmpzp6emOjpHy8vNAQUVPUFRhYmWHh4uNjJBram+urrHQz9HZ2dvLy8y1tbasrKxyc3Z9foBERUi/v8BNTlFL3DRwAAAEL0lEQVR4nO2Z6XLaMBRGJUvCGLxgMIbYJIGkkJa+//tVslPwoqUEkemP70wy2U6udK3VEiEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMB/wOzz8/rFb+zxt48iuODfJrfZ99Arwlle7+832jdU6nZU9O2ifHp5eVquCvnTzNYFrvbrp+2Mfe7EflAqkyZyddjXEZ/HfD4XbL0pml9OTBWTdqrs+GJnptoFM1KdurGX26YN9bHvIZhlhJR5HEaUtVDB09fK9OBkHco8/GunlE4bO9PKMnawzLmyU6Y+pF0/GWPfR0aKZy6ShF6Q5fF8oS9t1tjS6Nqxyc7I+5pHXZuyaL778YhMAvKjDntFNcUJUepKC8iiDhM6tg96+5yEw9CUTaOj/0wC8kbFqGayNBpq6ibziMSoZmb7LCKdHYUr35kEZFvraqbqFr0NSwtIcZud6vJQmbB3r5moaXM/bvuWZLobj+B9bLDZyJbz0rMpNgvXflskIEdTWTITvhyuZcfx+LDYJ26JffLZJBMSrKfGwmiUV4O8bbYY2tlO3w1bezew70KOxqmxKNkBeG8ES9vcfKq7HPv2ym77HO8BeTH1eUUSfgxsc19RVRvYP602/+kvkYlqfXNZsm/96rV/9vsWu8ojmy1+6zcDX6OwPLOG65w6Cci7Q6adOdVtyxnYF7LTWx+anFOP3ao5bCpkt59c7JW1+WQDnr31Levkq0jjZTeRk91mvOzapW2IjOaGOxNZOgqbb66FZWQzd9rZtUVc9nDduS8Rd9U6z9hvIrHPRA4P7FpL28zuu2ud7QOyO9gn7uHbH+xHyy5A4XWwOyfUN3LDhNqfft8cMis8paGocutDFsMlzr4g9jdb1S/ngujtxT0gH65NR6/1P+y7p96mI3DYscctimshGW0DrXPDYBvosqf+hogqzLYhYmL4rmTdPg3swNq32FS+WXl8IVFLovFViQ1ffqx2wg9De2OJ7XHyJc3baLabGkpj4fPoH6qdaU5N4v3oIZltxpXt80BbzpIRNRwQ1MX4OOE2e2GY5Ziot/6PUQ6hrm5JJDSHbmp119lMRFrbEFukoyMXH5mUYvxunYSJ9vBQ1k1r1wa7DMc2C+sH5NH0gJz3zp9YIvhzoT/OVXZM+0emja2tmdwE5ZxqYj/k8FeOyqeUTylrD5ppFMZ5KaeBmXbhlfarsmnannhHIVe2Po+ZtF9SLi7n4zL27vCYm4X2WmG7WTMxn/N4zqN6f6rM1woT2VBFa8dc2un+UJlq1sYuerFb2/+tQou6filWS3UZU5636heWkmaf9uvV/tfYC6d9NzddjwVft7/lFvFLt5uPuDq9i0deIXeuvb/hehoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHDzBxNZOoerJghgAAAAAElFTkSuQmCC"
            alt="dots"
            style={{
              width: '25px',
              height: '25px',
            }}
          />
        }
      >
        <Dropdown.Item
          as="button"
          onClick={isLoading ? undefined : () => removePost(posts.id)}
        >
          Remove
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
};
export default PostMenu;
