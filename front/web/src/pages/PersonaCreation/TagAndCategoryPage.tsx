import React from 'react';
import '../../components/PersonaCreation/style.css';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { useNavigate } from 'react-router-dom';
import BadgeList from '../../components/PersonaCreation/BadgeList';
import SearchField from '../../components/PersonaCreation/SearchField';
import Subtitle from '../../components/PersonaCreation/Subtitle';

const TagAndCategoryPage = () => {
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  
  return <><Container deviceType={deviceType}>
    <Section>
      <Subtitle>선호 태그 설정</Subtitle>
      <SearchField />
      <BadgeList type='tag'/>
    </Section>
    <Section>
      <Subtitle>선호 카테고리 설정</Subtitle>
      <BadgeList type='category'/>
      <CreateButton deviceType={deviceType} onClick={() => navigate('/personas')}>생성</CreateButton>
    </Section>
    </Container>
  </>
};

export default TagAndCategoryPage;

const Container = styled.div<{ deviceType: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => { return props.deviceType === 'desktop' ? 'row' : 'column' }}; 
  gap: ${(props) => { return props.deviceType === 'mobile' ? '0' : '50px' }};
  overflow-y: auto;
  `;

const Section = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 95%;
  padding: 10px;
  justify-content: space-between;
  overflow: hidden;
`

const CreateButton = styled.button<{ deviceType: string }>`
  width: 100%;
  margin: 10px 0;
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