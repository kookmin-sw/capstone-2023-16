import React from 'react';
import styled from 'styled-components';

const ProfileImgButton = () => {

  return <ProfileButton>
    <ProfileImg src={require('../../assets/imgs/profileImg.png')} />
  </ProfileButton>
};

const ProfileButton = styled.button`
  width: 200px;
  height: 200px;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
`

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export default ProfileImgButton;