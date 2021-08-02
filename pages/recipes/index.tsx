import Link from 'next/link';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { RecipeRead } from '../../api/models';
import { getAllRecipes } from '../../api/quries';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';

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
  
  const deleteRecipeMutation = useMutation<Response, unknown, number>(id => axios.delete(`http://localhost:5000/api/instruction/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('accounts');
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
  const { data, isLoading, isError, error } = useQuery<RecipeRead[], Error>('accounts', () => getAllRecipes());
  if (isError) return <>{error}</>;
  if (isLoading) return <Spinner />;

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
