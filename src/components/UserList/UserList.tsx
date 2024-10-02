import { FC } from 'react';
import { User } from '../../types';
import UserItem from './UserItem/UserItem';

interface UserListProps {
  users: User[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <div className='list-group'>
        {users.map((x) => (
          <UserItem key={x.id} user={x} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
