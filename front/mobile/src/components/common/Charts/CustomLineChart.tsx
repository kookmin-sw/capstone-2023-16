import React, {FC} from 'react';
//@ts-ignore
import styled from 'styled-components/native';
import {LineChart} from 'react-native-chart-kit';
import {DimensionTheme} from '../shared';
import {colors} from '../colors';
import {ChartProps} from './type';

const ChartContainer = styled.View``;

const chartConfig = {
  backgroundGradientFrom: colors.white,
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: colors.white,
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(211, 140, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 11,
  useShadowColorFromDataset: true,
  propsForDots: {
    r: '3',
    strokeWidth: '2',
    stroke: colors.purple,
  },
};

export const CustomLineChart: FC<ChartProps> = props => {
  return (
    <ChartContainer>
      <LineChart
        data={{
          labels: props.label,
          datasets: [
            {
              // data: [
              //   Math.random() * 100,
              //   Math.random() * 100,
              //   Math.random() * 100,
              //   Math.random() * 100,
              //   Math.random() * 100,
              //   Math.random() * 100,
              // ],
              data: props.data,
            },
          ],
        }}
        width={DimensionTheme.width(330)} // from react-native
        height={DimensionTheme.width(170)}
        withHorizontalLabels={false}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
          paddingRight: 20,
        }}
      />
    </ChartContainer>
  );
};
