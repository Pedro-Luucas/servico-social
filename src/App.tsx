import React, { useEffect } from 'react';
import { User } from './types';
import CadastroUsuario from './pages/CadastroUsuario';
import Home from './pages/Home';
import AdicionarDados from './pages/AdicionarDados';
import UserList from './components/UserList';
import { v4 as uuidv4 } from 'uuid';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PesquisaUsuario from './pages/PesquisaUsuario';
import DetalhesUsuario from './pages/DetalhesUsuario';
import axios from 'axios';
import api from './service/api';
import CadastrarNovoOperador from './pages/CadastrarNovoOperador';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pesquisa',
    element: <PesquisaUsuario />,
  },
  {
    path: '/cadastro-usuario',
    element: <CadastroUsuario onSubmit={() => {}} />,
  },
  {
    path: '/adicionar-dados',
    element: <AdicionarDados />,
  },
  {
    path: '/detalhes/:id',
    element: <DetalhesUsuario />,
  },
  {
    path: '/cadastrarnovooperador',
    element: <CadastrarNovoOperador />,
  },
]);

const App: React.FC = () => {
  // Authentication check (runs only once when the app mounts)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make a request to the auth-check endpoint
        await api.get('operadores/auth-check', {
          withCredentials: true, // Ensures credentials are sent
        });
        console.log('Authenticated successfully');
      } catch (err) {
        // If the server returns a 401, the browser will show the login dialog
        console.error('Authentication error:', err);
      }
    };

    checkAuth(); // Trigger the authentication check
  }, []); // Empty dependency array ensures this runs only once on mount

  return <RouterProvider router={router} />;
};

export default App;