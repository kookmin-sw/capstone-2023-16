import styled from 'styled-components';
import profileImg from "../assets/imgs/profileImg.png"
import { GrayShadowBox } from './GrayShadowBox';
import WHcal from '../../utils/WHcal';

interface profile {
    src?: string,
    name?: string,
    id?: string,
    widthType?: string,
    usageType?: string,
};

const BoxDiv = styled(GrayShadowBox)<profile>`
    width: ${(props)=>{ return (props.usageType==='choice')? WHcal(props.widthType!, 525): WHcal(props.widthType!, 369)}};
    height: ${(props)=>{ return (props.usageType==='choice')? WHcal(props.widthType!, 134): WHcal(props.widthType!, 105)}};
    border-radius: ${(props)=>{return WHcal(props.widthType!, 30)}};
`;

const ImgBox = styled.img<profile>`
    width: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 83): WHcal(props.widthType!, 65)}};
    height: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 83): WHcal(props.widthType!, 65)}};
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

const IdText = styled.p<profile>`
    font-size: ${(props)=>{return (props.usageType==='choice')? WHcal(props.widthType!, 16) : WHcal(props.widthType!, 12)}};
    color: #989898;
`;

const DivFlex = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileCard = ({src, name, id, widthType, usageType}:profile) =>{
    return(
        <BoxDiv widthType={widthType} usageType={usageType}>
            <ImgBox widthType={widthType} usageType={usageType} src={(src===null||src==="")? profileImg: src} alt="Profile Image"/>
            <DivFlex>
                <NameText widthType={widthType} usageType={usageType}>{name}</NameText>
                <IdText widthType={widthType} usageType={usageType}>@{id}</IdText>
            </DivFlex>
        </BoxDiv>
    )
};

export default ProfileCard;
