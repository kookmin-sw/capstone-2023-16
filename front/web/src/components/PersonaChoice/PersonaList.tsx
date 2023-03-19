import styled from "styled-components";
import useDeviceType from "../../hooks/useDeviceType";
import WHcal from "../../utils/WHcal";
import PersonaCard from "../commons/PersonaCard";
import dummy from './dummy/personaList';
import { PersonaListType } from "./dummy/personalListType";

const PersonaList = () => {
  const deviceType = useDeviceType();
  const personaList:PersonaListType = JSON.parse(dummy);

  return <PersonaListWrapper widthType={deviceType}>
    {personaList.map(p => (
      <PersonaCardWrapper widthType={deviceType} key={p.node.id}>
        <PersonaCard src='' name={p.node.nickname} widthType={deviceType} usageType='choice' />
      </PersonaCardWrapper>))}
  </PersonaListWrapper>
};

export default PersonaList;

const PersonaListWrapper = styled.div<{ widthType: string }>`
    height: 100%;
    display: grid;
    margin-top: ${(props) => { return `${WHcal(props.widthType!, 35)}}` }}; 
    padding: ${(props) => { return WHcal(props.widthType!, 20) }} 0 ${(props) => { return WHcal(props.widthType!, 40) }}; 
    row-gap: ${(props) => { return WHcal(props.widthType!, 38) }};
    overflow: auto;
    grid-template-columns: ${(props) => { return props.widthType === 'big' ? `50% 50%` : 'none' }};
    place-items: center;
`;

const PersonaCardWrapper = styled.div < { widthType: string }>`
    width: 90%;
    display: flex;
    margin: 0 auto;
    border-radius: ${(props) => { return WHcal(props.widthType!, 30) }};
    &:hover{
      cursor: pointer;
      transform: scale(0.9);
    }
    &:active{
        cursor: default;
    }
`;