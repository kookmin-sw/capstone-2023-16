import React from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {LineChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: 'white',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(55, 55, 55, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 11,
  useShadowColorFromDataset: true,
};

const data = {
  labels: ['7', '6', '5', '4', '3', '2', '1', '오늘'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 54],
      color: (opacity = 0) => `rgba(249, 161, 74)`,
      strokeWidth: 3, // optional
    },
    {
      data: [66, 44, 11, 22, 33, 39, 12],
      color: (opacity = 0) => `rgba(250, 105, 136)`,
      strokeWidth: 3, // optional
    },
    {
      data: [66, 44, 11, 22, 33, 44, 44],
      color: (opacity = 0) => `rgba(47, 185, 105)`,
      strokeWidth: 3, // optional
    },
    {
      data: [55, 22, 33, 44, 55, 66, 77],
      color: (opacity = 0) => `rgba(127, 186, 226)`,
      strokeWidth: 3, // optional
    },
  ],
  legend: ['당근', '번개', '중고나라', '평균'], // optional
};

export const CustomLineChart = () => {
  return (
    <ChartContainer>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </ChartContainer>
  );
};
