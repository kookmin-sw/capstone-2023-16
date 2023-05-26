import ReactChart from "react-apexcharts";
import styled from 'styled-components';

const BarChartOptions: any = {
  chart: {
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true,
      distributed: true,
    }
  },
  legend: {
    show: false,
  },
  theme: {
    palette: 'palette10'
  }  
};

type BarChartProps = {
  width?: number|string,
  data: any[],
  options?: object,
}
const BarChart = ({ width = "100%", data, options}: BarChartProps) => {
  return <ReactChartContainer width={width}>
    <ReactChart
      options={{...BarChartOptions, ...options}}
      series={data}
      type="bar" />
  </ReactChartContainer>
}
export default BarChart;

const ReactChartContainer = styled.div<{ width: number | string }>`
  position: static;
  width: ${props => props.width };
`