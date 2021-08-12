import Link from 'next/link';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { RecipeRead } from '../../api/models';
import { deleteQueryID, getQuerySimple } from '../../api/quries';
import { Spinner } from '@chakra-ui/react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../features/reducer';

const RecipeContainer = styled.div`
  display: flex;

  a {
    margin-left: 20px;
    font-size: 26px;
    color: ${props => props.theme.text.heavy};
  }

  .delete {
    cursor: pointer;
    color: ${props => props.theme.system.error};
    font-weight: 600;
    font-size: 40px;
    line-height: 1;
    margin-left: 20px;
  }
`;

interface IRecipe {
  recipe: RecipeRead
}

const Recipe: React.FC<IRecipe> = (props) => {
  const queryClient = useQueryClient();
  const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });

  const deleteRecipeMutation = useMutation<RecipeRead, unknown, number>(id => deleteQueryID<RecipeRead>(jwt, 'recipe', id), {
    onSuccess: () => {
      console.log('succeded');
      queryClient.invalidateQueries('recipes');
    }
  });

  return <RecipeContainer>
    <Link href={`/recipes/${props.recipe.id}`}>{props.recipe.description != null ? <a title={props.recipe.description}>{props.recipe.name}</a> : props.recipe.name}</Link>
    <Link href={`/recipes/edit?id=${props.recipe.id}`}>🖋️</Link>
    <button onClick={() => deleteRecipeMutation.mutate(props.recipe.id!)} className='delete'>X</button>
  </ RecipeContainer>;
};

const BaseContainer = styled.ul`
  display: flex;
  flex-direction: column;

  #name {
    margin-top: 40px;
    font-size: 40px;
    font-weight: 600;
    color: ${props => props.theme.text.flavour2};
  }
`;

const IdCheck: React.FC = () => {
  const auth = useSelector((state: RootState) => { return state.authentication; });
  const { data, isLoading, isError, error } = useQuery<RecipeRead[], Error>('recipes', () => getQuerySimple(auth.jwt, 'recipe'), {
    enabled: auth.isAuthenticated
  });

  if (isError) return <>{error}</>;
  if (isLoading || data == undefined) return <Spinner />;

  return (
    <BaseContainer>
      <div id='name'>
        Recipes
      </ div>
      {data!.map((recipe) => (<div key={recipe.id} className='recipe'>
        <Recipe key={recipe.id} recipe={recipe} />
      </ div>))}
    </BaseContainer>
  );
};

export default IdCheck;
