import Router from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginQuery } from '../../api/accountQueries';
import { AuthFailResponse, AuthSuccessResponse, UserLoginRequest } from '../../api/models';
// import { AuthContext } from '../../components/state/authProvider';
import { SimpleInput } from '../../components/form/inputs';
import { InputLabel } from '../../components/form/labels';
import { login } from '../../features/authentication/authenticationReducer';

const LoginForm = styled.form`

`;

const LoginIndex: React.FC = () => {
  // const [authState, setAuthState] = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm<UserLoginRequest>();
  const dispatch = useDispatch();
  const loginMutation = useMutation<AuthSuccessResponse | AuthFailResponse, unknown, UserLoginRequest>(body => loginQuery(body), {
    onSuccess: (data) => {
      dispatch(login((data as AuthSuccessResponse).token));
      // setAuthState({ jwt: (data as AuthSuccessResponse).token! });
      reset({});
      Router.push('/recipes/');
    }
  });

  const onSubmit: SubmitHandler<UserLoginRequest> = data => {
    loginMutation.mutate(data);
  };

  return <><LoginForm onSubmit={handleSubmit(onSubmit)}>
    <InputLabel>E-mail</InputLabel>
    <SimpleInput type='email' {...register('email')} />
    <InputLabel>Password</InputLabel>
    <SimpleInput type='password' {...register('password')} />
    <input type='submit' />
    
  </LoginForm><button onClick={() => console.log('')}>Hello</button></>;
};

export default LoginIndex;
