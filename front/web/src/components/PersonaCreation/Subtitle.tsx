import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';

const Subtitle = ({children}: PropsWithChildren) => {
  const deviceType = useDeviceType();

  return <SubtitleDiv deviceType={deviceType}>{children}</SubtitleDiv>;
};

export default Subtitle;

const SubtitleDiv = styled.div<{ deviceType: string }>`
  margin: 20px 0;
  font-size: ${props => props.deviceType === 'mobile' ? '18px' : '24px'};
  font-weight: 700;
`