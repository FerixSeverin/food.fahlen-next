import axios from 'axios'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import { IngredientCreate, IngredientRead, MeasureRead, RecipeGroupRead } from '../api/models'
import SimpleDropdown from './form/dropdown'
import { SimpleInput } from './form/inputs'
import { InputLabel } from './form/labels'

interface Props {
  group: RecipeGroupRead
  measures?: MeasureRead[]
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
  const { register, handleSubmit, reset } = useForm<IngredientCreate>({
    defaultValues: {
      recipeGroupId: props.group.id
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

  const [selectedMeasure, setSelectedMeasure] = useState<MeasureRead>()

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
          <SimpleInput small {...register('amount')}></SimpleInput>
          <SimpleDropdown {...register('measureId')} measures={props.measures} selectedMeasure={selectedMeasure} setSelectedMeasure={setSelectedMeasure}></SimpleDropdown>
          <input type="submit" value="+" />
        </div>
        
        
      </AddNewIngredientForm>
    </GroupName>
  )
}

export default RecipeGroup