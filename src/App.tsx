import React, { useEffect, useState } from 'react';
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
    element: <Home/>
  },
  {
    path: '/pesquisa',
    element: <PesquisaUsuario/>
  },
  {
    path: '/cadastro-usuario',
    element: <CadastroUsuario onSubmit={() => {}}/>
  },
  {
    path: '/adicionar-dados',
    element: <AdicionarDados />
  },
  {
    path: '/detalhes/:id',
    element: <DetalhesUsuario />
  },
  {
    path: '/cadastrarnovooperador',
    element: <CadastrarNovoOperador />
  },
  
  ]);


  const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      // Try to authenticate immediately when component mounts
      checkAuth();
    }, []);
  
    const checkAuth = async () => {
      try {
        // This request will trigger the browser's auth dialog
        const response = await api.get('operadores/auth-check', {
          // This is important - it tells axios to trigger the browser auth dialog
          withCredentials: true
        });
        
        setIsAuthenticated(true);
        console.log(response)
      } catch (err) {
        console.log('ERRO',err)
        setIsAuthenticated(false);
      }
    }};

const App: React.FC = () => {
  Login()
  return <RouterProvider router={router} />;

};

export default App;
