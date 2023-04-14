import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { partialChange } from '../../redux/slices/newPostSlice';

type PostTitleProps = {
  submitFlag: boolean;
}

const PostTitle = ({ submitFlag }: PostTitleProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const deviceType = useDeviceType();
  const dispatch = useDispatch();

  useEffect(() => {
    if (titleRef.current)
    {
      const title = { key: 'title', value: titleRef.current.value.toString() };
      dispatch(partialChange(title));
    }
  }, [submitFlag]);
  
  return <TitleInput deviceType={deviceType} placeholder='제목' ref={titleRef} />
};

const TitleInput = styled.input<{ deviceType: string }>`
  width: 100%;
  margin: ${props => props.deviceType === 'desktop' ? '14px' : props.deviceType === 'tablet' ? '8px' : '5px'} 0;
  padding: ${props => props.deviceType === 'mobile' ? '5px' : '10px'};
  background-color: transparent;
  box-shadow: 0px 0.2778vw 0px 0px rgba(0, 0, 0, 0.12);
  border: 0;
  font-size: ${props => props.deviceType === 'mobile' ? '24px' : '40px'};
  align-self: start;
`;

export default PostTitle;
