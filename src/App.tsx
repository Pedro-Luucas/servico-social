import React, { useState } from 'react';
import { User } from './types';
import UserForm from './pages/Cadastro';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const handleAddUser = (user: User) => {
    return 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={ <UserForm onSubmit={handleAddUser} initialData={editingUser || undefined}/> }/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
