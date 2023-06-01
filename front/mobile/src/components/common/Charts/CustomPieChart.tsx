import React from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {PieChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';
import {colors} from '../colors';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = [
  {
    name: 'IT',
    total: Math.floor(Math.random() * 10),
    color: colors.purple,
    legendFontColor: colors.graydark2,
    legendFontSize: 15,
  },
  {
    name: '교육·학문',
    total: Math.floor(Math.random() * 10),
    color: colors.pink,
    legendFontColor: colors.graydark2,
    legendFontSize: 15,
  },
  {
    name: '게임',
    total: Math.floor(Math.random() * 10),
    color: colors.purple1,
    legendFontColor: colors.graydark2,
    legendFontSize: 15,
  },
  {
    name: '지식·에세이',
    total: Math.floor(Math.random() * 10),
    color: colors.primary,
    legendFontColor: colors.graydark2,
    legendFontSize: 15,
  },
  {
    name: '생활',
    total: Math.floor(Math.random() * 10),
    color: colors.borderpurple,
    legendFontColor: colors.graydark2,
    legendFontSize: 15,
  },
];

export const CustomPieChart = () => {
  return (
    <ChartContainer>
      <PieChart
        data={data}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        chartConfig={chartConfig}
        accessor={'total'}
        paddingLeft={'0'}
        backgroundColor={'transparent'}
        center={[10, 10]}
        // hasLegend={false}
        absolute
      />
    </ChartContainer>
  );
};
