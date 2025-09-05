import ReactECharts from "echarts-for-react" // canvas renderer by default

const BarChartByEcharts = ({ dataaa }) => {
  // X- & Y-axis data
  const xAxisData = dataaa.map((item) => item.date)
  const yAxisData = dataaa.map((item) => item.pnl)

  const option = {
    backgroundColor: "#ffffff",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = params[0] // only one series
        return `${p.axisValue}<br/>PNL: ${p.data} $`
      },
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisTick: { alignWithLabel: true },
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: "{value} $" },
    },
    series: [
      {
        name: "PNL",
        type: "bar",
        data: yAxisData,
        barWidth: "60%",
        itemStyle: {
          color: (params) => (params.value >= 0 ? "#4caf50" : "#f44336"), // green vs red
        },
      },
    ],
  }

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} opts={{ renderer: "canvas" }} />
  )
}

export default BarChartByEcharts
