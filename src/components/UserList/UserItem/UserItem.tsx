import { FC } from 'react';
import { User } from '../../../types';

interface UserItemProps {
  user: User;
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <div className='list-group-item'>
      <span>${user.id}</span>
      <span>${user.name}</span>
      <span>${user.email}</span>
      <span>${user.role}</span>
      <span>${user.isActive}</span>
    </div>
  );
};

export default UserItem;
