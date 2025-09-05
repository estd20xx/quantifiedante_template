import { Card, CardBody, Tooltip } from "@heroui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader"

import { useDateAccount } from "../../context/DateAccountContextProvider.tsx"
import { useMembership } from "../../hooks/useMembership.tsx"
import { QuestionIcon } from "../../icons/icons.tsx"
import axios from "../../lib/axios.ts"
import { navigationStrings } from "../../navigationStrings/NavigationStrings.ts"

const DashBoard = () => {
  const navigate = useNavigate()
  const [setupLoader, setSetupLoader] = useState(true)

  const [counts, setCounts] = useState({ users: 113, products: 17, subscriptions: 200, orders: 82 })

  const getCounts = async () => {
    try {
      const response = await axios.get("admin-panel/counts")
      setCounts(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }






  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    const checkProgress = async () => {
      try {
        if (!apiAccessToken) {
          return
        }
        const response = await axios.post(`get_success_step_of_user/`, {
          user_id: userId,
        })

        if (response.data) {
          console.log(response.data?.success_step)
          if (response.data?.Subscription_Product_name !== null) {
            // alert(response.data?.Subscription_Product_name)
            if (response.data?.success_step < 5) {
              // alert("You have not completed the setup process.")
              navigate(navigationStrings.initialSetup)
            }
          }
        }
      } catch {
        console.log("Error occur")
      }
    }
    // const timer = setTimeout(checkProgress, 1000)

    // return () => clearTimeout(timer)
  }, [navigate])

  const { GlobalDateAccount, brokerSelect, accountSelect, selectedDates, apiAccessToken } = useDateAccount()
  const [data, setData] = useState([])
  const [accountBlanaceHisData, setAccountBalanceHisData] = useState([])
  const [profitlosshistory, setProfitLossHistory] = useState([])
  const [grossPnL, setGrossPnL] = useState(0)
  const [winTradesPer, setWinTradesPer] = useState(0)
  const [profitFactor, setProfitFactor] = useState(0)
  const [loading, setLoading] = useState(false)
  const [todayPnLChart, setTodayPnLChart] = useState([])

  const [allTradesTaken, setallTradesTaken] = useState(0)
  const [winningTradesProfit, setwinningTradesProfit] = useState(0)
  const [losingTradesLoss, setlosingTradesLoss] = useState(0)

  const [currentBalance, setcurrentBalance] = useState(0)
  const [todayPnL, settodayPnL] = useState(0)
  const [weeklyPnL, setweeklyPnL] = useState(0)

  const [avgWinLoss, setAvgWinLoss] = useState(0)
  const [dayWin, setDayWin] = useState(0)
  const [AreaChartPnLData, setAreaChartPnLData] = useState([])

  function buildDailyPnL(trades) {
    const byDay = {}

    trades.forEach(({ buyPrice, sellPrice, soldTimestamp }) => {
      // 1️⃣  Profit on this trade
      const pnl = parseFloat(sellPrice) - parseFloat(buyPrice)

      // 2️⃣  Extract trade-closing date in ISO-8601 (YYYY-MM-DD) so ECharts sorts naturally
      const [mm, dd, yyyy] = soldTimestamp.split(" ")[0].split("/") // "05/29/2025"
      const isoDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`

      // 3️⃣  Add to that day’s running total
      byDay[isoDate] = (byDay[isoDate] ?? 0) + pnl
    })

    // 4️⃣  Return in chronological order, rounded to 2 dp if you like
    return Object.entries(byDay)
      .sort(([d1], [d2]) => new Date(d1) - new Date(d2))
      .map(([date, pnl]) => ({ date, pnl: +pnl.toFixed(2) }))
  }

  useEffect(() => {
    // const pnlData = buildDailyPnL(data)

    // setAreaChartPnLData(pnlData)
  }, [data])

  useEffect(() => {
    const fetchData = async () => {
      if (
        !accountSelect?.account_name ||
        !brokerSelect?.unique_id ||
        !apiAccessToken ||
        !selectedDates?.start ||
        !selectedDates?.end
      )
        return
      const payload = {
        user_id: localStorage.getItem("user_id"),
        start_date: selectedDates.start,
        end_date: selectedDates.end,
        account: accountSelect.account_name,
        unique_id: brokerSelect.unique_id,
      }

      try {
        const response = await axios.get(`dashboard-stats`, {
          params: payload,
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        })

        if (response.data.data && response.data.data.length > 0) {
          setData(response?.data?.data[0]["extra"]["trade_log"] || [])
          setGrossPnL(response?.data?.gross_pnl || 0)
          setWinTradesPer(response?.data?.trade_win_percentage || 0)
          setProfitFactor(response?.data?.profit_factor || 0)
          setAvgWinLoss(response?.data?.avg_win_loss_trade || 0)
          setDayWin(response?.data?.day_win || 0)

          setallTradesTaken(response?.data?.data[0]["extra"]["all_trade_stats"][1].value || 0)
          setwinningTradesProfit(response?.data?.data[0]["extra"]["profit_trade_stats"][1].value || 0)
          setlosingTradesLoss(response?.data?.data[0]["extra"]["loss_trade_stats"][1].value || 0)
        } else {
          setData([])
          setGrossPnL(0)
          setWinTradesPer(0)
          setProfitFactor(0)
          setAvgWinLoss(0)
          setDayWin(0)

          setallTradesTaken(0)
          setwinningTradesProfit(0)
          setlosingTradesLoss(0)
        }
      } catch (error) {
        console.log(error)
      }
    }

    // fetchData()
  }, [
    accountSelect?.account_name,
    selectedDates?.start,
    selectedDates?.end,
    brokerSelect?.unique_id,
    apiAccessToken,
  ])

  const ProfitPercentage = allTradesTaken ? ((winningTradesProfit / allTradesTaken) * 100).toFixed(2) : 0
  const LossPercentage = allTradesTaken ? ((losingTradesLoss / allTradesTaken) * 100).toFixed(2) : 0
  const remaining = allTradesTaken - (winningTradesProfit + losingTradesLoss)
  const remainingPercentage = allTradesTaken ? ((remaining / allTradesTaken) * 100).toFixed(2) : 0
  const chartOptions = {
    labels: ["Winning Trades", "Losing Trades", "Breakeven Trades"],
    colors: ["#28a745", "#dc3545", "#ffc107"],
  }
  const chartSeries = [
    parseFloat(ProfitPercentage),
    parseFloat(LossPercentage),
    parseFloat(remainingPercentage),
  ]

  useEffect(() => {
    const fetchcashbalancesnapshot = async () => {
      if (!accountSelect.account_name || !brokerSelect.unique_id || !apiAccessToken) return
      const payload = {
        user_id: localStorage.getItem("user_id"),
        accountid: accountSelect?.account_id,
        unique_id: brokerSelect?.unique_id,
      }

      try {
        const response = await axios.get(`get_cash_balance`, {
          params: payload,
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        })

        setcurrentBalance(response?.data?.totalCashValue || 0)
        settodayPnL(response?.data?.totalPnL || 0)
        setweeklyPnL(response?.data?.weekRealizedPnL || 0)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    // fetchcashbalancesnapshot()
  }, [accountSelect?.account_id, brokerSelect?.unique_id, apiAccessToken])

  useEffect(() => {
    const fetchTodayPnL = async () => {
      if (!accountSelect.account_name || !brokerSelect.unique_id || !apiAccessToken) return
      const payload = {
        user_id: localStorage.getItem("user_id"),
        accountname: accountSelect?.account_name,
        unique_id: brokerSelect?.unique_id,
      }

      try {
        const response = await axios.get(`get_today_profit_loss_data`, {
          params: payload,
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        })

        if (response?.data?.response_data && response?.data?.response_data.length > 0) {
          setTodayPnLChart(response?.data?.response_data[0]["extra"]["trade_log"] || [])
        } else {
          setTodayPnLChart([])
        }
      } catch (error) {
        console.error("Error fetching PnL data:", error)
      }
    }

    // fetchTodayPnL()
  }, [accountSelect?.account_name, brokerSelect?.unique_id, apiAccessToken])

  const hourlyAggregation = {}

  todayPnLChart.forEach((trade) => {
    const date = new Date(trade.soldTimestamp)
    const hour = date.getHours()

    const pnlStr = String(trade.pnl || "0")
    const isNegative = pnlStr.includes("(")
    const pnlValue = parseFloat(pnlStr.replace(/[\$\(\)]/g, ""))
    const finalValue = isNegative ? -pnlValue : pnlValue

    if (hourlyAggregation[hour] === undefined) {
      hourlyAggregation[hour] = 0
    }
    hourlyAggregation[hour] += finalValue
  })

  const filteredEntries = Object.entries(hourlyAggregation)
    .filter(([_, pnl]) => pnl !== 0)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
  const timeCategories = filteredEntries.map(([hour]) => `${hour}:00`)
  const seriesData = filteredEntries.map(([, pnl]) => pnl)

  const TodayPnLseries = [
    {
      name: "PnL",
      data: seriesData,
    },
  ]

  const TodayPnLoptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            { from: -Infinity, to: 0, color: "#FF4D4D" },
            { from: 0, to: Infinity, color: "#28C76F" },
          ],
        },
      },
    },
    xaxis: {
      categories: timeCategories,
      labels: {
        style: {
          fontSize: "9px",
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontWeight: "bold",
      },
      formatter: function (val) {
        return val < 0 ? `$(${Math.abs(val)})` : `$${val}`
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toFixed(2),
      },
    },
  }

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const ProfitLoss = data.map((item) => item.sellPrice - item.buyPrice)

      // setProfitLossHistory(ProfitLoss)
    } else {
      // setProfitLossHistory([])
    }
  }, [data])

  useEffect(() => {
    const checkAllDataLoaded = async () => {
      if (data?.length > 0 && accountBlanaceHisData.length > 0) {
        setLoading(false)
      }
    }

    // checkAllDataLoaded()
  }, [data, accountBlanaceHisData])

  const maxProfit = Math.max(...profitlosshistory)
  const minLoss = Math.min(...profitlosshistory)
  const maxProfitIndex = profitlosshistory.indexOf(maxProfit)
  const minLossIndex = profitlosshistory.indexOf(minLoss)

  // useState(() => {
  //   const fetchAccountBalanceData = async () => {
  //     try {
  //       const payload = {
  //         user_id: localStorage.getItem("user_id"),
  //         account: accountSelect.name,
  //         unique_id: brokerSelect.unique_id,
  //       };
  //       const response = await axios.post(`${development_backendurl()}account-balance-history`, payload, {
  //         headers: { "Content-Type": "application/json" },
  //       });
  //       let response_data = response.data.data
  //       console.log("My data: ", response_data)
  //       if (response_data) {
  //         const fixedData = response_data.replace(
  //           /("Trade Date":\s*)(\d{4}-\d{2}-\d{2})/g,
  //           '$1"$2"'
  //         );
  //         fixedData = JSON.parse(fixedData)
  //         setAccountBalanceHisData(fixedData);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchAccountBalanceData();
  // }, [accountSelect]);
  // const chartData = {
  //   series: [
  //     {
  //       name: "Total Amount",
  //       data: accountBlanaceHisData.map((item) => ({
  //         x: item["Trade Date"],
  //         y: item["Total Amount"],
  //       })),
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "line",
  //       height: 350,
  //       toolbar: { show: false },
  //     },
  //     colors: ["#28C76F"],
  //     stroke: {
  //       curve: "smooth",
  //       width: 2,
  //     },
  //     title: {
  //       text: "Account Balance History",
  //       align: "center",
  //       style: { fontSize: "16px", fontWeight: "bold", color: "white" },
  //     },
  //     xaxis: {
  //       type: "datetime",
  //       labels: { format: "yyyy-MM-dd" },
  //     },
  //     dataLabels: { enabled: false },
  //   },
  // };
  const { memberShipPlan } = useMembership()

  // if (setupLoader && memberShipPlan !== "No Plan") {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Spinner color="danger" label="Loading..." labelColor="danger" />
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="flex justify-between items-center mb-6 flex-col md:flex-col lg:flex-col lg:justify-center xl:flex-row md:gap-5 xl:gap-0 duration-300">
        <h2 className="text-xl font-semibold xl:self-center self-start">Dashboard</h2>
        <div className="w-full">{GlobalDateAccount}</div>
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <PulseLoader
              color="#2b0afb"
              cssOverride={{
                margin: 200,
              }}
              size={10}
              speedMultiplier={1}
            />
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5">
              <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Users
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="Total registered users."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4>{counts.users}</h4>
              </Card>

              <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Subscriptions
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="Total subscriptions."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4>{counts.subscriptions}</h4>
                <CardBody />
              </Card>
              <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Orders
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="Total orders till now."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4>{counts.orders}</h4>
                <CardBody className="overflow-visible py-2" />
              </Card>

              <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Products
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="All the listed products."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4>{counts.products}</h4>
                <CardBody className="overflow-visible py-2" />
              </Card>
              {/* <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Avg win/loss Trade
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="information about the sections..."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4 className={avgWinLoss >= 1 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  {avgWinLoss >= 1 ? (
                    <span className="flex items-center gap-2">
                      {avgWinLoss} <WinIcon size={12} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {avgWinLoss} <LossIcon size={12} />
                    </span>
                  )}
                </h4>
                <CardBody className="overflow-visible py-2" />
              </Card> 
               <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Current Balance ($)
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="information about the sections..."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4 className={currentBalance >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  {currentBalance >= 0 ? (
                    <span className="flex items-center gap-2">
                      ${currentBalance} <WinIcon size={12} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ${currentBalance} <LossIcon size={12} />
                    </span>
                  )}
                </h4>
                <CardBody className="overflow-visible py-2" />
              </Card>
              <Card className="p-4 md:max-w-sm w-full dark:bg-tableBg shadow-none rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Today&apos;s Total P&L ($)
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="information about the sections..."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4 className={todayPnL >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  {todayPnL >= 0 ? (
                    <span className="flex items-center gap-2">
                      ${todayPnL} <WinIcon size={12} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ${todayPnL} <LossIcon size={12} />
                    </span>
                  )}
                </h4>
                <CardBody className="overflow-visible py-2" />
              </Card>
              <Card className="p-4 md:max-w-sm w-full shadow-none dark:bg-tableBg rounded-md">
                <p className="text-sm uppercase flex items-center ">
                  Weekly Total P&L
                  <Tooltip
                    showArrow
                    classNames={{
                      base: ["before:bg-neutral-400 dark:before:bg-white"],
                      content: [
                        "py-2 px-4  shadow-xl",
                        "text-black bg-grayishTooltip text-white font-normal tracking-wider",
                      ],
                    }}
                    content="information about the sections..."
                    placement="top"
                  >
                    <span className="text-xs text-gray-500 ml-2 cursor-pointer">
                      <QuestionIcon size={16} />
                    </span>
                  </Tooltip>
                </p>
                <h4 className={weeklyPnL >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  {weeklyPnL >= 0 ? (
                    <span className="flex items-center gap-2">
                      ${weeklyPnL} <WinIcon size={12} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      ${weeklyPnL} <LossIcon size={12} />
                    </span>
                  )}
                </h4>
                <CardBody className="overflow-visible py-2" />
              </Card> */}
            </div>
            {/* //dasds */}
            {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-5">
              <Card className="p-4 max-w-sm w-full shadow dark:bg-tableBg">
                <p className="text-sm uppercase">Current Balance ($)</p>
                <h4
                  className={
                    currentBalance >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"
                  }
                >
                  ${currentBalance}
                </h4>
              </Card>

              <Card className="p-4 max-w-sm w-full shadow dark:bg-tableBg">
                <p className="text-sm uppercase">Today's P&L ($)</p>
                <h4 className={todayPnL >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  ${todayPnL >= 0 ? todayPnL : -1 * todayPnL}
                </h4>
              </Card>

              <Card className="p-4 max-w-sm w-full shadow dark:bg-tableBg">
                <p className="text-sm uppercase">Weekly P&L</p>
                <h4 className={weeklyPnL >= 0 ? "text-lg text-green-600" : "text-lg text-red-600"}>
                  ${weeklyPnL >= 0 ? weeklyPnL : -1 * weeklyPnL}
                </h4>
              </Card>
            </div> */}

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
              <div className="rounded-2xl border  bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 ">
                <div className="text-center font-semibold">P&L AREA</div>
                <div className="relative sm:rounded-lg overflow-hidden flex items-center justify-center">

                  <AreaChartByEcharts dataaa={AreaChartPnLData} />
                </div>
              </div>

              <div className="border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 rounded-2xl">
                <div className="text-center font-semibold">P&L HISTORY</div>
                <div className="relative sm:rounded-lg overflow-hidden flex items-center justify-center">
                  {profitlosshistory && <BarChartByEcharts dataaa={AreaChartPnLData} />}
                </div>
              </div>
              <div className="border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 rounded-2xl">
                <div className="text-center font-semibold">WINNING V/S LOSING TRADES</div>
                <div className="relative sm:rounded-lg overflow-hidden flex items-center justify-center">
                  <Chart options={chartOptions} series={chartSeries} style={{ width: "100%" }} type="pie" />
                </div>
              </div>

              <div className="border bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 rounded-2xl">
                <div className="text-center font-semibold">NET P&L PER TIME OF DAY</div>
                <div className="relative sm:rounded-lg overflow-hidden flex items-center justify-center">
                  <Chart
                    options={TodayPnLoptions}
                    series={TodayPnLseries}
                    style={{ width: "100%" }}
                    type="bar"
                  />
                </div>
              </div>
            </div> */}


            {/* // already commented */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
              <div className="rounded-1xl border border-gray-900 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 rounded-lg">
                <div className="text-center font-semibold">P/L per time of day</div>
                <div className="relative shadow-md sm:rounded-lg overflow-hidden flex items-center justify-center">
                  <Chart
                    options={TodayPnLoptions}
                    series={TodayPnLseries}
                    type="bar"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div> */}


            {/* <DashboardTodayPnL /> */}
          </>
        )}
      </div >
    </>
  )
}

export default DashBoard
