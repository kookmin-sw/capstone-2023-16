import React from 'react';
import styled from "styled-components";
import postImg from "../../assets/imgs/post.png";
import trashcanImg from "../../assets/imgs/trashcan.png";
import { GrayShadowBox } from './GrayShadowBox';

// event와 내용들을 바로 넘겨주는 방식도 괜찮고, 아예 id를 넘겨서 여기서 api post detail을 호출해서 해도 괜찮음.
// 전자방식으로 코드 작성함.

interface post {
    title: string,
    date: string,
    content: string,
    hashtag?: string[],
    deviceType: string,
};

const BoxDiv = styled(GrayShadowBox) <{ deviceType?: string }>`
    display: flex;
    width: 100%;
    min-width: 195px;
    height: ${(props) => { return (props.deviceType === 'mobile') ? '130px' : '255px' }};
    flex-direction: column;
    border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '15px' : '30px' }};
`;

const HeaderSection = styled.div<{ deviceType?: string }>`
    width: 100%;
    padding: ${(props) => {return (props.deviceType==='mobile')?'8px 16px': '20px 30px 17.5px'}};
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #717171;
`;

const TitleText = styled.p<{ deviceType?: string }>`
    display: block;
    font-weight: 700;
    font-size: ${(props) => {return (props.deviceType==='mobile')?'12px': '24px'}};
    line-height: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    margin-bottom: ${(props) => { return (props.deviceType === 'mobile') ? '2px' : '4px' }};
    overflow: hidden;
    text-overflow:  ellipsis;
    white-space: nowrap;
`;

const DateText = styled.p<{deviceType?:string}>`
    font-size: ${(props) => {return (props.deviceType==='mobile')?'8px': '13px'}};
    line-height: ${(props) => {return (props.deviceType==='mobile')?'9.6px': '18px'}};
`;

const ContentSection = styled.div<{ deviceType?: string }>`
    width: 90%;
    height: ${(props) => {return (props.deviceType==='mobile')?'71px': '141px'}};
    margin-left: ${(props) => {return (props.deviceType==='mobile')?'15px': '32px'}};
    margin-right: ${(props) => {return (props.deviceType==='mobile')?'14px': '28px'}};
    flex-direction: column;
    justify-content: space-between;
`;

const ContentText = styled.p<{ deviceType?: string }>`
    display: -webkit-box;
    width: 100%;
    height: ${(props) => { return (props.deviceType === 'mobile') ? '55px' : '105px' }};
    font-size: ${(props) => {return (props.deviceType==='mobile')?'10px': '20px'}};
    line-height: 150%;
    padding: ${(props) => { return (props.deviceType === 'mobile') ? '9px' : '18px' }} 0;
    overflow: hidden;
    text-overflow:  ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
`;

const HashTagText = styled(ContentText)`
    margin-bottom: 0px;
    margin-right: ${(props) => {return (props.deviceType==='mobile')?'4px': '8px'}};
    line-height: auto;
    height:auto;
`;

const BottomBox = styled.div<{deviceType?:string}>`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: ${(props) => { return (props.deviceType === 'mobile') ? '8px' : '15px' }} 0; 
`;

const Btn = styled.button<{deviceType?:string}>`
    border-style:none;
    background-color: #fefefe;
    width: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    height: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    padding: 0;
    border-width: 0px;
`;

const FirstButton = styled(Btn)<{deviceType?:string}>`  
    margin-right: ${(props) => {return (props.deviceType==='mobile')?'6.5px': '13px'}};
`;

const BtnImg = styled.img<{deviceType?:string}>`
    width: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    height: ${(props) => { return (props.deviceType === 'mobile') ? '14.5px' : '29px' }};
    &:hover{
        cursor: pointer;
    }
    &:active{
        cursor: default;
    }
`;

const PostCard = ({ title, date, content, hashtag, deviceType }: post) => {
    return(
        <BoxDiv deviceType={deviceType}>
            <HeaderSection deviceType={deviceType}>
                <TitleText deviceType={deviceType}>{title}</TitleText>
                <DateText deviceType={deviceType}>{date}</DateText>
            </HeaderSection>
            <ContentSection deviceType={deviceType}>
                <ContentText deviceType={deviceType}>{content}</ContentText>
                <BottomBox deviceType={deviceType}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            hashtag?.map(tag => <HashTagText deviceType={deviceType}>#{tag}</HashTagText>)
                        }
                    </div>
                    <div>
                        <FirstButton deviceType={deviceType}><BtnImg deviceType={deviceType} src={postImg}/></FirstButton>
                        <Btn deviceType={deviceType}><BtnImg deviceType={deviceType} src={trashcanImg}/></Btn>
                    </div>
                </BottomBox>
            </ContentSection>
        </BoxDiv>
    )
};

export default PostCard;