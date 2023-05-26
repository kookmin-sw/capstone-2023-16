import ContentLayout from '../components/commons/ContentLayout';
import styled from 'styled-components';
import useDeviceType from '../hooks/useDeviceType';
import StatisticsGroup from '../components/Statistics/StaticsGroup';
import { useAuth } from '../context/AuthContext';

const StatisticsPage = () => {
  const deviceType = useDeviceType();
  const context = useAuth();
  return <ContentLayout>
    <Header deviceType={deviceType}>통계</Header>
    <StatisticsGroup id={context?.persona?.id!} />
  </ContentLayout>
};

export default StatisticsPage;

const Header = styled.h2<{deviceType:string}>`
  width: 100%;
  height: auto;
  display: flex;
  font-size: ${(props) => (props.deviceType === 'desktop') ? '32px' : (props.deviceType === 'tablet') ? '28px': '16px'};
  font-weight: 700;
`