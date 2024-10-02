import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { UserRole, User, UserMutation } from '../../types.d';

interface UserFormProps {
  action: (_: User) => void;
}

const UserForm: FC<UserFormProps> = ({ action }) => {
  const [user, setUser] = useState<UserMutation>({ name: '', email: '', isActive: false, role: UserRole.User });

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    setUser((user) => {
      if (e.target.name === 'isActive') {
        return { ...user, isActive: !user.isActive };
      } else {
        return { ...user, [e.target.name]: e.target.value };
      }
    });
  };

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

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (validateUser(user)) {
      action({ ...user, id: Date.now() });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='input-group'>
          <label htmlFor='user-form-name' className='input-group-text col-3'>
            Name
          </label>
          <input type='text' name='name' id='user-form-name' className='form-control' value={user.name} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='user-form-email' className='input-group-text col-3'>
            Email
          </label>
          <input type='email' name='email' id='user-form-email' className='form-control' value={user.email} onChange={onChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='user-form-role' className='input-group-text col-3'>
            Role
          </label>
          <select name='role' id='user-form-role' className='form-select' value={user.role} onChange={onChange}>
            <option selected disabled>
              Choose...
            </option>
            <option value={UserRole.User}>User</option>
            <option value={UserRole.Editor}>Editor</option>
            <option value={UserRole.Admin}>Admin</option>
          </select>
        </div>
        <div className='input-group'>
          <label htmlFor='user-form-is-active' className='input-group-text col-3'>
            Active
          </label>
          <div className='form-control'>
            <input type='checkbox' name='isActive' id='user-form-is-active' className='form-check-input' onChange={onChange} />
          </div>
        </div>
        <button type='submit' className='btn btn-primary form-control'>
          dfdf
        </button>
      </form>
    </div>
  );
};

export default UserForm;
