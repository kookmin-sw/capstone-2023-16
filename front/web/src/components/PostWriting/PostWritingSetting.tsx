import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import TextButton from "../commons/TextButton";

type PostWritingSettingType = {
  setSubmitFlag: (b:boolean) => void;
}
const PostWritingSetting = ({setSubmitFlag}: PostWritingSettingType) => {
  const deviceType = useDeviceType();

  const onSubmit = () => {
    // rtk에서 현재까지 저장된 newPost 상태를 가져와서 api 요청. 
    // 이후 submitFlag를 0으로 변경하는 코드
  };

  return <PostWritingSettingContainer deviceType={deviceType}>
    <TextButton text='미리보기' deviceType={deviceType}></TextButton>
    <TextButton text='임시저장' deviceType={deviceType}></TextButton>
    <TextButton text='포스팅' deviceType={deviceType} onClick={(e:any)=>setSubmitFlag}></TextButton>
  </PostWritingSettingContainer>
};

export default PostWritingSetting;

const PostWritingSettingContainer = styled.div<{deviceType: string}>`
  width: auto;
  display: flex;
  gap: ${props => props.deviceType === 'mobile' ? '10px': '16px'};
`