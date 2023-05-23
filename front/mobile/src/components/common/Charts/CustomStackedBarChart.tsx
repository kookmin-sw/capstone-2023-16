import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {StackedBarChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';
import {colors} from '../colors';
import {ChartProps} from './type';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const graphStyle = {
  marginVertical: 8,
};

export const CustomStackedBarChart: FC<ChartProps> = () => {
  const data = {
    labels: ['나이', '성별', '직업'],
    legend: [
      ['L1 ', 'L2', 'L3'],
      ['L4 ', 'L2', 'L3'],
      ['L5 ', 'L2', 'L3'],
    ],
    data: [
      [60, 60, 60],
      [30, 30, 60],
      [30, 30, 60],
    ],
    barColors: [colors.purple, colors.primary, colors.pink],
  };
  return (
    <ChartContainer>
      <StackedBarChart
        style={graphStyle}
        data={data}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        chartConfig={chartConfig}
      />
    </ChartContainer>
  );
};
