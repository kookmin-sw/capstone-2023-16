import React, { useState } from 'react';
import styled from "styled-components";
import postImg from "../../assets/imgs/post.png";
import trashcanImg from "../../assets/imgs/trashcan.png";
import statsImg from "../../assets/imgs/stats.png";
import { GrayShadowBox } from '../commons/GrayShadowBox';
import StatisticModalContent from '../PostDetail/StatisticModalContent';
import Modal from '../commons/Modal';
import { createPortal } from 'react-dom';
import HTMLViewer from '../PostDetail/HTMLViewer';

// event와 내용들을 바로 넘겨주는 방식도 괜찮고, 아예 id를 넘겨서 여기서 api post detail을 호출해서 해도 괜찮음.
// 전자방식으로 코드 작성함.

interface post {
    id: string,
    title: string,
    date: string,
    content: string,
    hashtag?: string[],
    deviceType: string,
};

const PostCard = ({ id, title, date, content, hashtag, deviceType }: post) => {
    const [modal, setModal] = useState<boolean>(false);

    const onShow = (e: any) => {
        e.stopPropagation();
        setModal(true);
    };

    const onEdit = (e: any) => {
        e.stopPropagation();
        // TODO: 텍스트 에디터로 전환
        alert('편집모드로 전환합니다.');
    };

    const onDelete = (e: any) => {
        e.stopPropagation();
        // TODO: 삭제 api 호출
        // eslint-disable-next-line no-restricted-globals
        const answer = confirm('정말로 삭제하시겠습니까?');
        alert(answer ? '삭제되었습니다.' : '취소되었습니다.');
    };

    return(<>
        <BoxDiv deviceType={deviceType}>
            <HeaderSection deviceType={deviceType}>
                <TitleText deviceType={deviceType}>{title}</TitleText>
                <DateText deviceType={deviceType}>{date}</DateText>
            </HeaderSection>
            <ContentSection deviceType={deviceType}>
                <ContentText deviceType={deviceType}>  <HTMLViewer text={content} /></ContentText>
                <BottomBox deviceType={deviceType}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            hashtag?.map(tag => <HashTagText deviceType={deviceType}>#{tag}</HashTagText>)
                        }
                    </div>
                    <div>
                        <Btn deviceType={deviceType} onClick={onShow}><BtnImg deviceType={deviceType} src={statsImg}/></Btn>
                        <Btn deviceType={deviceType} onClick={onEdit}><BtnImg deviceType={deviceType} src={postImg}/></Btn>
                        <Btn deviceType={deviceType} onClick={onDelete}><BtnImg deviceType={deviceType} src={trashcanImg} /></Btn>
                    </div>
                </BottomBox>
            </ContentSection>
        </BoxDiv>
        {modal && createPortal(<Modal modal={modal} setModal={setModal}>
            <StatisticModalContent postId={id} />
        </Modal>,document.querySelector('#content__box') as Element)}
        </>
    )
};

export default PostCard;

const BoxDiv = styled(GrayShadowBox) <{ deviceType?: string, onClick?: any }>`
    display: flex;
    width: 100%;
    height: 100%;
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

const BottomBox = styled.div<{ deviceType?: string }>`
    width: 100%;
    height: auto;
    display: flex;
    padding: ${(props) => { return (props.deviceType === 'mobile') ? '8px' : '15px' }} 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Btn = styled.button<{deviceType?:string}>`
    width: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    height: ${(props) => { return (props.deviceType === 'mobile') ? '14.5px' : '29px' }};
    margin: 0 ${(props) => {return (props.deviceType==='mobile')?'3px': '6.5px'}};
    border-style:none;    
    background-color: #fefefe;
    padding: 0;
    border-width: 0px;
`;

const BtnImg = styled.img<{deviceType?:string}>`
    width: ${(props) => {return (props.deviceType==='mobile')?'14.5px': '29px'}};
    height: ${(props) => { return (props.deviceType === 'mobile') ? '14.5px' : '29px' }};
    padding: ${(props) => { return (props.deviceType === 'mobile') ? '2px' : '5px' }};
    box-sizing: content-box;
    &:hover{
        cursor: pointer;
        zoom: 1.1;
    }
    &:active{
        cursor: default;
    }
`;
