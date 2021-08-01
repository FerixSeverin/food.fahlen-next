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
    color: ${props => props.theme.text.medium};
    font-weight: 600;
  }

  .amountMeasure {
    display: flex;
    width: 80px;
    justify-content: space-between;
    font-weight: 400;
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

  return (
    <Container>
      <div className='groupName'>{props.group.name}</div>
      <Ingredients>
        {props.group.ingredients?.map((ingredient) => (
          <li className='ingredient' key={ ingredient.id }>
            {ingredient.amount != 0 && ingredient.measure?.symbol != 'Any' && <div className='amountMeasure'>
              <div className='amount'>{ ingredient.amount === 0 ? '' : ingredient.amount + ' '}</div>           
              <div className='measure'>{ ingredient.measure?.symbol === 'Any' ? '' : ingredient.measure?.symbol }</div>
            </div>}
            <div className='name'>{ ingredient.name }</div>
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
