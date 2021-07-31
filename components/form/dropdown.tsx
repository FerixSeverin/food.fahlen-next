import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Select from 'react-select';
//import styled from 'styled-components';
import { IngredientCreate, MeasureRead } from '../../api/models';

interface IDropDown {
  options: MeasureRead[],
  name: any,
  control: Control<IngredientCreate>,
}

// const Base = styled(Controller)`
//   border: none;
//   height: 28px;
//   width: 80px;
//   text-align: center;
//   background-color: ${props => props.theme.text.flavour2};
//   color: ${props => props.theme.text.heavy};

//   .content {
//     display: none;
//     background-color: ${prosp => prosp.theme.form.default};
//     cursor: pointer;
//     border: none;
//     border-radius: 0%;
//   }

//   &:hover .content {
//     display: block;
    
//   }
// `;

{/* <span>{props.selectedMeasure?.name}</span> */}
const SimpleDropDown: React.FC<IDropDown> = ( props ) => {
  const [state, setState] = useState(null);
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => <Select
        {...field}
        options={props.options}
        onChange={setState()}
        getOptionLabel={(option) => option.name}
        defaultValue={state}
      />}
    />
  );
};


export default SimpleDropDown;
