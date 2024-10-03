import { FC, MouseEventHandler } from 'react';
import { User } from '../../../types';

interface UserItemProps {
  user: User;
  onDeleteClick: MouseEventHandler;
}

const UserItem: FC<UserItemProps> = ({ user, onDeleteClick }) => {
  return (
    <div className='list-group-item'>
      <div className='row align-items-center'>
        <h6 className='col-8 offset-2 my-0 p-0'>{user.name}</h6>
        <button
          type='button'
          className='col-2 btn btn-link text-danger fa fa-trash'
          onClick={onDeleteClick}
          aria-label='Delete'
          style={{ textDecoration: 'none' }}
        />
      </div>
      <div>
        <span className='me-2'>User ID:</span>
        {user.id}
      </div>
      <div>
        <span className='me-2'>Email:</span>
        {user.email}
      </div>
      <div>
        <span className='me-2'>Role:</span>
        {user.role}
      </div>
      <div className={user.isActive ? 'text-success' : 'text-danger'}>{user.isActive ? 'Active' : 'Not active'}</div>
    </div>
  );
};

export default UserItem;
