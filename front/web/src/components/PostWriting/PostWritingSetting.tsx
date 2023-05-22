import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import TextButton from "../commons/TextButton";

type PostWritingSettingType = {
  setSubmitFlag: (b:boolean) => void;
}
const PostWritingSetting = ({setSubmitFlag}: PostWritingSettingType) => {
  const deviceType = useDeviceType();

  return <PostWritingSettingContainer deviceType={deviceType}>
    {/*<TextButton text='미리보기' deviceType={deviceType}></TextButton>
    <TextButton text='임시저장' deviceType={deviceType}></TextButton>*/}
    <TextButton text='포스팅' deviceType={deviceType} onClick={(e:any)=>setSubmitFlag(true)}></TextButton>
  </PostWritingSettingContainer>
};

export default PostWritingSetting;

const PostWritingSettingContainer = styled.div<{deviceType: string}>`
  width: auto;
  display: flex;
  gap: ${props => props.deviceType === 'mobile' ? '10px': '16px'};
`