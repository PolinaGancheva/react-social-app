import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { UserSummaryModel } from 'types';
import * as devcamp from 'api/devcamp';
import { withRouter, RouteComponentProps } from 'react-router';
import UserListItem from './UserListItem';
import classes from './UserSearch.module.css';

type State = {
  users: UserSummaryModel[];
  loading: boolean;
};

type Props = RouteComponentProps<{}>;

const UserSearch = ({ history }: Props) => {
  const [users, setUsers] = useState<UserSummaryModel[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      const users = await devcamp.getUsers(query);
      setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ([user]: UserSummaryModel[]) => {
    if (user) {
      history.push(`/${user.username}`);
    }
  };

  return (
    <AsyncTypeahead<UserSummaryModel>
      id="user-search"
      labelKey="username"
      placeholder="Find users..."
      allowNew={false}
      multiple={false}
      isLoading={loading}
      options={users}
      onSearch={handleSearch}
      renderMenuItemChildren={(user) => <UserListItem user={user} />}
      inputProps={{
        className: `${classes.search} input-sm form-controll-sm`,
      }}
      onChange={handleChange}
    />
  );
};
export default withRouter(UserSearch);
