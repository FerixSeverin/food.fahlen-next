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

const GroupName = styled.ul`
  color: ${props => props.theme.text.flavour2};
`;

const AddNewIngredientForm = styled.form`
  .inputs {
    display: flex;
  }
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
    <GroupName>
      {props.group.name}
      {props.group.ingredients?.map((ingredient) => (
        <li key={ ingredient.id }>{ ingredient.name }</li>
      ))}
      <AddNewIngredientForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel small>Add ingredient (name, amount, measure)</InputLabel>
        <div className='inputs'>
          <SimpleInput {...register('name')} />
          <SimpleInput type='number' small {...register('amount')} />
          {/* <SimpleDropdown control={ control } options={ props.measures! } name={'measureId'}/> */}
          <select {...register('measureId')}>
            {props.measures?.map((measure) => (
              <option key={measure.id} value={measure.id}>{measure.name} {measure.symbol}</option>
            ))}
          </select>
          <input type='submit' value='+' />
        </div>
      </AddNewIngredientForm>
    </GroupName>
  );
};

export default RecipeGroup;
