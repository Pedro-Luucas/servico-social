import React from 'react';
import { User } from '../types';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.cpf} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>CPF:</strong> {user.cpf}</p>
              <p><strong>Telefone:</strong> {user.telefone}</p>
            </div>
            <div className="space-x-4">
              <button onClick={() => onEdit(user)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
              <button onClick={() => onDelete(user.cpf)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserList;
