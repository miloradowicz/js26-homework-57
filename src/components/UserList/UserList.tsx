import { FC } from 'react';
import { User } from '../../types';
import UserItem from './UserItem/UserItem';

interface UserListProps {
  users: User[];
  onItemDeleteClick: (id: number) => void;
}

const UserList: FC<UserListProps> = ({ users, onItemDeleteClick }) => {
  return (
    <div>
      <h3>User List</h3>
      <div className='list-group'>
        {users.map((x) => (
          <UserItem key={x.id} user={x} onDeleteClick={() => onItemDeleteClick(x.id)} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
