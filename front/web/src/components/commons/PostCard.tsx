import styled from "styled-components";
import postImg from "../../imgs/post.png";
import trashcanImg from "../../imgs/trashcan.png";
import { GrayShadowBox } from '../../containers/GrayShadowBox';
import WHcal from "../../utils/WHcal";

// event와 내용들을 바로 넘겨주는 방식도 괜찮고, 아예 id를 넘겨서 여기서 api post detail을 호출해서 해도 괜찮음.
// 전자방식으로 코드 작성함.

interface post {
    title?: string,
    date?: string,
    content?: string,
    hashtag?: string[],
    widthType?: string,
};

const BoxDiv = styled(GrayShadowBox)<{widthType?:string}>`
    flex-direction: column;
    width: ${(props) => {return WHcal(props.widthType!, 553)}};
    border-radius: ${(props) => {return WHcal(props.widthType!, 30)}};
    padding-top: ${(props) => {return WHcal(props.widthType!, 25)}};
    height: auto;
`;

const Header = styled.div<{widthType?:string}>`
    width: ${(props) => {return WHcal(props.widthType!, 521)}};
    padding-left: ${(props) => {return WHcal(props.widthType!, 32)}};
    display: flex;
    flex-direction: column;
    padding-bottom: ${(props) => {return WHcal(props.widthType!, 18)}};
    border-style: none none solid none;
    border-width: ${(props) => {return WHcal(props.widthType!, 1)}};
    border-color: #717171;
    margin-bottom: ${(props) => {return WHcal(props.widthType!, 18.5)}};
`;

const TitleText = styled.p<{widthType?:string}>`
    font-weight: 700;
    font-size: ${(props) => {return WHcal(props.widthType!, 24)}};
    line-height: ${(props) => {return WHcal(props.widthType!, 29)}};
    margin-bottom: ${(props) => {return WHcal(props.widthType!, 4)}};
`;

const DateText = styled.p<{widthType?:string}>`
    font-size: ${(props) => {return WHcal(props.widthType!, 13)}};
    line-height: ${(props) => {return WHcal(props.widthType!, 18)}};
`;

const ContentBox = styled.div<{widthType?:string}>`
    margin-left: ${(props) => {return WHcal(props.widthType!, 32)}};
    margin-right: ${(props) => {return WHcal(props.widthType!, 28)}};
    flex-direction: column;
    justify-content: space-between;
    height: ${(props) => {return WHcal(props.widthType!, 148)}};
`;

const ContentText = styled.p<{widthType?:string}>`
    font-size: ${(props) => {return WHcal(props.widthType!, 20)}};
    margin-bottom: ${(props) => {return WHcal(props.widthType!, 18)}};
    line-height: ${(props) => {return WHcal(props.widthType!, 25)}};
    text-align: justify;
    height: ${(props) => {return WHcal(props.widthType!, 75)}};
`;

const HashTagText = styled(ContentText)`
    margin-bottom: 0px;
    margin-right: ${(props) => {return WHcal(props.widthType!, 8)}};
    line-height: auto;
    height:auto;
`;

const BottomBox = styled.div<{widthType?:string}>`
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${(props) => {return WHcal(props.widthType!, 30)}};
    width: ${(props) => {return WHcal(props.widthType!, 493)}};
`;

const Btn = styled.button<{widthType?:string}>`
    border-style:none;
    background-color: #ffffff;
    width: ${(props) => {return WHcal(props.widthType!, 29)}};
    height: ${(props) => {return WHcal(props.widthType!, 29)}};
    padding: 0px;
    border-width: 0px;
`;

const FirstButton = styled(Btn)<{widthType?:string}>`
    margin-right: ${(props) => {return WHcal(props.widthType!, 13)}};
`;

const BtnImg = styled.img<{widthType?:string}>`
    width: ${(props) => {return WHcal(props.widthType!, 29)}};
    height: ${(props) => {return WHcal(props.widthType!, 29)}};
`

const PostCard = ({title, date, content, hashtag, widthType}:post) => {
    return(
        <BoxDiv widthType={widthType}>
            <Header widthType={widthType}>
                <TitleText widthType={widthType}>{title}</TitleText>
                <DateText widthType={widthType}>{date}</DateText>
            </Header>
            <ContentBox widthType={widthType}>
                <ContentText widthType={widthType}>{content}</ContentText>
                <BottomBox widthType={widthType}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                            hashtag?.map(tag => <HashTagText widthType={widthType}>#{tag}</HashTagText>)
                        }
                    </div>
                    <div>
                        <FirstButton widthType={widthType}><BtnImg src={postImg}/></FirstButton>
                        <Btn widthType={widthType}><BtnImg src={trashcanImg}/></Btn>
                    </div>
                </BottomBox>
            </ContentBox>
        </BoxDiv>
    )
};

export default PostCard;