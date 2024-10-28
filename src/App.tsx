import React, { useState } from 'react';
import { User } from './types';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import AdicionarDados from './pages/AdicionarDados';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';


const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const handleAddUser = (user: User) => {
    return 
  }

  //<Route index element={<Home/>} />
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cadastro" element={ <Cadastro onSubmit={handleAddUser} id='teste' initialData={editingUser || undefined}/>}/>
        <Route path="/adicionar-dados/:id" element={<AdicionarDados />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
