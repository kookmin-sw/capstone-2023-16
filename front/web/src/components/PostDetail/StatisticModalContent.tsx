import React, { useEffect, useState } from 'react';
import Modal from '../commons/Modal';
import styled from 'styled-components';
import useDeviceType from '../../hooks/useDeviceType';
import DonutChart from '../Charts/DonutChart';
import genderSeries from '../Statistics/dummy/genderSeries';
import Summary from '../Statistics/Summary';
import { toFontSizeOption, toTitleOption } from '../../utils/toStatsInput';
import TreemapChart from '../Charts/TreemapChart';
import categorySeries from '../Statistics/dummy/categorySeries';
import tagSeries from '../Statistics/dummy/tagSeries';
import jobSeries from '../Statistics/dummy/jobSeries';
import BarChart from '../Charts/BarChart(deprecated)';
import StatsApiClient from '../../api/Stats';

type StatisticModalContentProps = {
  postId?: string,
}

const StatisticModalContent = ({postId}:StatisticModalContentProps) => {
  const deviceType = useDeviceType();
  const queryData: any = StatsApiClient.readerAllGet({ opt: { postId } });
  const { categoryScores, genderScores, jobScores, tagScores } = queryData.getPostReaderStatistics;

  //const queryData = useLazyLoadQuery(follwerStatsAllGetQuery, { opt: {personaId} });
  useEffect(() => {
    if (queryData) {
      console.log(categoryScores, genderScores, jobScores, tagScores)
    }
  }, [queryData]);


  return <Container deviceType={deviceType}>
      <Summary />

    <ChartContainer>
      {/* dummy data */}
      <DonutChart
        width={deviceType === 'desktop' ? '50%' : '100%'}
        height={'300px'}
        data={genderSeries}
        options={{labels:['남성', '여성', '알 수 없음'], ...toTitleOption('성별', deviceType), ...toFontSizeOption(deviceType) }} /> 

      {/* real data */}
      {/* <DonutChart
        width={deviceType === 'desktop' ? '50%' : '100%'}
        height={'300px'}
        data={toStatsSingleInput(genderScores)[0]}
        options={{labels: toStatsSingleInput(genderScores)[1],...toTitleOption('성별', deviceType), ...toFontSizeOption(deviceType) }} />  */}

        <TreemapChart height={'100%'} data={categorySeries} options={{...toTitleOption('카테고리',deviceType), ...toFontSizeOption(deviceType)}} />
        <TreemapChart height={'100%'} data={tagSeries} options={{...toTitleOption('태그',deviceType), ...toFontSizeOption(deviceType)}}/>
        <BarChart data={jobSeries} options={{ ...toTitleOption('직업(상위 3개)', deviceType), ...toFontSizeOption(deviceType) }} />
        
        {/* real data */}
        {/* <TreemapChart height={'100%'} data={toStatsPairedInput(categoryScores)} options={{...toTitleOption('카테고리',deviceType), ...toFontSizeOption(deviceType)}} />
        <TreemapChart height={'100%'} data={toStatsPairedInput(tagScores)} options={{...toTitleOption('태그',deviceType), ...toFontSizeOption(deviceType)}}/>
        <BarChart data={toStatsPairedInput(jobScores)} options={{...toTitleOption('직업(상위 3개)',deviceType), ...toFontSizeOption(deviceType)}}/> */}
      </ChartContainer>
  </Container>
};

export default StatisticModalContent;

const Container = styled.div<{ deviceType: string }>`
  width: ${props=>props.deviceType==='desktop'? 'auto': '100%'};
  height: ${props=>props.deviceType==='mobile'?'300px': '700px'};
  display: flex;
  padding: ${props=>props.deviceType==='desktop'?'50px 100px': props.deviceType==='tablet'? '20px 70px': '10px 30px'};
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display: none;
  }
  & > div:nth-child(1){
    align-self: start;
  }
  `;

const ChartContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap:50px;
`