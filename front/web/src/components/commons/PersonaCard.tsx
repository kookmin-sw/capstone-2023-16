import styled from 'styled-components';
import profileImg from "../../assets/imgs/profileImg.png"
import { GrayShadowBox } from './GrayShadowBox';
import WHcal from '../../utils/WHcal';

const PersonaCard = ({src, name,  widthType, usageType}:profile) =>{
    return(
        <BoxDiv widthType={widthType} usageType={usageType}>
            <ImgBox widthType={widthType} usageType={usageType} src={(src===null||src==="")? profileImg: src} alt="Profile Image"/>
            <NameText widthType={widthType} usageType={usageType}>{name}</NameText>
        </BoxDiv>
    )
};

export default PersonaCard;

interface profile {
    src?: string,
    name?: string,
    widthType?: string,
    usageType?: string,
};

const BoxDiv = styled(GrayShadowBox)<profile>`
    width: 100%;
    height: ${(props) => { return (props.usageType === 'choice') ? WHcal(props.widthType!, 110) : WHcal(props.widthType!, 105) }};
    border-radius: ${(props)=>{return WHcal(props.widthType!, 30)}};
`;

const ImgBox = styled.img<profile>`
    width: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 70): WHcal(props.widthType!, 65)}};
    height: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 70): WHcal(props.widthType!, 65)}};
    border-radius: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 41.5): WHcal(props.widthType!, 32.5)}};
    border-width: ${(props)=>{return WHcal(props.widthType!, 1)}};
    margin-right: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 23) : WHcal(props.widthType!, 17)}};
    margin-left: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 27) : WHcal(props.widthType!, 21)}};
    border-color: #c1c1c1;
`;

const NameText = styled.p<profile>`
    font-size: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 28) : WHcal(props.widthType!, 20)}};
    line-height: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 33.89): WHcal(props.widthType!,24.2)}};
    font-weight: 700;
`;
