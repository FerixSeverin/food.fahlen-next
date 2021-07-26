import axios from 'axios'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { RecipeCreate } from '../../../api/models'
import { SimpleInput } from '../../../components/form/inputs'
import { InputLabel } from '../../../components/form/labels'

const RecipeForm = styled.form`
  
`

const CreateIndex: React.FC = () => {
  const { register, handleSubmit, reset, formState } = useForm<RecipeCreate>({
    shouldFocusError: true,
    defaultValues: {
      favorite: false,
      accountId: 2,
    }
  })
  const recipeMutation = useMutation<Response, unknown, RecipeCreate>(body => axios.post('http://localhost:5000/api/recipe', body), {
    onSuccess: () => {
      reset({})
    }
  })

  const onSubmit: SubmitHandler<RecipeCreate> = data => {
    console.log(data)
    recipeMutation.mutate(data)
  }

  const { isDirty, isValid } = formState
  
  return (
    <RecipeForm onSubmit={handleSubmit(onSubmit)}>
      <InputLabel>Name</InputLabel>
      <SimpleInput {...register('name')} />
      <InputLabel>Description</InputLabel>
      <SimpleInput {...register('description')} />

      <input type="hidden" {...register('favorite')} />
      <input type="hidden" {...register('accountId')} />

      <input type="submit" disabled={!isDirty || !isValid}/>
    </RecipeForm>
  
  )

}

export default CreateIndex