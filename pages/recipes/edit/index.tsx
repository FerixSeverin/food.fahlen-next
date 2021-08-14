import React, { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { InstructionCreate, RecipeGroupCreate, RecipeReadWithRecipeGroups } from '../../../api/models';
import { getQueryID } from '../../../api/quries';
import styled from 'styled-components';
import RecipeGroup from '../../../components/recipeGroup';
import { InputLabel } from '../../../components/form/labels';
import { BoxInput, SimpleInput } from '../../../components/form/inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import RecipeInstruction from '../../../components/recipeInstruction';
import { Divider } from '../../../components/divider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/reducer';

interface IEditor {
  data: RecipeReadWithRecipeGroups
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 100px;
  justify-content: space-between;

  .part {
    margin-top: 40px;
    flex-direction: column;
    align-items: center;
    width: 470px;

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

    #instructionTitle {
      color: ${props => props.theme.text.flavour2};
      font-weight: 600;
      font-size: 32px;
      align-self: flex-end;
      width: 400px;
    }
  }
  
`;

const NewRecipeGroupForm = styled.form`
  
  line-height: 2;
  
  #submit {
    background-color: ${props => props.theme.text.flavour};
    color: ${props => props.theme.text.light};
    font-weight: 600;
    margin-left: 10px;
    width: 100px;
    height: inherit;
    cursor: pointer;
  }
`;

const NewRecipeInstruction = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .lower {
    margin-top: 10px;
  }

  #text {
    margin-top: 5px;
  }

  #submit {
    background-color: ${props => props.theme.text.flavour};
    color: ${props => props.theme.text.light};
    font-weight: 600;
    margin-left: 10px;
    width: 100px;
    height: inherit;
    cursor: pointer;
    text-align: center;
  }
`;

const Editor: React.FC<IEditor> = (props) => {
  const [favorite, setFavorite] = useState(props.data.favorite);
  const favoriteToggler = () => {
    if (favorite === false) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<RecipeGroupCreate>({
    defaultValues: {
      recipeId: props.data.id
    }
  });

  const queryClient = useQueryClient();
  const recipeGroupMutation = useMutation<Response, unknown, RecipeGroupCreate>(body => axios.post('https://api.fahlen.dev/recipegroup', body), {
    onSuccess: () => {
      reset({recipeId: props.data.id});
      queryClient.invalidateQueries('recipeEdit');
      queryClient.invalidateQueries('recipeGroups');
    }
  });

  const onSubmit: SubmitHandler<RecipeGroupCreate> = data => {
    recipeGroupMutation.mutate(data);
  };

  const { isDirty, isValid } = formState;

  const { register: instructionRegister, handleSubmit: instructionHandleSubmit, reset: instructionReset } = useForm<InstructionCreate>({
    defaultValues: {
      recipeId: props.data.id
    }
  });

  const instructionMutation = useMutation<Response, unknown, InstructionCreate>(body => axios.post('https://api.fahlen.dev/instruction', body), {
    onSuccess: () => {
      instructionReset({recipeId: props.data.id});
      queryClient.invalidateQueries('recipeEdit');
    }
  });

  const onInstructionSubmit: SubmitHandler<InstructionCreate> = data => {
    instructionMutation.mutate(data);
  };

  return <Container>
    <div className='part'>
      <div id='name'>
        {props.data?.name}
        <button onClick={favoriteToggler}>{favorite === true ? '❤️' : '🤍'}</button>
      </div>
      <div id='description'>{props.data.description}</div>
      <div id='groups'>
        {props.data.recipeGroups?.map((group) => (
          <RecipeGroup group={group} key={group.id} measures={props.data.measures!} />
        ))}
      </div>
      <NewRecipeGroupForm onSubmit={handleSubmit(onSubmit)}>
        <InputLabel>New group</InputLabel>
        <SimpleInput {...register('name')}/>
        <input id='submit' value='+' type='submit' disabled={!isDirty || !isValid}/>
      </NewRecipeGroupForm>
    </div>
    <div className='part'>
      <div id='instructionTitle'>
        Instructions
      </div>
      <div id='instructions'>
        {props.data.instructions?.map((instruction) => (
          <RecipeInstruction key={ instruction.id } instruction={ instruction } />
        ))}
        <NewRecipeInstruction onSubmit={instructionHandleSubmit(onInstructionSubmit)}>
          <Divider />
          New Instruction
          <BoxInput id='text' {...instructionRegister('text')}/>
          <div className='lower'>
            Order: <SimpleInput small type='number' {...instructionRegister('order')}/>
            <input type='submit' id='submit' value='+' />
          </div>
          
        </NewRecipeInstruction>
      </div>
    </div>
  </ Container>;
};

interface IRecipeEditor {
  id: number
}

const Recipe: React.FC<IRecipeEditor> = ( props ) => {
  const jwt = useSelector((state: RootState) => { return state.authentication.jwt; });
  const { data, isLoading, isError, error } = useQuery<RecipeReadWithRecipeGroups, Error>('recipeEdit', () => getQueryID<RecipeReadWithRecipeGroups>(jwt, '/recipe/all', props.id));
  
  if (isError) return <>{ error }</>;
  if (isLoading) return <Spinner />;
  return <Editor data={ data! } />;
};

const Index: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  if (id === undefined) return <>No Id</>;

  return <Recipe id={ +id } />;
};

export default Index;
