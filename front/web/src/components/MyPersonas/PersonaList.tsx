import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import PersonaCard from "../commons/PersonaCard";
import { Root } from "./dummy/personalListType";
import PersonaApiClient from "../../api/Persona";
import { useEffect } from "react";
//import useThrottle from "../../hooks/useThrottle";
import { ReactComponent as DeleteIcon } from '../../assets/icons/x.svg';
import EmptyMessage from "../commons/EmptyMessage";
import { useAuth } from "../../context/AuthContext";
import { throttle } from "../../utils/performUtils";

type PersonaListType = {
  mode: string,
};

const AVERAGE_LOAD = 10;

const PersonaList = ({mode}: PersonaListType) => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const context = useAuth();
  
  const { data, hasNext, loadNext, isLoadingNext } = PersonaApiClient.personaListGet();

  // 스크롤 이벤트 핸들러
  const handleScroll = (e:any) => {
    throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (scrollTop+10 >= scrollHeight - clientHeight) {
        console.log('실행!')
        if (hasNext&&!isLoadingNext) {
          console.log('handleScroll')
          loadNext(AVERAGE_LOAD);
        }
      }
    })
  };
  
  // 페르소나 클릭 이벤트 핸들러
  const onClick = (n: any) => {
    if (mode === "default") {
      context.connect(n.id, n.nickname);
      navigate('/post');
    } else {
      const answer = window.confirm('정말 삭제하시겠습니까?');
      answer && alert("삭제되었습니다.");
    }
  };

  return data.getOwnPersonas.edges[0] ? <PersonaListWrapper id='scroll' deviceType={deviceType} onScroll={handleScroll}>
    {data.getOwnPersonas.edges.map((e:Root) => (
      <PersonaCardWrapper deviceType={deviceType} key={e.node.id} onClick={() => onClick(e.node)}>
        <PersonaCard src='' nickname={e.node.nickname} deviceType={deviceType} usageType='choice' />
        {mode==="setting"&&<DeleteButton devicetype={deviceType}/>}
      </PersonaCardWrapper>))}
  </PersonaListWrapper>:<EmptyMessage type='persona'/>
};

export default PersonaList;

const PersonaListWrapper = styled.div<{ deviceType: string }>`
    width: 100%;
    height: 90%;
    display: ${(props) => props.deviceType === 'desktop'? 'grid': 'block'};
    margin-top: ${(props) => props.deviceType === 'mobile'? '7px': '23px'}; 
    padding: 20px 0 40px; 
    row-gap: ${(props) => { return props.deviceType==='mobile'? '25px': '38px' }};
    overflow-y: auto;
    scroll-behavior: smooth;
    grid-template-columns: ${(props) => { return props.deviceType === 'desktop' ? `50% 50%` : 'none' }};
    place-items: start center;
`;

const PersonaCardWrapper = styled.div < { deviceType: string }>`
  position: relative;
    width: 90%;
    display: flex;
    margin:  ${(props) => props.deviceType === 'desktop'? '0': props.deviceType==='tablet'? '20px': '10px'} auto;
    border-radius: ${(props) => { return props.deviceType === 'mobile' ? '15px' : '30px'; }};
    &:hover{  
      cursor: pointer;
      transform: scale(0.9);
    }
    &:active{
        cursor: default;
    }
`;

const DeleteButton = styled(DeleteIcon) < { devicetype: string }>`
    width: ${(props) => { return props.devicetype === 'mobile' ? '20px' : '50px'; }};
    position: absolute;
    top: ${(props) => { return props.devicetype === 'mobile' ? '13px' : '50px'; }};
    right:  ${(props) => { return props.devicetype === 'mobile' ? '20px' : '40px'; }};
    z-index: 1;
`