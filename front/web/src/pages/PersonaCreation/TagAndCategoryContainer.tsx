import React from 'react';
import '../../components/PersonaCreation/style.css';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { useNavigate } from 'react-router-dom';
import TagList from '../../components/PersonaCreation/TagList';

const TagAndCategoryContainer = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  

  return <Container deviceType={deviceType}><></>
      <TagList />
    {/*<CreateButton deviceType={deviceType} onClick={()=>navigate('/personas')}>생성</CreateButton>*/}
    </Container>
};

export default TagAndCategoryContainer;

const Container = styled.div<{ deviceType: string }>`
  display: flex;
  flex-direction: ${(props) => { return props.deviceType === 'desktop'? 'row': 'column' }}; 
`;

const CreateButton = styled.button<{ deviceType: string }>`
  flex: 1;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 15px;
  background: #FFFFFF;  
  box-shadow: 0px 1px 10px 2px rgba(211, 140, 255, 0.5);
  font-size: ${(props) => { return props.deviceType === 'mobile'? '14px': '24px' }}; 
  font-weight: 700;
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
    background-color: lightgray;
  }
`