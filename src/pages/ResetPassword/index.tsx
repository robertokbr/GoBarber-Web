import React, { useRef, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import api from '../../services/api';
import {
  Container,
  Background,
  Content,
  AnimationContainerSignIn,
} from './styles';
import logo from '../../assets/logo.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const location = useLocation();
  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required(
            'A senha deve ter no minimo 6 digitos',
          ),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'As senhas devem ser equivalentes',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');
        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Senha alterada!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar a senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimationContainerSignIn>
          <img src={logo} alt="Gobarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Nova Senha"
            />
            <Input
              icon={FiLock}
              name="password_confirmation"
              type="password"
              placeholder="Confirmar Nova Senha"
            />
            <Button type="submit">Alterar senha</Button>
          </Form>
        </AnimationContainerSignIn>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
