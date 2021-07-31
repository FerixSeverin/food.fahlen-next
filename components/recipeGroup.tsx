import axios from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import { IngredientCreate, IngredientRead, MeasureRead, RecipeGroupReadWithIngredientRead } from '../api/models'
import SimpleDropdown from './form/dropdown'
import { SimpleInput } from './form/inputs'
import { InputLabel } from './form/labels'

interface Props {
  group: RecipeGroupReadWithIngredientRead
  measures?: MeasureRead[] | undefined | null
}

const GroupName = styled.ul`
  color: ${props => props.theme.text.flavour2};
`

const AddNewIngredientForm = styled.form`
  .inputs {
    display: flex;

  }
`

const RecipeGroup: React.FC<Props> = (props) => {
  const queryClient = useQueryClient()
  const [selectedMeasure, setSelectedMeasure] = useState<MeasureRead>()
  const { register, handleSubmit, reset, control } = useForm<IngredientCreate>({
    defaultValues: {
      recipeGroupId: props.group.id,
      measureId: selectedMeasure?.id
    }
  })
  const ingredientMutation = useMutation<Response, unknown, IngredientCreate>(body => axios.post('http://localhost:5000/api/ingredient', body), {
    onSuccess: () => {
      reset({})
      queryClient.invalidateQueries('recipeGroups')
    }
  })

  const onSubmit: SubmitHandler<IngredientCreate> = data => {
    console.log(data)
    ingredientMutation.mutate(data)
  }

  

  return (
    <GroupName>
      {props.group.name}
      {props.group.ingredients?.map((ingredient) => (
        <li>{ingredient.name}</li>
      ))}
      <AddNewIngredientForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel small>Add ingredient (name, amount, measure)</InputLabel>
        <div className="inputs">
          <SimpleInput {...register('name')}></SimpleInput>
          <SimpleInput type='number' small {...register('amount')}></SimpleInput>
          <SimpleDropdown control={control} {...register('measureId')} measures={props.measures} selectedMeasure={selectedMeasure} setSelectedMeasure={setSelectedMeasure}></SimpleDropdown>
          <input type="submit" value="+" />
        </div>
        
        
      </AddNewIngredientForm>
    </GroupName>
  )
}

export default RecipeGroup