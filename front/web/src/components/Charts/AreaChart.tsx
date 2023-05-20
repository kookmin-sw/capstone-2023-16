import ReactChart from "react-apexcharts";
import styled from 'styled-components';

const AreaChartOptions:any = {
    chart: {
      type: 'area',
      height: 350,
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    fill: {
      opacity: 0.8,
      // type: "gradient",
      // gradient: {
      //   shadeIntensity: 1,
      //   opacityFrom: 0.7,
      //   opacityTo: 0.9,
      //   stops: [0, 90, 100]
      // }
      type: 'pattern',
      pattern: {
        style: ['verticalLines', 'horizontalLines'],
        width: 5,
        height: 6
      },
    },
    markers: {
      size: 5,
      hover: {
        size: 9
      }
    },
    // title: {
    //   text: 'Network Monitoring',
    // },
    tooltip: {
      intersect: true,
      shared: false
    },
    theme: {
      palette: 'palette1', 
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      title: {
        text: '금액(원)'
      }
    },
};

type AreaChartProps = {
  width?: number|string,
  data: any[],
  options?: object,
}
const AreaChart = ({width="100%", data, options}: AreaChartProps) => {
  return <ReactChartContainer width={width}>
    <ReactChart
      options={{...AreaChartOptions, ...options}}
      series={data}
      type="area"
      height={500}/>
  </ReactChartContainer>
}
export default AreaChart;

const ReactChartContainer = styled.div<{width: number|string}>`
  width: ${props => props.width };
`