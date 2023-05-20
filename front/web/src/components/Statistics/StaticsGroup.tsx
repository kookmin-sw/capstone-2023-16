import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import genderSeries from './dummy/genderSeries';
import DonutChart from '../Charts/DonutChart';
import BarChart from '../Charts/BarChart(deprecated)';
import categorySeries from './dummy/categorySeries';
import TreemapChart from '../Charts/TreemapChart';
import tagSeries from './dummy/tagSeries';
import jobSeries from './dummy/jobSeries';
import Summary from './Summary';
import useDeviceType from '../../hooks/useDeviceType';
import StatsApiClient from '../../api/Stats';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const titleOption = (text: string, deviceType: string) => ({
  title: { text, style: { fontSize: deviceType === 'mobile' ? '12px' : '20px' } }
});
const fontSizeOption = (deviceType: string) => ({
  dataLabels: {
    style: {
      fontSize: deviceType === 'mobile' ? '10px' : '20px',
      colors: ['#fff'],
    }
  }
});

const StatisticsGroup = () => {
  const deviceType = useDeviceType();
  const personaId: string = useSelector((state: RootState) => state.persona.id);
  const queryData: any = StatsApiClient.follwerAllGet({ opt: { personaId } });
  const { categoryScores, genderScores, jobScores, tagScores } = queryData.getPersonaFollowersStatistics;

  //const queryData = useLazyLoadQuery(follwerStatsAllGetQuery, { opt: {personaId} });
  useEffect(() => {
    if (queryData) {
      console.log(categoryScores, genderScores, jobScores)
    }
  }, [queryData]);

  return queryData?<Container deviceType={deviceType}>
    <Row deviceType={deviceType} style={{flex: 1}}>
      <Summary />

      {/* dummy data */}
      <DonutChart
        width={deviceType === 'desktop' ? '50%' : '100%'}
        height={deviceType === 'desktop' ? '100%' : '300px'}
        data={genderSeries}
        options={{labels:['남성', '여성', '알 수 없음'], ...titleOption('성별', deviceType), ...fontSizeOption(deviceType) }} /> 
      
      {/* real data */}
      {/* <DonutChart
        width={deviceType === 'desktop' ? '50%' : '100%'}
        height={deviceType === 'desktop' ? '100%' : '300px'}
        data={toStatsSingleInput(genderScores)[0]}
        options={{labels: toStatsSingleInput(genderScores)[1],...titleOption('성별', deviceType), ...fontSizeOption(deviceType) }} />  */}
    </Row>
    <Row deviceType={deviceType} style={{ flex: 1.5 }}>
      {/* dummy data */}
      <TreemapChart height={'100%'} data={categorySeries} options={{...titleOption('카테고리',deviceType), ...fontSizeOption(deviceType)}} />
      <TreemapChart height={'100%'} data={tagSeries} options={{...titleOption('태그',deviceType), ...fontSizeOption(deviceType)}}/>
      <BarChart data={jobSeries} options={{ ...titleOption('직업(상위 3개)', deviceType), ...fontSizeOption(deviceType) }} />
      
      {/* real data */}
      {/* <TreemapChart height={'100%'} data={toStatsPairedInput(categoryScores)} options={{...titleOption('카테고리',deviceType), ...fontSizeOption(deviceType)}} />
      <TreemapChart height={'100%'} data={toStatsPairedInput(tagScores)} options={{...titleOption('태그',deviceType), ...fontSizeOption(deviceType)}}/>
      <BarChart data={toStatsPairedInput(jobScores)} options={{...titleOption('직업(상위 3개)',deviceType), ...fontSizeOption(deviceType)}}/> */}
    </Row> 
  </Container>:<></>
};

export default StatisticsGroup;

const Container = styled.div<{deviceType: string}>`
  width: 100%;
  height: 90%;
  display: flex;
  margin: ${props=>props.deviceType==='desktop'?'30px': '10px'} 0; 
  flex-direction: column;
  gap: ${props => props.deviceType === 'desktop' ? '30px' : '10px'};
  overflow-y: auto;
`;

const Row = styled.div<{deviceType: string}>`
  width: 100%;
  display: flex;
  
  ${props => props.deviceType === 'desktop' ?
    css`
      justify-content: space-around;
      column-gap: 30px;
      margin: 10px 0;
    `
  : css`
      flex-direction: column;
    `};

  
`;