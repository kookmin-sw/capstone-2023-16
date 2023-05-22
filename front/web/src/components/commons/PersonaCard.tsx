
import React from 'react';
import styled from 'styled-components';
import profileImg from "../../assets/imgs/profileImg.png"
import { GrayShadowBox } from './GrayShadowBox';

interface profile {
    src?: string,
    nickname?: string,
    deviceType?: string,
    usageType?: string,
};

const PersonaCard = ({ src, nickname, deviceType, usageType }: profile) => {
    return(
        <BoxDiv deviceType={deviceType} usageType={usageType}>
            <ImgBox deviceType={deviceType} usageType={usageType} src={(src===null||src==="")? profileImg: src} alt="Profile Image"/>
            <NicknameText deviceType={deviceType} usageType={usageType}>{nickname}</NicknameText>
        </BoxDiv>
    )
};

export default PersonaCard;

const BoxDiv = styled(GrayShadowBox)<profile>`
    width: 100%;
    height: ${(props)=>{ return (
        (props.usageType==='choice')? 
            (props.deviceType==='mobile')? '60px':
                '125px':
            (props.deviceType==='mobile')? '69px':
                '105px'
        )}};
    border-radius: ${(props)=>{return (props.deviceType==='mobile')? '15px': '30px'}};
`;

const ImgBox = styled.img<profile>`
    width: ${(props)=>{return (
        (props.usageType==='choice')?
            (props.deviceType==='mobile')?'45px':
                '83px':
            (props.deviceType==='mobile')?'43px':
                '65px'
        )}};
    height: ${(props)=>{return (
        (props.usageType==='choice')?
            (props.deviceType==='mobile')?'45px':
                '83px':
            (props.deviceType==='mobile')?'43px':
                '65px'
        )}};
    border-radius: 45px;
    border-width: 1px;
    margin-right: ${(props)=>{return (
        (props.usageType==='choice')? 
            (props.deviceType==='mobile')? '15px':
                '27px':
            (props.deviceType==='mobile')? '14px':
                '21px'
        )}};
    margin-left: ${(props)=>{return (
        (props.usageType==='choice')? 
            (props.deviceType==='mobile')? '13px':
                '23px':
            (props.deviceType==='mobile')? '11px':
                '18px'
        )}};
    border-color: #c1c1c1;
`;

const NicknameText = styled.p<profile>`
    font-size: ${(props)=>{return (
        (props.usageType==='choice')? 
            (props.deviceType==='mobile')? '16px':
                '28px':
            (props.deviceType==='mobile')? '14px':
                '20px'
        )}};
    margin-bottom: ${(props)=>{return (
        (props.usageType==='choice')? 
            (props.deviceType==='mobile')? '1px':
                '4px':
            (props.deviceType==='mobile')? '1px':
                '2px'
        )}};
    font-weight: 700;

`;
