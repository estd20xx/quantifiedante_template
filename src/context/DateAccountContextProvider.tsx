import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"
import { format, subDays } from "date-fns"
import { ChevronUp } from "lucide-react"
import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "../lib/axios"

import { BrokersAccount } from "@/api/BrokersAccount"
import CustomDateRangePicker from "@/components/DateRangePicker"

interface DateAccountContextInterface {
  GlobalDateAccount: React.ReactNode
  brokerSelect: any
  accountSelect: any
  selectedDates: any
  brokerAccounts: any
  apiAccessToken: string
  fetchData: () => Promise<void>
}

const DateAccountContext = createContext<DateAccountContextInterface | undefined>(undefined)

const DateAccountContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const apiKey = "3dd7c2fc-9e6a-407c-8b7a-aa8bd1a200c8-Quantifiedante"
  const today = new Date()
  const sevenDaysAgo = subDays(today, 8)
  const formatDate = (date: any) => format(date, "MM/dd/yyyy")

  const [apiAccessToken, setApiAccessToken] = useState(
    "27e5a5f91c9898f50e2ff83234b506a35e516ffb8a59f32acbdf2d9f2f1c498e",
  )

  //TODO need to change
  const [brokerAccounts, setBrokerAccounts] = useState<Array<{ Name: string; unique_id: string }>>([])
  const [brokerSelect, setBrokerSelect] = useState<{
    brokerName: string
    unique_id: string
  }>({ brokerName: "", unique_id: "" })

  const [accounts, setAccounts] = useState<
    Array<{
      accountType: string
      active: string
      archived: string
      autoLiqProfileId: number
      clearingHouseId: number
      closed: string
      id: number
      legalStatus: string
      marginAccountType: string
      name: string
      restricted: string
      riskCategoryId: number
      timestamp: string
      userId: number
    }>
  >([])
  const [accountSelect, setAccountSelect] = useState<any>({})
  const [selectedDates, setSelectedDates] = useState({
    start: formatDate(sevenDaysAgo),
    end: formatDate(today),
  })

  // function convertDateToRange(dateStr1: any, dateStr2: any) {
  //   const [month1, day1, year1] = dateStr1.split("/").map(Number)
  //   const [month2, day2, year2] = dateStr2.split("/").map(Number)

  //   return {
  //     start: new CalendarDate(year1, month1, day1),
  //     end: new CalendarDate(year2, month2, day2),
  //   }
  // }

  const [isDropDownOpen, setIsDropDownOpen] = useState({
    broker: false,
    account: false,
  })

  const fetchAccountInfo = async (unique_id: string) => {
    try {
      const response = await axios.get(
        `tradovate_functionalities_data?user_id=${localStorage.getItem("user_id")}&unique_id=${unique_id}&tradovate_functionality=account_info`,
      )

      console.log(response.data.data)
      setAccounts(response.data.data)

      return response.data.data
    } catch (error) {
      console.error("Error fetching account info:", error)

      return []
    }
  }

  const fetchAccountsList = async (unique_id: string, brokerName: string) => {
    const accountList = await fetchAccountInfo(unique_id)

    setBrokerSelect({ brokerName: brokerName, unique_id: unique_id })

    if (Array.isArray(accountList) && accountList.length > 0) {
      setAccountSelect({
        account_name: accountList[0].name || "",
        account_id: accountList[0].id || "",
      })
    } else {
      setAccountSelect({})
    }
  }

  const handleAccountSelect = (account: string, id: string) => {
    setAccountSelect({ account_name: account, account_id: id })
  }

  const handleDateChange = (dates: any) => {
    if (dates && dates.start && dates.end) {
      setSelectedDates({
        start: dates.start,
        end: dates.end,
      })
    } else {
      setSelectedDates({
        start: formatDate(sevenDaysAgo),
        end: formatDate(today),
      })
    }
  }

  const GlobalDateAccount = (
    <div className="flex justify-end gap-4 items-center flex-col md:flex-row mt-3 md:mt-0 w-full bg-">
      <div className="flex justify-end md:justify-between xl:justify-end items-center gap-4 flex-wrap w-full md:pl-2  md:flex-nowrap">
        <Dropdown
          classNames={{
            base: "min-w-96 md:min-w-60",
            content: " md:min-w-60 min-w-full rounded-md",
            trigger: "bg-white px-10 md:min-w-48 xl:min-w-60 min-w-full",
          }}
          onOpenChange={(e) => setIsDropDownOpen((prev) => ({ ...prev, broker: e }))}
        >
          <DropdownTrigger>
            <button className="relative p-3 whitespace-nowrap  text-grayNeuraText flex items-center gap-2 border border-grayBorder rounded-md">
              <img
                alt="wallet"
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/icons/walletIcon.svg"
              />
              {brokerSelect.brokerName ? brokerSelect.brokerName : "Select Broker"}
              <ChevronUp
                className={`text-black absolute right-5 ${isDropDownOpen.broker ? "rotate-180" : "rotate-0"} duration-300`}
                size={20}
              />
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Broker List">
            {brokerAccounts &&
              brokerAccounts?.map((broker_account) => (
                <DropdownItem
                  key={broker_account["unique_id"]}
                  startContent={
                    <img
                      alt="tradovate icons"
                      className="w-6 h-6"
                      src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/logo/Tradovate.png"
                    />
                  }
                  onClick={() => {
                    fetchAccountsList(broker_account.unique_id, broker_account.Name)
                  }}
                >
                  {broker_account?.Name}
                </DropdownItem>
              ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown
          classNames={{
            base: "min-w-96 md:min-w-60",
            content: " md:min-w-60 min-w-full rounded-md",
            trigger: "bg-white px-10 md:min-w-60 min-w-full",
          }}
          onOpenChange={(e) => setIsDropDownOpen((prev) => ({ ...prev, account: e }))}
        >
          <DropdownTrigger className="">
            <button className=" relative p-3 whitespace-nowrap  text-grayNeuraText flex items-center gap-2 border border-grayBorder rounded-md">
              <img
                alt="wallet"
                src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/icons/user.svg"
              />
              {accountSelect?.account_name || (accounts?.length > 0 ? accounts[0].name : "Select Account")}
              <ChevronUp
                className={`text-black absolute right-5 ${isDropDownOpen.account ? "rotate-180" : "rotate-0"} duration-300`}
                size={20}
              />
            </button>
          </DropdownTrigger>

          <DropdownMenu aria-label="Accounts List">
            {accounts?.map((account) => {
              return (
                <DropdownItem
                  key={account.id}
                  onClick={() => handleAccountSelect(account["name"], String(account.id))}
                >
                  {account.name}
                </DropdownItem>
              )
            })}
            {/* {accounts.length > 0 &&
              accounts?.map((account) => (
                <DropdownItem
                  key={account["id"]}
                  onClick={() =>
                    handleAccountSelect(account["name"], account["id"])
                  }
                >
                  {account["name"]}
                </DropdownItem>
              ))} */}
          </DropdownMenu>
        </Dropdown>

        <Dropdown>
          <DropdownTrigger>
            <CustomDateRangePicker
              className="md:max-w-xs w-full mt-[9px]"
              selectedDates={selectedDates}
              onChange={handleDateChange}
            />
          </DropdownTrigger>
          <DropdownMenu className="hidden">
            <DropdownItem key={"ds"}>ds</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  )

  const fetchData = async () => {
    if (!apiAccessToken) return
    try {
      const data = await BrokersAccount(apiAccessToken)

      // if (
      //   !data ||
      //   !Array.isArray(data.user_brokers_props_accounts) ||
      //   data.user_brokers_props_accounts.length === 0
      // ) {
      //   console.warn("No broker accounts found.")
      //   setBrokerAccounts([])

      //   return
      // }

      // setBrokerAccounts(data.user_brokers_props_accounts)

      // const firstBroker = data.user_brokers_props_accounts[0]

      // setBrokerSelect({
      //   brokerName: firstBroker["Name"] || "",
      //   unique_id: firstBroker["unique_id"] || "",
      // })

      // const accData = await fetchAccountInfo(firstBroker["unique_id"])

      // if (Array.isArray(accData) && accData.length > 0) {
      //   setAccountSelect({
      //     account_name: accData[0].name || "",
      //     account_id: accData[0].id || "",
      //   })
      // } else {
      //   console.warn("No accounts found for broker.")
      //   setAccountSelect({})
      // }
    } catch (error) {
      console.error("Error fetching broker accounts:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [apiAccessToken])

  useEffect(() => {
    if (selectedDates.start && selectedDates.end) {
      fetchData()
    }
  }, [selectedDates])

  useEffect(() => {
    const fetchApiAccessToken = async () => {
      try {
        const response = await axios.post(`get_api_access_token/`, {
          apiKey: apiKey,
          user_id: localStorage.getItem("user_id"),
        })

        if (response.data?.status && response.data.get_access_token) {
          setApiAccessToken(response.data.get_access_token)
        } else {
          console.error("Error fetching API access token:", response.data.message)
        }
      } catch (error) {
        console.error("API access token request failed:", error)
      }
    }

    // fetchApiAccessToken()
    // const intervalId = setInterval(fetchApiAccessToken, 20 * 60 * 1000)

    // return () => clearInterval(intervalId)
  }, [])

  return (
    <DateAccountContext.Provider
      value={{
        GlobalDateAccount,
        brokerSelect,
        accountSelect,
        selectedDates,
        brokerAccounts,
        apiAccessToken,
        fetchData,
      }}
    >
      {children}
    </DateAccountContext.Provider>
  )
}

export const useDateAccount = () => {
  const context = useContext(DateAccountContext)

  if (!context) {
    throw new Error("undefined")
  }

  return context
}

export default DateAccountContextProvider
