import ReactECharts from "echarts-for-react" // canvas renderer by default

const AreaChartByEcharts = ({ dataaa }) => {
  // Category (dates) & numeric (PnL) arrays
  const xAxisData = dataaa.map((d) => d.date)
  const pnlValues = dataaa.map((d) => d.pnl)

  // Separate into positive-only and negative-only arrays
  const positiveData = pnlValues.map((v) => (v >= 0 ? v : null))
  const negativeData = pnlValues.map((v) => (v < 0 ? v : null))

  const option = {
    backgroundColor: "#ffffff",
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
      formatter: (params) => {
        const p = params.find((p) => p.data !== null) // whichever series has data
        return `${p.axisValue}<br/>PNL: ${p.data} $`
      },
    },
    grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: "value",
      axisLabel: { formatter: "{value} $" },
    },
    series: [
      // 🟢 Profits (>= 0)
      {
        name: "Profit",
        type: "line",
        stack: "Total",
        data: positiveData,
        connectNulls: false, // break line where value is null
        itemStyle: { color: "#4caf50" },
        areaStyle: { color: "rgba(76, 175, 80, 0.3)" }, // translucent green
        emphasis: { focus: "series" },
      },
      // 🔴 Losses (< 0)
      {
        name: "Loss",
        type: "line",
        stack: "Total",
        data: negativeData,
        connectNulls: false,
        itemStyle: { color: "#f44336" },
        areaStyle: { color: "rgba(244, 67, 54, 0.3)" }, // translucent red
        emphasis: { focus: "series" },
      },
    ],
  }

  return (
    <ReactECharts option={option} style={{ height: "400px", width: "100%" }} opts={{ renderer: "canvas" }} />
  )
}

export default AreaChartByEcharts
