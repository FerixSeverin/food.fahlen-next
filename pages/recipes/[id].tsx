import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getQueryID } from '@api/quries';
import { RecipeGroupReadWithIngredientRead, RecipeReadWithRecipeGroups } from '@api/models';
import { Spinner } from '@chakra-ui/react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '@features/reducer';

const GroupContainer = styled.div`
  font-size: 26px;
  color: ${props => props.theme.text.flavour2};

  .item {
    list-style: none;
    color: ${props => props.theme.text.medium};
    font-size: 20px;
    display: flex;
    margin-left: 20px;

    .name {
      font-weight: 600;
    }

    .amount {
      margin-left: 10px;
    }

    .measure {
      margin-left: 10px;
    }
  }
`;

interface IGroup {
  recipeGroup: RecipeGroupReadWithIngredientRead
}

const Group: React.FC<IGroup> = (props) => {
  return <GroupContainer>
    {props.recipeGroup.name}
    {props.recipeGroup.ingredients?.map((ingredient) => (
      <li className='item' key={ingredient.id}>
        <div className='name'>{ingredient.name}</div>
        {ingredient.amount != 0 && <div className='amount'>{ingredient.amount}</div>}
        {ingredient.measure?.symbol != 'Any' && <div className='measure'>{ingredient.measure?.symbol}</div>}
      </li>
    ))}
  </GroupContainer>;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  #name {
    font-size: 40px;
    font-weight: 600;
    color: ${props => props.theme.text.heavy};
  }

  #description {
    font-size: 20px;
    color: ${props => props.theme.text.flavour};
  }

  .part {
    margin-top: 40px;
    width: 470px;

    #instructionTitle {
      color: ${props => props.theme.text.flavour2};
      font-weight: 600;
      font-size: 32px;
      align-self: flex-end;
      width: 400px;
    }

    #instructions {
      .instruction {
        list-style: none;
        display: flex;

        .order {
          font-weight: 600;
          margin-right: 10px;
        }
      }
    }
  }
`;

interface IRecipeViewer {
  recipe: RecipeReadWithRecipeGroups
}

const RecipeViewer: React.FC<IRecipeViewer> = (props) => {
  return <Container>
    <div className='part'>
      <div id='name'>{props.recipe.name}</div>
      <div id='description'>{props.recipe.description}</div>
      {props.recipe.recipeGroups?.map((group) => (
        <Group key={group.id} recipeGroup={group} />
      ))}
    </div>
    <div className='part'>
      <div id='instructionTitle'>
        Instructions
      </div>
      <div id='instructions'>
        {props.recipe.instructions?.map((instruction) => (
          <li key={instruction.id} className='instruction'>
            <div className='order'>{instruction.order}</div>
            <div className='text'>{instruction.text}</div>
          </li>
        ))}
      </div>
    </div>
  </Container>;
};

interface IRecipeFetch {
  id: number
}

const RecipeFetch: React.FC<IRecipeFetch> = (props) => {
  const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  const { data, isLoading, isError, error } = useQuery<RecipeReadWithRecipeGroups, Error>('recipeEdit', () => getQueryID<RecipeReadWithRecipeGroups>(jwt, 'recipe/all', props.id));
  if (isError) return <>{ error }</>;
  if (isLoading) return <Spinner />;
  return <RecipeViewer recipe={data!}/>;
};

const IdCheck: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  if (id === undefined) return <>No Id</>;

  return <RecipeFetch id={+id}/>;
};

export default IdCheck;
