import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import TextButton from "../commons/TextButton";

const MyPostsSetting = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();

  return <MyPostsSettingContainer deviceType={deviceType}>
    <TextButton text='수익' deviceType={deviceType}></TextButton>
    <TextButton text='통계' deviceType={deviceType}></TextButton>
    <TextButton text='생성' deviceType={deviceType} onClick={()=>navigate('/post/edit')}></TextButton>
  </MyPostsSettingContainer>
};

export default MyPostsSetting;

const MyPostsSettingContainer = styled.div<{ deviceType: string }>`
  width: auto;
  display: flex;
  padding: 7px;
  gap: ${props => props.deviceType === 'mobile' ? '10px' : '16px'};
  `;