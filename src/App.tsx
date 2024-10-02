import { useState } from 'react';
import './App.css';
import UserForm from './components/UserForm/UserForm';
import { User } from './types';

function App() {
  const [users, setUsers] = useState<User>([]);

  return (
    <>
      <UserForm />
    </>
  );
}

export default App;
