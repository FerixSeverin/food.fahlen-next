import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { InstructionRead } from '../api/models';

const Container = styled.div`
  display: flex;
  margin-bottom: 5px;

  #order {
    font-weight: 600;
    margin-right: 10px;
  }

  #text {
    flex-grow: 1;
    word-wrap: break-word;
  }

  #delete {
    color: ${props => props.theme.system.error};
    font-weight: 600;
    margin-left: 10px;
  }
`;

interface IRecipeInstruction {
  instruction: InstructionRead
}

const RecipeInstruction: React.FC<IRecipeInstruction> = (props) => {
  const queryClient = useQueryClient();
  
  const deleteInstructionMutation = useMutation<Response, unknown, number>(id => axios.delete(`http://localhost:5000/api/instruction/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries('recipeGroups');
      queryClient.invalidateQueries('recipeEdit');
    }
  });

  return <Container>
    <div id='order'>{props.instruction.order}</div>
    <div id='text'>{props.instruction.text}</div>
    <button onClick={() => deleteInstructionMutation.mutate(props.instruction.id!)}id='delete'>X</button>
  </ Container>;
};

export default RecipeInstruction;
