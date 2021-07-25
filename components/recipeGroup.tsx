import React from 'react'
import { RecipeGroupRead } from '../api/models'

interface Props {
  group: RecipeGroupRead
}

const RecipeGroup: React.FC<Props> = (props) => {
  return <>{props.group.name}</>
}

export default RecipeGroup