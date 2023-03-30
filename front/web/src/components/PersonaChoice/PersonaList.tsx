import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import PersonaCard from "../commons/PersonaCard";
import dummy from './dummy/personaList';
import { PersonaListType } from "./dummy/personalListType";
import { connect } from '../../redux/slices/personaSlice';

const PersonaList = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const personaList: PersonaListType = JSON.parse(dummy);

  // 페르소나 클릭 이벤트 핸들러
  const onClick = (n: any) => {
    dispatch(connect(n));
    navigate('/posts');
  };

  return <PersonaListWrapper deviceType={deviceType}>
    {personaList.map(p => (
      <PersonaCardWrapper deviceType={deviceType} key={p.node.id} onClick={() => onClick(p.node)}>
        <PersonaCard src='' nickname={p.node.nickname} deviceType={deviceType} usageType='choice' />
      </PersonaCardWrapper>))}
  </PersonaListWrapper>
};

export default PersonaList;

const PersonaListWrapper = styled.div<{ deviceType: string }>`
    width: 100%;
    height: 90%;
    display: grid;
    margin-top: ${(props) => props.deviceType === 'mobile'? '7px': '23px'}; 
    padding: 20px 0 40px; 
    row-gap: ${(props) => { return props.deviceType==='mobile'? '25px': '38px' }};
    overflow-y: auto;
    grid-template-columns: ${(props) => { return props.deviceType === 'desktop' ? `50% 50%` : 'none' }};
    place-items: center;
`;

const PersonaCardWrapper = styled.div < { deviceType: string }>`
    width: 90%;
    display: flex;
    margin: 0 auto;
    border-radius: ${(props) => { return props.deviceType === 'mobile' ? '15px' : '30px'; }};
    &:hover{
      cursor: pointer;
      transform: scale(0.9);
    }
    &:active{
        cursor: default;
    }
`;