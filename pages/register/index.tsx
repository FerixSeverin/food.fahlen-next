import React, { useState } from 'react';
import { SimpleInput } from '../../components/form/inputs';
import styled from 'styled-components';
import { InputLabel } from '../../components/form/labels';
import { AuthFailResponse, AuthSuccessResponse, UserRegistrationRequest } from '../../api/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { registerQuery } from '../../api/accountQueries';

const RegisterForm = styled.form`

`;

const RegisterIndex: React.FC = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<UserRegistrationRequest>();
  const [passwordRepeat, setPasswordRepeat] = useState<string>();
  const registerMutation = useMutation<AuthSuccessResponse | AuthFailResponse, unknown, UserRegistrationRequest>(body => registerQuery(body), {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts');
      reset({});
      setPasswordRepeat('');
    }
  });
  //const { data } = useQuery<AccountRead[], Error>('accounts', () => getAllAccounts());
  
  const onSubmit: SubmitHandler<UserRegistrationRequest> = data => {
    registerMutation.mutate(data);
  };

  return (
    <RegisterForm id='registerForm' onSubmit={handleSubmit(onSubmit)}>
        {/* <InputLabel>First Name</InputLabel>
        <SimpleInput type='text' {...register('firstName')} />
        <InputLabel>Last Name</InputLabel>
        <SimpleInput type='text' {...register('lastName')} /> */}
        <InputLabel>E-mail</InputLabel>
        <SimpleInput type='email' {...register('email')} />
        <InputLabel>Password</InputLabel>
        <SimpleInput type='password' value={passwordRepeat} onChange={e => setPasswordRepeat((e.target as HTMLInputElement).value)} />
        <InputLabel>Repeat Password</InputLabel>
        <SimpleInput type='password' {...register('password', {
          required: true,
          validate: value => 
            value === passwordRepeat || 'The passwords do not match'
        })}/>
        <input type='submit' />

        {/* <ul>
          {data?.map((account) => (
            <li key={account.id}>{ account.firstName } {account.id}</li>
          ))}
        </ul> */}
    </RegisterForm>
  );
};

export default RegisterIndex;
