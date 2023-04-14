import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import TextButton from "../commons/TextButton";

type ButtonGroupType = {
  setSubmitFlag: (b:boolean) => void;
}
const ButtonGroup = ({setSubmitFlag}: ButtonGroupType) => {
  const deviceType = useDeviceType();

  const onSubmit = () => {
    // rtk에서 현재까지 저장된 newPost 상태를 가져와서 api 요청. 
    // 이후 submitFlag를 0으로 변경하는 코드
  };

  return <ButtonGroupContainer deviceType={deviceType}>
    <TextButton text='미리보기' deviceType={deviceType}></TextButton>
    <TextButton text='임시저장' deviceType={deviceType}></TextButton>
    <TextButton text='포스팅' deviceType={deviceType} onClick={(e:any)=>setSubmitFlag}></TextButton>
  </ButtonGroupContainer>
};

export default ButtonGroup;

const ButtonGroupContainer = styled.div<{deviceType: string}>`
  width: auto;
  display: flex;
  gap: ${props => props.deviceType === 'mobile' ? '10px': '16px'};
`