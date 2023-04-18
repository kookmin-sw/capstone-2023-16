import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ContentLayout from '../components/commons/ContentLayout';
import PersonaCard from '../components/commons/PersonaCard';
import useDeviceType from '../hooks/useDeviceType';
import { RootState } from '../redux/store';
import editIcon from "../assets/imgs/post.png"
import deleteIcon from "../assets/imgs/trashcan.png"
import post from '../components/PostDetail/dummy/post.json';


const PostDetailPage = () => {
  const deviceType = useDeviceType();
  const persona = useSelector((state: RootState) => state.persona);
  const { postId } = useParams();
  const navigate = useNavigate();

  const onEdit = () => {
    alert('편집모드로 전환합니다.');
    navigate(`/post/edit/${postId}`);
  };

  const onDelete = () => {
    // eslint-disable-next-line no-restricted-globals
    const answer = confirm('정말로 삭제하시겠습니까?');
    alert(answer ? '삭제되었습니다.' : '취소되었습니다.');
  };

  return (<>
    {deviceType === 'desktop'
      && <PersonaCardWrapper deviceType={deviceType} onClick={() => navigate('/personas')}>
        <PersonaCard {...persona} deviceType={deviceType} />
      </PersonaCardWrapper>}
    <ContentLayout>
      <Header deviceType={deviceType}>
          <div>
            <Title deviceType={deviceType}>{post.title}</Title>
            <Date deviceType={deviceType}>{post.createdAt.toString()}</Date>
          </div>
        <ButtonSet deviceType={deviceType}>
          <ImgButton deviceType={deviceType} src={editIcon} onClick={onEdit}></ImgButton>
          <ImgButton deviceType={deviceType} src={deleteIcon} onClick={onDelete}></ImgButton>
          </ButtonSet>
      </Header>
      <Content deviceType={deviceType}>
        <p>{JSON.parse(JSON.stringify(post.content).replace(/\n/gi,"\\r\\n"))}</p>
      </Content>
    </ContentLayout>
    </>)
};

export default PostDetailPage;

interface ImgButtonProps{
  src: string
  deviceType: string
};

const PersonaCardWrapper = styled.section<{ deviceType: string }>`
  width: ${(props) => (props.deviceType === 'mobile') ? '242px' : '369px'};
  margin-left: ${(props) => (props.deviceType === 'desktop') ? '10%' : props.deviceType === 'tablet'? '2.5%' : 'none'};
  margin-bottom: 16px;
  background-color: #fefefe;
  border-radius: ${(props) => { return (props.deviceType === 'mobile') ? '15px' : '30px' }};
  align-self: start;
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: default;
  }
`;

const Header = styled.div<{ deviceType: string }>`
  width: 100%;
  height: auto;
  display: flex;
  padding-bottom: ${(props) => (props.deviceType === 'mobile') ? '10px' : '19px'};
  border-bottom: 1px solid #717171;
  justify-content: space-between;
  align-items: start;
`;

const Title = styled.div<{ deviceType: string }>`
  width: 100%;
  margin-bottom: 3px;
  font-size: ${(props) => (props.deviceType === 'desktop') ? '40px' : props.deviceType === 'tablet' ? '32px' : '16px'};
  font-weight: 700;
  line-height: 130%;
  word-break: break-all;
`;

const Date = styled.div<{ deviceType: string }>`
  font-size: ${(props) => (props.deviceType === 'mobile') ? '8px' : '15px'};
`;

const ButtonSet = styled.div<{ deviceType: string }>`
  width: ${(props) => (props.deviceType === 'desktop') ? '10%' : '20%'};
  display: flex;
  justify-content: end;
`;

const ImgButton = styled.img<ImgButtonProps>`
  width: ${(props) => (props.deviceType === 'desktop') ? '53px' : props.deviceType === 'tablet' ? '40px' : '20px'};
  height: ${(props) => (props.deviceType === 'desktop') ? '53px' : props.deviceType === 'tablet' ? '40px' : '20px'};
  padding: ${(props) => (props.deviceType === 'desktop') ? '10px' : props.deviceType === 'tablet' ? '5px' : '4px'};
  &:hover{
    cursor: pointer;
  }
  &:active{
    cursor: default;
  }
`;

const Content = styled.div<{ deviceType: string }>`
  width: 100%;
  padding: ${(props) => (props.deviceType === 'desktop') ?  '34px 30px 34px' :(props.deviceType === 'tablet')? '34px 13.5px 34px' : '15px 10px 15px'};
  overflow-x: hidden;
  overflow-y: auto;
  & > p{
    font-size: ${(props) => (props.deviceType === 'desktop') ? '24px' : props.deviceType === 'tablet' ? '22px' : '12px'};
    line-height: 150%;
    white-space: pre-wrap;
  }
`