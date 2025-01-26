import React, { useState } from 'react';
import { User } from './types';
import CadastroUsuario from './pages/CadastroUsuario';
import Home from './pages/Home';
import AdicionarDados from './pages/AdicionarDados';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PesquisaUsuario from './pages/PesquisaUsuario';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/pesquisa',
    element: <PesquisaUsuario/>
  },
  {
    path: '/cadastro-usuario',
    element: <CadastroUsuario onSubmit={() => {}} id={'teste'} initialData={undefined} />
  },
  {
    path: '/adicionar-dados',
    element: <AdicionarDados />
  },
  
  ]);

const App: React.FC = () => {
  
  return <RouterProvider router={router} />;

};

export default App;
