import { Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import { MeasureRead } from "../../api/models"

interface IDropDown {
  measures?: MeasureRead[]
  selectedMeasure: MeasureRead | undefined
  setSelectedMeasure: Dispatch<SetStateAction<MeasureRead | undefined>> 
}

const Base = styled.div`
  border: none;
  height: 28px;
  width: 60px;
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

const SimpleDropDown: React.FC<IDropDown> = ( props ) => {
  return (
    <Base>
      <span>{props.selectedMeasure?.name}</span>
      {props.measures?.map((measure) => (
        <button onClick={() => props.setSelectedMeasure(measure)} key={measure.id} className="content">{ measure.name }</button>
      ))}
    </Base>
  )
}


export default SimpleDropDown