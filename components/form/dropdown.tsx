import { Dispatch, SetStateAction } from "react"
import { Control, Controller } from "react-hook-form"
import styled from "styled-components"
import { IngredientCreate, MeasureRead } from "../../api/models"

interface IDropDown {
  measures?: MeasureRead[] | undefined | null
  selectedMeasure: MeasureRead | undefined
  setSelectedMeasure: Dispatch<SetStateAction<MeasureRead | undefined>>
  control: Control<IngredientCreate>
}

const Base = styled(Controller)`
  border: none;
  height: 28px;
  width: 80px;
  text-align: center;
  background-color: ${props => props.theme.text.flavour2};
  color: ${props => props.theme.text.heavy};

  .content {
    display: none;
    background-color: ${prosp => prosp.theme.form.default};
    cursor: pointer;
    border: none;
    border-radius: 0%;
  }

  &:hover .content {
    display: block;
    
  }
`
{/* <span>{props.selectedMeasure?.name}</span> */}
const SimpleDropDown: React.FC<IDropDown> = ( props ) => {
  return (
    <Controller
    control={props.control}
    render={
      ({ field }) => (<select {...field}>{props.measures?.map((measure) => (
        <option onClick={() => props.setSelectedMeasure(measure)} value={measure.id} className="content">{ measure.name }</option>
      ))}</select>)
    }
    name='measureId'/>
  )
}


export default SimpleDropDown