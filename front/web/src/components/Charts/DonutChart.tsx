import ReactChart from "react-apexcharts";
import styled from 'styled-components';

const DonutChartOptions: any = {
  chart: {
    height: '100%',
  },
  labels: ['남성', '여성', '알 수 없음'],
  legend: {
    show: true,
  },
  plotOptions: {
    pie: {
      customScale: 1,
      donut: {
        size: '40%',
      },
    },
  },
  theme: {
    palette: 'palette10'
  }    
};

type DonutChartProps = {
  width?: number | string,
  height?: number | string,
  data: any[],
  options: object,
}
const DonutChart = ({width='100%', height='auto', data, options}: DonutChartProps) => {
  return <ReactChartContainer width={width}>
    <ReactChart
      options={{...DonutChartOptions, ...options}}
      series={data}
      type="donut"
      height={height}
      />
  </ReactChartContainer>
}
export default DonutChart;

const ReactChartContainer = styled.div<{width: number|string}>`
  width: ${props => props.width };
`