import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import TextButton from "../commons/TextButton";

type PostWritingSettingType = {
  onSubmit: () => void;
}
const PostWritingSetting = ({onSubmit}: PostWritingSettingType) => {
  const deviceType = useDeviceType();

  return <PostWritingSettingContainer deviceType={deviceType}>
    {/*<TextButton text='미리보기' deviceType={deviceType}></TextButton>
    <TextButton text='임시저장' deviceType={deviceType}></TextButton>*/}
    <TextButton text='포스팅' deviceType={deviceType} onClick={(e: any) => { onSubmit(); }}></TextButton>
  </PostWritingSettingContainer>
};

export default PostWritingSetting;

const PostWritingSettingContainer = styled.div<{deviceType: string}>`
  width: auto;
  display: flex;
  gap: ${props => props.deviceType === 'mobile' ? '10px': '16px'};
`