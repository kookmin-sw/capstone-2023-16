import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import WHcal from '../../utils/WHcal';
import { GrayShadowBox } from './GrayShadowBox';

const ContentLayout = ({ children }: PropsWithChildren) => {
  const deviceType = useDeviceType();

  return <LayoutWrapper widthType={deviceType}>
    {children}
  </LayoutWrapper>
};

export default ContentLayout;

const LayoutWrapper = styled(GrayShadowBox) <{ widthType: string }>`
  width: ${(props) => { return props.widthType === "big" ? '65%' : '60%' }};
  display: flex;
  padding: ${(props) => { return WHcal(props.widthType!, 60) }} ${(props) => { return WHcal(props.widthType!, 60) }} 0;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => { return css`${WHcal(props.widthType!, 50)} ${WHcal(props.widthType!, 50)} 0 0 `; }};
  overflow: hidden;
`;