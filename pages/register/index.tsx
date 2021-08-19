import React, { useState } from 'react';
import { LoginInput } from '@components/form/inputs';
import styled from 'styled-components';
import { InputLabel } from '@components/form/labels';
import { AuthFailResponse, AuthSuccessResponse, UserRegistrationRequest } from '@api/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { postAccountQuery } from '@api/accountQueries';
import Router from 'next/router';
import { Alert } from '@components/alert';
import { useDispatch } from 'react-redux';
import { login } from '@features/authentication/authenticationReducer';

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
  border-radius: ${props => props.theme.form.border_radius}px;
  font-weight: 600;
  cursor: pointer;
`;

const RegisterIndex: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<UserRegistrationRequest>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();
  const dispatch = useDispatch();
  const registerMutation = useMutation<AuthSuccessResponse | AuthFailResponse, unknown, UserRegistrationRequest>(body => postAccountQuery<UserRegistrationRequest>(body, 'register'), {
    onSuccess: (data) => {
      if (data != undefined && 'token' in data) {
        dispatch(login((data as AuthSuccessResponse).token));
        localStorage.setItem('refresh', 'true');
        reset({});
        Router.push('/recipes');
        setErrors([]);
        setPasswordRepeat('');
      } else if ('errors' in data && data.errors != null) {
        localStorage.setItem('refresh', 'false');
        setErrors(data.errors);
      }
    }
  });
  
  const onSubmit: SubmitHandler<UserRegistrationRequest> = data => {
    registerMutation.mutate(data);
  };

  return <Container>
    <RegisterForm id='registerForm' onSubmit={handleSubmit(onSubmit)}>
      { errors != [] && <Alert errors={errors}/> }
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
