import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RecipeCreate, RecipeRead } from '../../../api/models';
import { createRecipe } from '../../../api/quries';
import { SimpleInput } from '../../../components/form/inputs';
import { InputLabel } from '../../../components/form/labels';
import { RootState } from '../../../features/reducer';
import Router from 'next/router';

const RecipeForm = styled.form`
  
`;

const CreateIndex: React.FC = () => {
  const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  const { register, handleSubmit, reset, formState } = useForm<RecipeCreate>({
    shouldFocusError: true,
    defaultValues: {
      favorite: false,
    }
  });

  const recipeMutation = useMutation<RecipeRead, unknown, RecipeCreate>(body => createRecipe(body, jwt), {
    onSuccess: (data) => {
      reset({});
      Router.push(`/recipes/${data.id}`);
    }
  });

  const onSubmit: SubmitHandler<RecipeCreate> = data => {
    console.log(data);
    recipeMutation.mutate(data);
  };

  const { isDirty, isValid } = formState;
  
  return (
    <RecipeForm onSubmit={handleSubmit(onSubmit)}>
      <InputLabel>Name</InputLabel>
      <SimpleInput {...register('name')} />
      <InputLabel>Description</InputLabel>
      <SimpleInput {...register('description')} />

      <input type='hidden' {...register('favorite')} />

      <input type='submit' disabled={!isDirty || !isValid}/>
    </RecipeForm>
  
  );

};

export default CreateIndex;
