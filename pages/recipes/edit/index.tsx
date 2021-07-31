import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RecipeGroupCreate, RecipeReadWithRecipeGroups } from '../../../api/models';
import { getRecipeEditById } from '../../../api/quries';
import styled from 'styled-components';
import RecipeGroup from '../../../components/recipeGroup';
import { InputLabel } from '../../../components/form/labels';
import { SimpleInput } from '../../../components/form/inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';

interface IEditor {
  data: RecipeReadWithRecipeGroups
}

const Editor: React.FC<IEditor> = (props) => {
  const [favorite, setFavorite] = useState(props.data.favorite);
  const favoriteToggler = () => {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<RecipeGroupCreate>({
    defaultValues: {
      recipeId: props.data.id
    }
  });

  const queryClient = useQueryClient();
  const recipeGroupMutation = useMutation<Response, unknown, RecipeGroupCreate>(body => axios.post('http://localhost:5000/api/recipegroup', body), {
    onSuccess: () => {
      reset({});
      queryClient.invalidateQueries('recipeEdit');
      queryClient.invalidateQueries('recipeGroups');
    }
  });

  const onSubmit: SubmitHandler<RecipeGroupCreate> = data => {
    console.log(data);
    recipeGroupMutation.mutate(data);
  };

  const { isDirty, isValid } = formState;

  return <Container>
    <div id='name'>
      {props.data?.name}
      <button onClick={favoriteToggler}>{favorite === true ? '❤️' : '🤍'}</button>
    </div>
    <div id='description'>{props.data.description}</div>
    <div id='groups'>
      {props.data.recipeGroups?.map((group) => (
        <RecipeGroup group={group} key={group.id} measures={props.data.measures} />
      ))}
    </div>
    <NewRecipeGroupForm onSubmit={handleSubmit(onSubmit)}>
      <InputLabel>New group</InputLabel>
      <SimpleInput {...register('name')}/>
      <input type='submit' disabled={!isDirty || !isValid}/>
    </NewRecipeGroupForm>
  </ Container>;
};

const Container = styled.div`
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
  #name {
    color: ${props => props.theme.text.heavy};
    font-size: 62px;
    font-weight: 600;
    line-height: 1.1;
    button {
      border: none;
      margin-left: 20px;
      font-size: 40px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0); 
      padding: 0;
    }
  }

  #description {
    color: ${props => props.theme.text.flavour};
    font-size: 24px;
    line-height: 1;
  }

  #groups {
    margin-top: 20px;
  }
`;

const NewRecipeGroupForm = styled.form`

`;

interface IRecipeEditor {
  id: number
}

const Recipe: React.FC<IRecipeEditor> = ( props ) => {
  const { data, isLoading, isError, error } = useQuery<RecipeReadWithRecipeGroups, Error>('recipeEdit', () => getRecipeEditById(props.id));
  
  if (isError) return <>{ error }</>;
  if (isLoading) return <Spinner />;
  return <Editor data={ data! } />;
};

const Index: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  if (id === undefined) return <>No Id</>;

  return <Recipe id={ +id } />;
};

export default Index;
