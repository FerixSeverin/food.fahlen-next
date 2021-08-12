import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RecipeCreate, RecipeRead } from '../../../api/models';
import { postQuery } from '../../../api/quries';
import { LoginInput } from '../../../components/form/inputs';
import { InputLabel } from '../../../components/form/labels';
import { RootState } from '../../../features/reducer';
import Router from 'next/router';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const NewRecipeButton = styled.input`
  background-color: ${props => props.theme.text.flavour};
  width: 140px;
  height: 40px;
  color: ${props => props.theme.text.light};
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
`;

const RecipeForm = styled.form`
  width: 280px;
`;

const CreateIndex: React.FC = () => {
  const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  const { register, handleSubmit, reset, formState } = useForm<RecipeCreate>({
    shouldFocusError: true,
    defaultValues: {
      favorite: false,
    }
  });

  const recipeMutation = useMutation<RecipeRead, unknown, RecipeCreate>(body => postQuery<RecipeCreate, RecipeRead>(jwt, 'recipe', body), {
    onSuccess: (data) => {
      reset({ favorite: false });
      Router.push(`/recipes/${data.id}`);
    }
  });

  const onSubmit: SubmitHandler<RecipeCreate> = data => {
    console.log(data);
    recipeMutation.mutate(data);
  };

  const { isDirty, isValid } = formState;
  
  return <Container>
    <RecipeForm onSubmit={handleSubmit(onSubmit)}>
      <div className='group'>
        <InputLabel>Name</InputLabel>
        <LoginInput light {...register('name')} placeholder='The name of the recipe' />
      </div>
      <div className='group'>
        <InputLabel>Description</InputLabel>
        <LoginInput light {...register('description')} placeholder='Describe the meal' />
      </div>

      <NewRecipeButton type='submit' disabled={!isDirty || !isValid}/>
    </RecipeForm>
    <div />
  </Container>;
};

export default CreateIndex;
