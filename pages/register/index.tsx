import React, { useState } from 'react';
import { LoginInput } from '../../components/form/inputs';
import styled from 'styled-components';
import { InputLabel } from '../../components/form/labels';
import { AuthFailResponse, AuthSuccessResponse, UserRegistrationRequest } from '../../api/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { postAccountQuery } from '../../api/accountQueries';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  #loginButton {
    margin-top: 10px;
  }
`;

const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 260px;
  width: 300px;
  justify-content: space-around;
`;

const RegisterButton = styled.input`
  background-color: ${props => props.theme.text.flavour};
  width: 140px;
  height: 40px;
  color: ${props => props.theme.text.light};
  font-weight: 600;
  cursor: pointer;
`;

const RegisterIndex: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UserRegistrationRequest>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();
  const registerMutation = useMutation<AuthSuccessResponse | AuthFailResponse, unknown, UserRegistrationRequest>(body => postAccountQuery<UserRegistrationRequest>(body, 'register'), {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts');
      reset({});
      setPasswordRepeat('');
    }
  });
  
  const onSubmit: SubmitHandler<UserRegistrationRequest> = data => {
    registerMutation.mutate(data);
  };

  return <Container>
    <RegisterForm id='registerForm' onSubmit={handleSubmit(onSubmit)}>
      <div className='group'>
        <InputLabel>E-mail</InputLabel>
        <LoginInput light type='email' {...register('email')} />
      </div>
      <div className='group'>
        <InputLabel>Password</InputLabel>
        <LoginInput light type='password' value={passwordRepeat} onChange={e => setPasswordRepeat((e.target as HTMLInputElement).value)} />
      </div>
      <div className='group'>
        <InputLabel>Repeat Password</InputLabel>
        <LoginInput light type='password' {...register('password', {
          required: true,
          validate: value => 
            value === passwordRepeat || 'The passwords do not match'
        })}/>
      </div>
      
      <RegisterButton id='loginButton' type='submit' value='Register' />
    </RegisterForm>
    <div />
  </Container>;
};

export default RegisterIndex;
