import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { MeasureRead, RecipeGroupCreate, RecipeGroupRead, RecipeRead } from '../../../api/models'
import { getAllMeasures, getRecipe, getRecipeGroupsByAccountId } from '../../../api/quries'
import styled from 'styled-components'
import RecipeGroup from '../../../components/recipeGroup'
import { InputLabel } from '../../../components/form/labels'
import { SimpleInput } from '../../../components/form/inputs'
import { SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'

const Container = styled.div`
  margin-top: 40px;
  flex-direction: column;
  align-items: center;
  #name {
    color: ${props => props.theme.text.heavy};
    font-size: 62px;
    font-weight: 600;
    line-height: 1.1;
    button {
      border: none;
      margin-left: 20px;
      font-size: 40px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0);
      padding: 0;
    }
  }

  #description {
    color: ${props => props.theme.text.flavour};
    font-size: 24px;
    line-height: 1;
  }

  #groups {
    margin-top: 20px;
  }
`

const NewRecipeGroupForm = styled.form`

`

const EditIndex: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  if (id === undefined) return <>No Id</>
  const queryClient = useQueryClient()
  const { data: recipeData, isSuccess } = useQuery<RecipeRead, Error>('recipe', () => getRecipe(+id))
  const [favorite, setFavorite] = useState(recipeData?.favorite ? true : false)
  const favoriteToggler = () => {
    if (favorite === false) {
      setFavorite(true)
    } else {
      setFavorite(false)
    }
  }

  const { data: recipeGroupData } = useQuery<RecipeGroupRead[], Error>('recipeGroups', () => getRecipeGroupsByAccountId(+id))
  const { data: measureData } = useQuery<MeasureRead[], Error>('measures', () => getAllMeasures())

  const { register, handleSubmit, reset, formState } = useForm<RecipeGroupCreate>({
    defaultValues: {
      recipeId: +id
    }
  })
  const recipeGroupMutation = useMutation<Response, unknown, RecipeGroupCreate>(body => axios.post('http://localhost:5000/api/recipegroup', body), {
    onSuccess: () => {
      reset({})
      queryClient.invalidateQueries('recipeGroups')
    }
  })

  const onSubmit: SubmitHandler<RecipeGroupCreate> = data => {
    console.log(data)
    recipeGroupMutation.mutate(data)
  }

  const { isDirty, isValid } = formState

  return (
    <Container>
    
      <div id='name'>
        {recipeData?.name}
        <button onClick={favoriteToggler}>{favorite === true ? '❤️' : '🤍'}</button>
      </div>
      <div id='description'>{recipeData?.description}</div>
      <div id='groups'>
        {recipeGroupData?.map((group) => (
          <RecipeGroup group={group} measures={measureData} />
        ))}
      </div>
      <NewRecipeGroupForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel>New group</InputLabel>
        <SimpleInput {...register('name')}/>
        <input type="submit" disabled={!isDirty || !isValid}/>
      </NewRecipeGroupForm>
      
    </Container>
  )
}

export default EditIndex