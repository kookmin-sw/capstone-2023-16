import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import dummy from './dummy/dummy.json';
import { useDispatch } from "react-redux";
import { partialChange } from "../../redux/slices/newPostSlice";

type CategorySelectorProps = {
  submitFlag: boolean
}
const CategorySelector = ({ submitFlag }: CategorySelectorProps) => {
  const deviceType = useDeviceType();
  const dispatch = useDispatch();

  const onChange = (e:any) => {
    const { value } = e.currentTarget;
    const selected = { key: "category", value: {id: value} };
    dispatch(partialChange(selected));
  }

  return <CategorySelectorContainer deviceType={deviceType} onChange={onChange}>
    <option key={"default"} value="">카테고리 선택</option>
    {dummy.map((n: any) => <option key={n.node.id} value={n.node.id}>{n.node.body}</option>)}
  </CategorySelectorContainer>
};

export default CategorySelector;

  const CategorySelectorContainer = styled.select<{ deviceType: string }>`
  width: ${(props) => {return (props.deviceType==='mobile')?'122px': '244px'}};
  height: ${(props) => {return (props.deviceType==='mobile')?'23px': '46px'}};
  padding-left: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  padding-right: ${(props) => {return (props.deviceType==='mobile')?'11px': '22px'}};
  border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '5px' : '10px' }};
  border: 0;
  box-shadow: 0px 0.2778vw 2.0833vw 0px rgba(0, 0, 0, 0.12);
  font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
`