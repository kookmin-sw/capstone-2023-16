import React from 'react';
import styled from "styled-components";
import postImg from "../../assets/imgs/post.png";
import trashcanImg from "../../assets/imgs/trashcan.png";
import { GrayShadowBox } from '../../containers/GrayShadowBox';

// event와 내용들을 바로 넘겨주는 방식도 괜찮고, 아예 id를 넘겨서 여기서 api post detail을 호출해서 해도 괜찮음.
// 전자방식으로 코드 작성함.

interface post {
    title?: string,
    date?: string,
    content?: string,
    hashtag?: string[],
    devicetype?: string,
};

const BoxDiv = styled(GrayShadowBox)<{devicetype?:string}>`
    flex-direction: column;
    width: ${(props) => {return (props.devicetype==='mobile')?'279px': '564px'}};
    border-radius: ${(props) => {return (props.devicetype==='mobile')?'15px': '30px'}};
    padding-top: ${(props) => {return (props.devicetype==='mobile')?'13px': '25px'}};
    height: ${(props) => {return (props.devicetype==='mobile')?'127px': '252px'}};
`;

const Header = styled.div<{devicetype?:string}>`
    width: ${(props) => {return (props.devicetype==='mobile')?'252px': '521px'}};
    padding-left: ${(props) => {return (props.devicetype==='mobile')?'16px': '32px'}};
    display: flex;
    flex-direction: column;
    padding-bottom: ${(props) => {return (props.devicetype==='mobile')?'8px': '17.5px'}};
    border-style: none none solid none;
    border-width: 1px
    border-color: #717171;
    margin-bottom: ${(props) => {return (props.devicetype==='mobile')?'9.3px': '18.5px'}};
`;

const TitleText = styled.p<{devicetype?:string}>`
    font-weight: 700;
    font-size: ${(props) => {return (props.devicetype==='mobile')?'12px': '24px'}};
    line-height: ${(props) => {return (props.devicetype==='mobile')?'14.5px': '29px'}};
    margin-bottom: ${(props) => {return (props.devicetype==='mobile')?'2px': '4px'}};
`;

const DateText = styled.p<{devicetype?:string}>`
    font-size: ${(props) => {return (props.devicetype==='mobile')?'8px': '13px'}};
    line-height: ${(props) => {return (props.devicetype==='mobile')?'9.6px': '18px'}};
`;

const ContentBox = styled.div<{devicetype?:string}>`
    margin-left: ${(props) => {return (props.devicetype==='mobile')?'15px': '32px'}};
    margin-right: ${(props) => {return (props.devicetype==='mobile')?'14px': '28px'}};
    flex-direction: column;
    justify-content: space-between;
    height: ${(props) => {return (props.devicetype==='mobile')?'71px': '141px'}};
`;

const ContentText = styled.p<{devicetype?:string}>`
    font-size: ${(props) => {return (props.devicetype==='mobile')?'10px': '20px'}};
    margin-bottom: ${(props) => {return (props.devicetype==='mobile')?'9px': '18px'}};
    line-height: ${(props) => {return (props.devicetype==='mobile')?'12.1px': '25px'}};
    text-align: justify;
    height: ${(props) => {return (props.devicetype==='mobile')?'35px': '70px'}};
`;

const HashTagText = styled(ContentText)`
    margin-bottom: 0px;
    margin-right: ${(props) => {return (props.devicetype==='mobile')?'4px': '8px'}};
    line-height: auto;
    height:auto;
`;

const BottomBox = styled.div<{devicetype?:string}>`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => {return (props.devicetype==='mobile')?'15px': '30px'}};
    width: ${(props) => {return (props.devicetype==='mobile')?'247px': '493px'}};
`;

const Btn = styled.button<{devicetype?:string}>`
    border-style:none;
    background-color: #ffffff;
    width: ${(props) => {return (props.devicetype==='mobile')?'14.5px': '29px'}};
    height: ${(props) => {return (props.devicetype==='mobile')?'14.5px': '29px'}};
    padding: 0px;
    border-width: 0px;
`;

const FirstButton = styled(Btn)<{devicetype?:string}>`  
    margin-right: ${(props) => {return (props.devicetype==='mobile')?'6.5px': '13px'}};
`;

const BtnImg = styled.img<{devicetype?:string}>`
    width: ${(props) => {return (props.devicetype==='mobile')?'14.5px': '29px'}};
    height: ${(props) => {return (props.devicetype==='mobile')?'14.5px': '29px'}};
`;

const PostCard = ({title, date, content, hashtag, devicetype}:post) => {
    return(
        <BoxDiv devicetype={devicetype}>
            <Header devicetype={devicetype}>
                <TitleText devicetype={devicetype}>{title}</TitleText>
                <DateText devicetype={devicetype}>{date}</DateText>
            </Header>
            <ContentBox devicetype={devicetype}>
                <ContentText devicetype={devicetype}>{content}</ContentText>
                <BottomBox devicetype={devicetype}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            hashtag?.map(tag => <HashTagText devicetype={devicetype}>#{tag}</HashTagText>)
                        }
                    </div>
                    <div>
                        <FirstButton devicetype={devicetype}><BtnImg devicetype={devicetype} src={postImg}/></FirstButton>
                        <Btn devicetype={devicetype}><BtnImg devicetype={devicetype} src={trashcanImg}/></Btn>
                    </div>
                </BottomBox>
            </ContentBox>
        </BoxDiv>
    )
};

export default PostCard;