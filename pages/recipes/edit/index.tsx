import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useQuery } from 'react-query'
import { RecipeGroupRead, RecipeRead } from '../../../api/models'
import { getRecipe, getRecipeGroups } from '../../../api/quries'
import styled from 'styled-components'
import RecipeGroup from '../../../components/recipeGroup'

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

const EditIndex: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  if (id === undefined) return <>No Id</>
  const { data: recipeData, isSuccess } = useQuery<RecipeRead, Error>('recipe', () => getRecipe(+id))
  const [favorite, setFavorite] = useState(recipeData?.favorite ? true : false)
  const favoriteToggler = () => {
    if (favorite === false) {
      setFavorite(true)
    } else {
      setFavorite(false)
    }
  }

  const { data: recipeGroupData } = useQuery<RecipeGroupRead[], Error>('recipeGroups', () => getRecipeGroups(+id))

  return (
    <Container>
    
      <div id='name'>
        {recipeData?.name}
        <button onClick={favoriteToggler}>{favorite === true ? '❤️' : '🤍'}</button>
      </div>
      <div id='description'>{recipeData?.description}</div>
      <div id='groups'>
        {recipeGroupData?.map((group) => {
          <RecipeGroup group={group} />
        })}
      </div>
    </Container>
  )
}

export default EditIndex