import styled from 'styled-components';
import profileImg from "../../assets/imgs/profileImg.png"
import { GrayShadowBox } from '../../containers/GrayShadowBox';

interface profile {
    src?: string,
    name?: string,
    id?: string,
    devicetype?: string,
    usagetype?: string,
};

const BoxDiv = styled(GrayShadowBox)<profile>`
    width: ${(props)=>{ return (
        (props.usagetype==='choice')? 
            (props.devicetype === 'mobile')? '285px':
                '525px':
            (props.devicetype === 'mobile')? '242px':
                '369px'
        )}};
    height: ${(props)=>{ return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '73px':
                '134px':
            (props.devicetype==='mobile')? '69px':
                '105px'
        )}};
    border-radius: ${(props)=>{return (props.devicetype==='mobile')? '15px': '30px'}};
`;

const ImgBox = styled.img<profile>`
    width: ${(props)=>{return (
        (props.usagetype==='choice')?
            (props.devicetype==='mobile')?'45px':
                '83px':
            (props.devicetype==='mobile')?'43px':
                '65px'
        )}};
    height: ${(props)=>{return (
        (props.usagetype==='choice')?
            (props.devicetype==='mobile')?'45px':
                '83px':
            (props.devicetype==='mobile')?'43px':
                '65px'
        )}};
    border-radius: 45px;
    border-width: 1px;
    margin-right: ${(props)=>{return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '15px':
                '27px':
            (props.devicetype==='mobile')? '14px':
                '21px'
        )}};
    margin-left: ${(props)=>{return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '13px':
                '23px':
            (props.devicetype==='mobile')? '11px':
                '18px'
        )}};
    border-color: #c1c1c1;
`;

const NameText = styled.p<profile>`
    font-size: ${(props)=>{return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '16px':
                '28px':
            (props.devicetype==='mobile')? '14px':
                '20px'
        )}};
    margin-bottom: ${(props)=>{return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '1px':
                '4px':
            (props.devicetype==='mobile')? '1px':
                '2px'
        )}};
    font-weight: 700;
`;

const IdText = styled.p<profile>`
    font-size: ${(props)=>{return (
        (props.usagetype==='choice')? 
            (props.devicetype==='mobile')? '9px':
                '16px':
            (props.devicetype==='mobile')? '8px':
                '12px'
        )}};
    color: #989898;
`;

const DivFlex = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProfileCard = ({src, name, id, devicetype, usagetype}:profile) =>{
    return(
        <BoxDiv devicetype={devicetype} usagetype={usagetype}>
            <ImgBox devicetype={devicetype} usagetype={usagetype} src={(src===null||src==="")? profileImg: src} alt="Profile Image"/>
            <DivFlex>
                <NameText devicetype={devicetype} usagetype={usagetype}>{name}</NameText>
                <IdText devicetype={devicetype} usagetype={usagetype}>@{id}</IdText>
            </DivFlex>
        </BoxDiv>
    )
};

export default ProfileCard;
