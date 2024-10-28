import React, { useEffect, useState } from 'react';
import { Endereco } from '../types';
import { Input, Button } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import InputMask from 'react-input-mask';
import axios from 'axios';

const { TextArea } = Input;

interface AddressModalProps {
  onClose: () => void;
  onSave: (endereco: Endereco) => void;
  initialData?: Endereco | null;
}

const EnderecoModal: React.FC<AddressModalProps> = ({ onClose, onSave, initialData }) => {
  const [cep, setCep] = useState(initialData?.CEP || '');
  const [municipio, setMunicipio] = useState(initialData?.municipio || '');
  const [bairro, setBairro] = useState(initialData?.bairro || '');
  const [rua, setRua] = useState(initialData?.rua || '');
  const [numero, setNumero] = useState(initialData?.numero || NaN);
  const [referencia, setReferencia] = useState(initialData?.referencia || '');

  // Função para tratar a mudança no CEP e buscar o endereço via API
  const onCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cepStr = e.target.value;
    const cepValue = cepStr.replace(/[^0-9]/g, "");

    setCep(cepStr); // Atualiza o estado do campo CEP

    if (cepValue.length === 8) { // Verifica se o CEP tem 8 dígitos
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cepValue}/json/`);
        if (response.data && !response.data.erro) {
          const { logradouro, bairro, localidade } = response.data;

          setRua(logradouro);
          setBairro(bairro);
          setMunicipio(localidade);
        } else {
          console.error('CEP inválido ou não encontrado.');
          setRua('');
          setBairro('');
          setMunicipio('');
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP: ", error);
        setRua('');
        setBairro('');
        setMunicipio('');
      }
    }
  };

  // Atualiza os valores iniciais caso initialData seja fornecido
  useEffect(() => {
    if (initialData) {
      setCep(initialData.CEP || '');
      setMunicipio(initialData.municipio || '');
      setBairro(initialData.bairro || '');
      setRua(initialData.rua || '');
      setNumero(initialData.numero || 0);
      setReferencia(initialData.referencia || '');
    }
  }, [initialData]);

  // Função para submeter o formulário
  const handleSubmit = () => {
    const enderecoFinal: Endereco = {
      CEP: cep,
      municipio,
      bairro,
      rua,
      numero,
      referencia,
    };
    onSave(enderecoFinal);  // Chama a função de salvamento passando os dados do endereço
    onClose();              // Fecha o modal após salvar
  };

  const handleCancel = () => {
    // Reseta os valores dos campos e fecha o modal
    setCep('');
    setMunicipio('');
    setBairro('');
    setRua('');
    setNumero(0);
    setReferencia('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center outline-none">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl mb-4">Adicionar Endereço</h2>
          <Button type='text' icon={<CloseOutlined />} onClick={onClose} className='self-start' />
        </div>

        <form className="grid grid-cols-1 gap-4">
          <InputMask
            mask="99999-999"
            value={cep}
            onChange={onCepChange}
            maskChar="_"
            placeholder="CEP"
            className="ant-input css-dev-only-do-not-override-1hpnbz2 ant-input-outlined border rounded p-4 w-full text-lg"
          />
          <Input
            value={municipio}
            onChange={(e) => setMunicipio(e.target.value)}
            placeholder="Município"
            className="p-4 w-full text-lg"
          />
          <Input
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            placeholder="Bairro"
            className="p-4 w-full text-lg"
          />
          <Input
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            placeholder="Rua"
            className="p-4 w-full text-lg"
          />
          <Input
            type="number"
            value={numero}
            onChange={(e) => setNumero(Number(e.target.value))}
            placeholder="Número"
            className="p-4 w-full text-lg"
          />
          <TextArea
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            autoSize
            placeholder="Referência"
            className="p-4 w-full text-lg"
          />

          <div className="flex justify-end space-x-4">
            <Button
              type='primary'
              color='default'
              variant='filled'
              onClick={handleCancel}
              className="p-4 text-lg rounded"
            >
              Cancelar
            </Button>
            <Button
              type='primary'
              onClick={handleSubmit}
              className="p-4 text-lg rounded"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnderecoModal;
