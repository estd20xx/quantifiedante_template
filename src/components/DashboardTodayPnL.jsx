import axios from "axios"
import { useEffect, useState } from "react"
import { backendurl } from "../constants/myapi"
import { useDateAccount } from "../context/DateAccountContextProvider"
import { DemoApp } from "./JournalCalendar"

function DashboardTodayPnL() {
  const { accountSelect, brokerSelect, apiAccessToken } = useDateAccount()
  const [todayPnLData, setTodayPnLData] = useState([])

  useEffect(() => {
    if (!accountSelect.account_name || !brokerSelect.unique_id || !apiAccessToken) return
    const fetchTodayPnL = async () => {
      const payload = {
        user_id: localStorage.getItem("user_id"),
        accountname: accountSelect.account_name,
        unique_id: brokerSelect.unique_id,
      }
      try {
        const response = await axios.get(`${backendurl()}get_today_profit_loss_data`, {
          params: payload,
          headers: { Authorization: `Bearer ${apiAccessToken}` },
        })
        if (
          response?.data?.response_data &&
          Array.isArray(response.data.response_data) &&
          response?.data?.response_data.length > 0 &&
          response?.data?.response_data[0]?.extra?.trade_log
        ) {
          setTodayPnLData(response.data.response_data[0].extra.trade_log)
        } else {
          console.warn("PnL data is missing or in unexpected format:", response.data)
          setTodayPnLData([])
        }
      } catch (error) {
        console.error("Error fetching PnL data:", error)
      }
    }

    // fetchTodayPnL()
  }, [accountSelect?.account_name, brokerSelect?.unique_id, apiAccessToken])

  return (

    <div className="w-full bg-white dark:bg-tableBg my-5 rounded-2xl p-6 flex gap-5">
      <div className="w-full border rounded-lg">
        <DemoApp />
      </div>
    </div>

  )
}

export default DashboardTodayPnL
