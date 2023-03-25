import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import { GrayShadowBox } from './GrayShadowBox';

const ContentLayout = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();

  return <LayoutWrapper deviceType={deviceType}>
    {children}
  </LayoutWrapper>
};

export default ContentLayout;

const LayoutWrapper = styled(GrayShadowBox) <{ deviceType: string }>`
  width: 70%;
  min-width: 200px;
  display: flex;
  padding: ${(props) => { return (props.deviceType==='desktop')? '70px 70px': (props.deviceType==='tablet')? '51px 51px': '25px 25px' }} 0;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => { return props.deviceType === 'mobile' ? '25px' : '35px'; }};
  overflow: hidden;
`;