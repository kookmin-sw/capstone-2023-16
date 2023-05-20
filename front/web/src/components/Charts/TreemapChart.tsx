import ReactChart from "react-apexcharts";
import styled from 'styled-components';

const TreemapChartOptions:any = {
  chart: {
    type: 'treemap',
  },
  plotOptions: {
    treemap: {
      distributed: true
    }
  },
  dataLabels: {
    style: {
      fontSize: '20px',
      colors: ['#fff'],
  },
  }, 
  theme: {
    palette: 'palette10'
  }    
};

type TreemapChartProps = {
  width?: number|string,
  height?: number|string,
  data: any[],
  options?: object,
}
const TreemapChart = ({width='100%', height='auto', data, options}: TreemapChartProps) => {
  return <ReactChartContainer width={width}>
    <ReactChart
      options={{ ...TreemapChartOptions, ...options }}
      series={data}
      type="treemap"
      height={height} />
  </ReactChartContainer>
}
export default TreemapChart;

const ReactChartContainer = styled.div<{ width: number | string }>`
  width: ${props => props.width };
`