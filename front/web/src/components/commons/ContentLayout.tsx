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
  width:  ${(props) => { return props.deviceType === 'desktop' ? '80%' :  props.deviceType === 'tablet' ? '95%'  : '100%';}};
  height: auto;
  min-width: 250px;
  display: flex;
  padding: ${(props) => { return (props.deviceType==='desktop')? '70px 70px': (props.deviceType==='tablet')? '51px 51px': '20px 20px' }} 0;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => { return props.deviceType === 'mobile' ? '25px 25px' : '35px 35px'; }} 0 0;
  overflow-y: auto;
`;