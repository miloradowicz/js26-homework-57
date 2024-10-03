import { User, UserMutation, UserRole } from '../../types.d';
import { useState } from 'react';
import UserForm from '../../components/UserForm/UserForm';
import UserList from '../../components/UserList/UserList';

const UserManager = () => {
  const [users, setUsers] = useState<User[]>([]);

  const validateUser = (user: UserMutation) => {
    if (user.name.trim().length === 0 || user.email.trim().length === 0) {
      return false;
    }

    if (user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
      return false;
    }

    if (!Object.values(UserRole).includes(user.role)) {
      return false;
    }

    return true;
  };

  const addUser = (user: UserMutation) => {
    if (validateUser(user)) {
      setUsers((users) => [...users, { ...user, id: Date.now() }]);
    }
  };

  const deleteUser = (id: number) => {
    setUsers((users) => users.filter((x) => x.id !== id));
  };

  return (
    <div className='row row-cols-1 row-cols-md-2'>
      <div className='col'>
        <UserForm action={addUser} />
      </div>
      <div className='col'>
        <UserList users={users} onItemDeleteClick={deleteUser} />
      </div>
    </div>
  );
};

export default UserManager;
