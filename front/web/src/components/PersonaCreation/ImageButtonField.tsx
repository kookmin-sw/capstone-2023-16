import React from 'react';
import styled from 'styled-components';

const ProfileImgButton = () => {

  return <ProfileButton>
    <ProfileImg src={require('../../assets/imgs/profileImg.png')} />
  </ProfileButton>
};

const ProfileButton = styled.button`
  padding: 10px;
  background-color: #fff;
  border: 0;
  border-radius: 50%;
`

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

export default ProfileImgButton;