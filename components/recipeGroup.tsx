import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { IngredientCreate, MeasureRead, RecipeGroupReadWithIngredientRead } from '../api/models';
import { SimpleInput } from './form/inputs';
import { InputLabel } from './form/labels';

interface Props {
  group: RecipeGroupReadWithIngredientRead
  measures?: MeasureRead[]
}

const Container = styled.div`
  .groupName {
    color: ${props => props.theme.text.flavour2};
    font-size: 20px;
    font-weight: 600;
  }

  
`;

const Ingredients = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .ingredient {
    list-style: none;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
    color: ${props => props.theme.text.medium};
    font-weight: 600;
  }

  .leftAlign {
    display: flex;
    width: 80px;
    justify-content: space-between;
    align-self: flex-start;
    font-weight: 400;
  }

  .rightAlign {
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    .name {
      margin-right: 20px;
    }

    .delete {
      color: ${props => props.theme.system.error};
      font-weight: 600;
    }
  }
`;

const AddNewIngredientForm = styled.form`
  margin: 20px 0 10px 0;
  width: 100%;
  line-height: 2;

  .inputs {
    display: flex;

    .name {
      margin-right: 10px;
    }

    select {
      flex-grow: 1;
    }
    
    #submit {
      width: 50px;
      background-color: ${props => props.theme.text.flavour};
      color: ${props => props.theme.text.light};
      margin-left: 10px;
      font-weight: 600;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${props => props.theme.text.flavour};
  margin-bottom: 36px;
`;

const RecipeGroup: React.FC<Props> = (props) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<IngredientCreate>({
    defaultValues: {
      recipeGroupId: props.group.id
    }
  });

  const ingredientMutation = useMutation<Response, unknown, IngredientCreate>(body => axios.post('http://localhost:5000/api/ingredient', body), {
    onSuccess: () => {
      queryClient.invalidateQueries('recipeGroups');
      queryClient.invalidateQueries('recipeEdit');
      reset({ recipeGroupId: props.group.id });
    }
  });

  const onSubmit: SubmitHandler<IngredientCreate> = data => {
    console.log(data);
    ingredientMutation.mutate(data);
  };

  const deleteIngredientMutation = useMutation<Response, unknown, number>(id => axios.delete(`http://localhost:5000/api/ingredient/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('recipeGroups');
      queryClient.invalidateQueries('recipeEdit');
    }
  });

  return (
    <Container>
      <div className='groupName'>{props.group.name}</div>
      <Ingredients>
        {props.group.ingredients?.map((ingredient) => (
          <li className='ingredient' key={ ingredient.id }>
            <div className='leftAlign'>
              {ingredient.amount != 0 && <div className='amount'>{ ingredient.amount + ' '}</div> }
              {ingredient.measure?.symbol != 'Any' && <div className='measure'>{ ingredient.measure?.symbol }</div>}
            </div>
            <div className='rightAlign'>
              <div className='name'>{ ingredient.name }</div>
              <button onClick={() => {deleteIngredientMutation.mutate(ingredient.id!);}} className='delete'>X</button>
            </div>
            
          </li>
        ))}
      </Ingredients>
      
      <AddNewIngredientForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel mediumFont small>Add ingredient (name, amount, measure)</InputLabel>
        <div className='inputs'>
          <SimpleInput className='name' {...register('name')} />
          <SimpleInput type='number' small {...register('amount')} />
          {/* <SimpleDropdown control={ control } options={ props.measures! } name={'measureId'}/> */}
          <select {...register('measureId')}>
            {props.measures?.map((measure) => (
              <option key={measure.id} value={measure.id}>{measure.name} {measure.symbol}</option>
            ))}
          </select>
          <input id='submit' type='submit' value='+' />
        </div>
      </AddNewIngredientForm>
      <Divider />
    </Container>
  );
};

export default RecipeGroup;
