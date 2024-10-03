import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { UserRole, UserMutation } from '../../types.d';

interface UserFormProps {
  action: (_: UserMutation) => void;
}

enum ValidationResult {
  Success,
  NameError,
  EmailError,
  RoleError,
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
    if (user.name.trim().length === 0) {
      return ValidationResult.NameError;
    }

    if (user.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) === null) {
      return ValidationResult.EmailError;
    }

    if (!Object.values(UserRole).includes(user.role)) {
      return ValidationResult.RoleError;
    }

    return ValidationResult.Success;
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    const vaildationResult = validateUser(user);

    if (vaildationResult === ValidationResult.Success) {
      action(user);

      setUser({ name: '', email: '', isActive: false, role: UserRole.User });
    } else {
      switch (vaildationResult) {
        case ValidationResult.NameError:
          alert("Invalid name. Name can't be empty.");
          break;
        case ValidationResult.EmailError:
          alert("Invalid email. Email must satisfy the '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$' patern.");
          break;
        case ValidationResult.RoleError:
          alert('Invalid role. Please refrain from tampering with markup.');
          break;
      }
    }
  };

  return (
    <div>
      <h3>User Form</h3>
      <form onSubmit={onSubmit}>
        <div className='input-group mb-2'>
          <label htmlFor='user-form-name' className='input-group-text col-3'>
            Name
          </label>
          <input type='text' name='name' id='user-form-name' className='form-control' value={user.name} onChange={onChange} />
        </div>
        <div className='input-group mb-2'>
          <label htmlFor='user-form-email' className='input-group-text col-3'>
            Email
          </label>
          <input type='email' name='email' id='user-form-email' className='form-control' value={user.email} onChange={onChange} />
        </div>
        <div className='input-group mb-2'>
          <label htmlFor='user-form-role' className='input-group-text col-3'>
            Role
          </label>
          <select name='role' id='user-form-role' className='form-select' value={user.role} onChange={onChange}>
            <option value={UserRole.User}>User</option>
            <option value={UserRole.Editor}>Editor</option>
            <option value={UserRole.Admin}>Admin</option>
          </select>
        </div>
        <div className='input-group mb-2'>
          <label htmlFor='user-form-is-active' className='input-group-text col-3'>
            Active
          </label>
          <div className='form-control'>
            <input type='checkbox' name='isActive' id='user-form-is-active' className='form-check-input' checked={user.isActive} onChange={onChange} />
          </div>
        </div>
        <button type='submit' className='btn btn-primary form-control'>
          Create
        </button>
      </form>
    </div>
  );
};

export default UserForm;
