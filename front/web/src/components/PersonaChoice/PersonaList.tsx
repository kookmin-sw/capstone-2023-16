import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import PersonaCard from "../commons/PersonaCard";
import { connect } from '../../redux/slices/personaSlice';
import { Root } from "./dummy/personalListType";
import PersonaApiClient from "../../api/Persona";
import { useEffect } from "react";

const AVERAGE_LOAD = 5;

const PersonaList = () => {
  const deviceType = useDeviceType();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, hasNext, loadNext, isLoadingNext } = PersonaApiClient.personaListGet();

  // 스크롤 이벤트 핸들러
  // TODO: 최적화
  const handleScroll = () => { 
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

    if (scrollTop + 500 >= scrollHeight - clientHeight) {
      if(!isLoadingNext && hasNext) loadNext(AVERAGE_LOAD);
//      else if (!hasNext) loadNext(data.getOwnPersonas.totalCount % AVERAGE_LOAD);
    }
  }

  useEffect(() => {
      window.addEventListener("scroll", handleScroll, {capture: true});
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
  // 페르소나 클릭 이벤트 핸들러
  const onClick = (n: any) => {
    dispatch(connect(n));
    navigate('/posts');
  };

  return <PersonaListWrapper id='scroll' deviceType={deviceType}>
    {data?.getOwnPersonas?.edges.map((e:Root) => (
      <PersonaCardWrapper deviceType={deviceType} key={e.node.id} onClick={() => onClick(e.node)}>
        <PersonaCard src='' nickname={e.node.nickname} deviceType={deviceType} usageType='choice' />
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