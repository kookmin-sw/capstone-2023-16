import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import dummy from './dummy/dummy.json';

const CategoryChoice = () => {
  const deviceType = useDeviceType();
  return <CategoryChoiceContainer deviceType={deviceType}>
    {dummy.map((n: any) => <option key={n.node.id} value={n.node.id}>{n.node.body}</option>)}
  </CategoryChoiceContainer>
};

export default CategoryChoice;

  const CategoryChoiceContainer = styled.select<{ deviceType: string }>`
  width: ${(props) => {return (props.deviceType==='mobile')?'122px': '244px'}};
  height: ${(props) => {return (props.deviceType==='mobile')?'23px': '46px'}};
  padding-left: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  padding-right: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '5px' : '10px' }};
  border: 0;
  box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(0, 0, 0, 0.12);
  font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
`