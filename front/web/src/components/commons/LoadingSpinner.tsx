import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return <Spinner />
};

export default LoadingSpinner;


const bounce = keyframes`
    0% , 100%{ font-size: 0.75px }
    50% { font-size: 1.5px }
`

const blast = keyframes`
  0% , 40% {
    font-size: 0.5px;
  }
  70% {
    opacity: 1;
    font-size: 4px;
  }
  100% {
    font-size: 6px;
    opacity: 0;
  }
  
`

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  &::before , &::after{
    content: '';
    position: absolute;
    left: 50%;
    top: 60%;
    transform: translate(-50% , -50%);
    width: 48em;
    height: 48em;
    background-image:
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0),
      radial-gradient(circle 10px, rgb(211, 140, 255) 100%, transparent 0);
    background-position: 0em -18em, 0em 18em, 18em 0em, -18em 0em,
                        13em -13em, -13em -13em, 13em 13em, -13em 13em;
      background-repeat: no-repeat;
    font-size: 0.5px;
    border-radius: 50%;
    animation: ${blast} 1s ease-in infinite;
  }

  &::after {
    font-size: 1px;
    background: rgb(211, 140, 255);
    animation: ${bounce} 1s ease-in infinite;
  }`
