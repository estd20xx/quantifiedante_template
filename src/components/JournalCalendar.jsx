import axios from "axios"
import { useEffect, useState } from "react"
import { backendurl } from "../constants/myapi.ts"
import { useDateAccount } from "../context/DateAccountContextProvider.tsx"
// import DetailsCalendar from "../../DetailsCalendar/DetailsCalendar"
import dayGridPlugin from "@fullcalendar/daygrid"
import FullCalendar from "@fullcalendar/react"

//commit
export function DemoApp() {
  const { brokerSelect, accountSelect, selectedDates, apiAccessToken } = useDateAccount()

  const [events, setEvents] = useState([])
  const [dayStatsMap, setDayStatsMap] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (
        !selectedDates.start ||
        !selectedDates.end ||
        !accountSelect.account_name ||
        !brokerSelect.unique_id ||
        !apiAccessToken
      )
        return

      // ?setLoading(true);
      try {
        const payload = {
          user_id: localStorage.getItem("user_id"),
          start_date: selectedDates.start,
          end_date: selectedDates.end,
          account: accountSelect.account_name,
          unique_id: brokerSelect.unique_id,
        }

        const response = await axios.post(`${backendurl()}tradejournal-calendar`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiAccessToken}`,
          },
        })

        if (response.data && response.data.new_data) {
          const formattedEvents = response.data.new_data.map((event) => ({
            title: `P&L: ${event.title}`,
            start: new Date(event.start),
          }))
          setEvents(formattedEvents)

          // Create a map of date strings to day stats
          // const statsMap = {};
          // formattedEvents.forEach((event) => {
          //   const dateStr = event.start.toISOString().split('T')[0]; // YYYY-MM-DD format
          //   const pnlValue = parseFloat(event.title.split(": ")[1]);
          //   statsMap[dateStr] = {
          //     profit: pnlValue,
          //     trades: 1, // You might want to get actual trade count from API
          //     positive: pnlValue > 0
          //   };
          // });

          // setDayStatsMap(statsMap);
        } else {
          setEvents([])
          // setDayStatsMap({})
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setEvents([])
        setDayStatsMap({})
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [
    selectedDates.start,
    selectedDates.end,
    accountSelect.account_name,
    brokerSelect.unique_id,
    apiAccessToken,
  ])

  // Function to get stats for a specific day
  // const getDayStats = (year, month, day) => {
  //   const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  //   return dayStatsMap[dateStr] || {
  //     profit: 0,
  //     trades: 0,
  //     positive: false
  //   };
  // };

  // if (loading) {
  //   return <div className="flex items-center justify-center h-32">
  //     <div className="text-lg">Loading calendar data...</div>
  //   </div>;
  // }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        dayCellDidMount={(arg) => {
          const cellDate = arg.date
          const event = events.find((event) => {
            const eventDate = new Date(event.start)
            return eventDate.toDateString() === cellDate.toDateString()
          })

          if (event) {
            const pnlValue = parseFloat(event.title.split(": ")[1])
            arg.el.style.backgroundColor = pnlValue < 0 ? "#ffdddd" : "#ddffdd"
          }
        }}
      />
      {/* <DetailsCalendar 
        dayStats={getDayStats(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
        getDayStats={getDayStats}
        dayStatsMap={dayStatsMap}
      /> */}
    </div>
  )
}

function renderEventContent(eventInfo) {
  const pnlValue = parseFloat(eventInfo.event.title.split(": ")[1])
  const textColor = pnlValue < 0 ? "red" : "green"

  return <div style={{ color: textColor, fontWeight: "bold" }}>{eventInfo.event.title}</div>
}
