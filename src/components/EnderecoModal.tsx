import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Endereco } from '../types';

interface AddressModalProps {
  onClose: () => void;
  onSave: (endereco: Endereco) => void;
  initialData?: Endereco | null;
}

const AddressModal: React.FC<AddressModalProps> = ({ onClose, onSave, initialData }) => {
  const { register, handleSubmit, setValue } = useForm<Endereco>({
    defaultValues: {
      CEP: '',
      municipio: '',
      bairro: '',
      rua: '',
      numero: 0,
      referencia: '',
    },
  });

  // Preencher o formulário se initialData for fornecido
  useEffect(() => {
    if (initialData) {
      setValue('CEP', initialData.CEP);
      setValue('municipio', initialData.municipio);
      setValue('bairro', initialData.bairro);
      setValue('rua', initialData.rua);
      setValue('numero', initialData.numero);
      setValue('referencia', initialData.referencia);
    }
  }, [initialData, setValue]);

  // Função para submeter o formulário
  const onSubmit = (data: Endereco) => {
    onSave(data);  // Chama a função de salvamento passando os dados do endereço
    onClose();     // Fecha o modal após salvar
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Adicionar Endereço</h2>
        {/* Formulário controlado pelo react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <input
            {...register('CEP')}
            placeholder="CEP"
            className="border rounded p-2 w-full"
          />
          <input
            {...register('municipio')}
            placeholder="Município"
            className="border rounded p-2 w-full"
          />
          <input
            {...register('bairro')}
            placeholder="Bairro"
            className="border rounded p-2 w-full"
          />
          <input
            {...register('rua')}
            placeholder="Rua"
            className="border rounded p-2 w-full"
          />
          <input
            {...register('numero', { valueAsNumber: true , 
                required: "Required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "invalid email address"
                } })}
            placeholder="Número"
            
            className="border rounded p-2 w-full"
          />
          <input
            {...register('referencia')}
            placeholder="Referência"
            className="border rounded p-2 w-full"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black p-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
