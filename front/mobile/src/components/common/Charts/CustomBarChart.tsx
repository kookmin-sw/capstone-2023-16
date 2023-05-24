import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {BarChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';
import {colors} from '../colors';
import {ChartProps} from './type';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(157, 69, 212, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  decimalPlaces: 0,
};

const graphStyle = {
  marginVertical: 8,
};

export const CustomBarChart: FC<ChartProps> = () => {
  const data = {
    labels: ['10대', '20대', '30대', '40대', '50대', '60대 이상'],
    datasets: [
      {
        data: [0, 1, 1, 0, 0, 0],
      },
    ],
  };
  return (
    <ChartContainer>
      <BarChart
        style={graphStyle}
        data={data}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        withHorizontalLabels={false}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </ChartContainer>
  );
};
