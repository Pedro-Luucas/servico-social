import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Endereco } from '../types';
import { DatePicker, Input, Select, Button } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { withMask } from 'use-mask-input'
import axios from 'axios';


interface AddressModalProps {
  onClose: () => void;
  onSave: (endereco: Endereco) => void;
  initialData?: Endereco | null;
}

const AddressModal: React.FC<AddressModalProps> = ({ onClose, onSave, initialData }) => {
  const { register, handleSubmit, setValue, watch } = useForm<Endereco>({
    defaultValues: {
      CEP: '',
      municipio: '',
      bairro: '',
      rua: '',
      numero: 0,
      referencia: '',
    },
  });


  const onCloseCancelar = () => {
    setValue('CEP', "");
    setValue('municipio', "");
    setValue('bairro', "");
    setValue('rua', "");
    setValue('numero', 0);
    setValue('referencia', "");
    onClose()
  }

  const cep = watch("CEP")

  useEffect(() => {
    if (cep && cep.length === 8) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const { logradouro, bairro, localidade } = response.data;
          setValue("rua", logradouro);
          setValue("bairro", bairro);
          setValue("municipio", localidade);
        })
        .catch(() => {
          alert("Erro ao buscar o CEP.");
        });
    }
  }, [cep, setValue]);

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
        <div className="flex flex-row justify-between">
          <h2 className="text-xl mb-4">Adicionar Endereço</h2>
          <Button type='text' icon={<CloseOutlined/>} onClick={onClose} className='self-start' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <input
            {...register("CEP")}
            ref={withMask('00000-000')}
            placeholder="CEP"
            maxLength={8}
            //nao da de usar use-mask-input no Input do antd entao ta ai essa gambiarra de de className
            className="ant-input css-dev-only-do-not-override-1hpnbz2 ant-input-outlined border rounded p-2 w-full"
            
          />
          <Input
            {...register('municipio')}
            placeholder="Município"
            className="border rounded p-2 w-full"
          />
          <Input
            {...register('bairro')}
            placeholder="Bairro"
            className="border rounded p-2 w-full"
          />
          <Input
            {...register('rua')}
            placeholder="Rua"
            className="border rounded p-2 w-full"
          />
          
          <Input
            {...register('numero', { valueAsNumber: true})}
            placeholder = "Número"
            className="border rounded p-2 w-full" 
          />

          <Input
            {...register('referencia')}
            placeholder="Referência"
            className="border rounded p-2 w-full"
          />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCloseCancelar}
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
