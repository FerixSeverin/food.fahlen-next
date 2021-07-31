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
`;

const RecipesIndex: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<RecipeRead[], Error>('accounts', () => getAllRecipes());
  if (isError) return <>{error}</>;
  if (isLoading) return <Spinner />;
  return (
    <Container>
      {data!.map((recipe) => (
        <Link href={`/recipes/edit?id=${recipe.id}`} key={recipe.id}>{ recipe.name }</Link>
      ))}
    </Container>
  );
};

export default RecipesIndex;
