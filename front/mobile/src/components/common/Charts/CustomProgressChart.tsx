import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {ProgressChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';
import {ChartProps} from './type';
import {colors} from '../colors';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(211, 140, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const CustomProgressChart: FC<ChartProps> = props => {
  console.log('pro : ', props);
  const data = {
    labels: props.label,
    data: props.data,
  };
  return (
    <ChartContainer>
      <ProgressChart
        data={data}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      />
    </ChartContainer>
  );
};
