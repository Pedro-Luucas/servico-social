import React, { useState } from 'react';
import { User } from './types';
import UserForm from './pages/Cadastro';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleAddUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...user, id: editingUser.id } : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...user, id: uuidv4() }]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Serviço Social</h1>
      <UserForm onSubmit={handleAddUser} initialData={editingUser || undefined} />
    </div>
  );
};

export default App;
