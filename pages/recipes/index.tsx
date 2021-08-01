import Link from 'next/link';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { RecipeRead } from '../../api/models';
import { getAllRecipes } from '../../api/quries';
import { Spinner } from '@chakra-ui/react';

const Container = styled.ul`
  display: flex;
  flex-direction: column;

  #name {
    margin-top: 40px;
    font-size: 40px;
    font-weight: 600;
    color: ${props => props.theme.text.flavour2};
  }

  a {
    margin-left: 20px;
    font-size: 26px;
  }
`;

const RecipesIndex: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<RecipeRead[], Error>('accounts', () => getAllRecipes());
  if (isError) return <>{error}</>;
  if (isLoading) return <Spinner />;
  return (
    <Container>
      <div id='name'>
        Recipes  
      </ div>
      {data!.map((recipe) => (
        <Link href={`/recipes/edit?id=${recipe.id}`} key={recipe.id}>{recipe.description != null ? <a title={recipe.description}>{recipe.name}</a> : recipe.name}</Link>
      ))}
    </Container>
  );
};

export default RecipesIndex;
