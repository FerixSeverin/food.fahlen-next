import Router from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postAccountQuery } from '@api/accountQueries';
import { AuthFailResponse, AuthSuccessResponse, UserLoginRequest } from '@api/models';
import { Alert } from '@components/alert';
// import { AuthContext } from '../../components/state/authProvider';
import { LoginInput } from '@components/form/inputs';
import { InputLabel } from '@components/form/labels';
import { login } from '@features/authentication/authenticationReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  #buttonRow {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
  }
`;

const LoginButton = styled.input`
  background-color: ${props => props.theme.text.flavour2};
  width: 140px;
  height: 40px;
  color: ${props => props.theme.text.light};
  border-radius: ${props => props.theme.form.border_radius}px;
  font-weight: 600;
  cursor: pointer;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  justify-content: space-around;
  
  #welcomeText {
    margin-bottom: 20px;
    font-size: 26px;
    font-weight: 600;
    color: ${props => props.theme.text.flavour2};
  }
`;

const LoginIndex: React.FC = () => {
  // const [authState, setAuthState] = useContext(AuthContext);
  const [errors, setErrors] = useState<string[]>([]);
  const { register, handleSubmit, reset } = useForm<UserLoginRequest>();
  const dispatch = useDispatch();
  const loginMutation = useMutation<AuthSuccessResponse | AuthFailResponse, unknown, UserLoginRequest>(body => postAccountQuery<UserLoginRequest>(body, 'login'), {
    onSuccess: (data) => {
      if (data != undefined && 'token' in data) {
        dispatch(login((data as AuthSuccessResponse).token));
        // setAuthState({ jwt: (data as AuthSuccessResponse).token! });
        reset({});
        Router.push('/recipes/');
        setErrors([]);
      } else if ('errors' in data && data.errors != null) {
        setErrors(data.errors);
      }
    }
  });

  const onSubmit: SubmitHandler<UserLoginRequest> = data => {
    loginMutation.mutate(data);
  };

  return <Container>
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
      { errors != [] && <Alert errors={errors}/> }
      <div id='welcomeText'>Welcome back.</div>
      <div className='group'>
        <InputLabel>E-mail</InputLabel>
        <LoginInput type='email' {...register('email')} />
      </div>
      <div className='group'>
        <InputLabel>Password</InputLabel>
        <LoginInput type='password' {...register('password')} />
      </div>
      <div id='buttonRow'>
        <LoginButton type='submit' value='Login' />
        <LoginButton type='button' onClick={() => Router.push('/register')} value='Register'/>
      </div>
      
    </LoginForm>
    <div />
  </Container>;
};

export default LoginIndex;
