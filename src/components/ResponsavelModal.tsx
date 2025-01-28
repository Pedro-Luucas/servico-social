import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { Responsavel } from '../types';

interface ResponsavelModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (responsavel: Responsavel) => void;
  initialData?: Responsavel;
}

const ResponsavelModal: React.FC<ResponsavelModalProps> = ({
  open,
  onClose,
  onSave,
  initialData
}) => {
  const [form] = Form.useForm();

  // Reset form when modal closes
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Modal
      title={initialData ? "Editar Responsável" : "Adicionar Responsável"}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText="Salvar"
      cancelText="Cancelar"
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        autoComplete="off"
      >
        <Form.Item
          name="nome"
          label="Nome"
          rules={[{ required: true, message: 'Por favor, insira o nome' }]}
        >
          <Input placeholder="Nome do responsável" />
        </Form.Item>

        <Form.Item
          name="cpf"
          label="CPF"
          rules={[
            { required: true, message: 'Por favor, insira o CPF' },
            { pattern: /^\d{11}$/, message: 'CPF deve conter 11 dígitos' }
          ]}
        >
          <Input placeholder="CPF (somente números)" maxLength={11} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="idade"
            label="Idade"
            rules={[{ required: true, message: 'Por favor, insira a idade' }]}
          >
            <InputNumber
              min={0}
              max={150}
              placeholder="Idade"
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[
              { required: true, message: 'Por favor, insira o telefone' },
              { pattern: /^\d{10,11}$/, message: 'Telefone inválido' }
            ]}
          >
            <Input placeholder="Telefone (somente números)" maxLength={11} />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="profissao"
            label="Profissão"
          >
            <Input placeholder="Profissão" />
          </Form.Item>

          <Form.Item
            name="escolaridade"
            label="Escolaridade"
            rules={[{ required: true, message: 'Por favor, selecione a escolaridade' }]}
          >
            <Select placeholder="Selecione a escolaridade">
              <Select.Option value={0}>Ensino fundamental incompleto</Select.Option>
              <Select.Option value={1}>Ensino fundamental completo</Select.Option>
              <Select.Option value={2}>Ensino médio incompleto</Select.Option>
              <Select.Option value={3}>Ensino médio completo</Select.Option>
              <Select.Option value={4}>Ensino superior incompleto</Select.Option>
              <Select.Option value={5}>Ensino superior completo</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="parentesco"
          label="Parentesco"
          rules={[{ required: true, message: 'Por favor, insira o parentesco' }]}
        >
          <Input placeholder="Parentesco (ex: Mãe, Pai, Irmão)" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResponsavelModal;