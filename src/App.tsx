import React, { useState } from 'react';
import { User } from './types';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import AdicionarDados from './pages/AdicionarDados';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/cadastro',
    element: <Cadastro onSubmit={() => {}} id={'teste'} initialData={undefined} />
  },
  {
    path: '/adicionar-dados/:id',
    element: <AdicionarDados />
  }
]);

const App: React.FC = () => {
  
  return <RouterProvider router={router} />;

};

export default App;
