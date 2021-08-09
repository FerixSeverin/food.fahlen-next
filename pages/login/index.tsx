import Router from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { loginQuery } from '../../api/accountQueries';
import { AuthFailResponse, AuthSuccessResponse, UserLoginRequest } from '../../api/models';
// import { AuthContext } from '../../components/state/authProvider';
import { LoginInput } from '../../components/form/inputs';
import { InputLabel } from '../../components/form/labels';
import { login } from '../../features/authentication/authenticationReducer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;

  #buttonRow {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }
`;

const LoginButton = styled.input`
  background-color: ${props => props.theme.text.flavour2};
  width: 140px;
  height: 40px;
  color: ${props => props.theme.text.light};
  font-weight: 600;
  cursor: pointer;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 300px;
  justify-content: space-around;
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

  return <Container>
    <LoginForm onSubmit={handleSubmit(onSubmit)}>
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
