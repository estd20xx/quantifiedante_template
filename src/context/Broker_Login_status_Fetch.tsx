import React, { createContext, useContext, useState } from "react"

interface Broker_Login_status_FetchType {
  broker_login_status: any
  isModalOpen: boolean
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Broker_Login_status_Fetch = createContext<Broker_Login_status_FetchType | undefined>(undefined)

export const BrokerLoginStatusProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [broker_login_status, setData] = useState<any>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!apiAccessToken) return
  //     if (localStorage.getItem("user_id")) {
  //       try {
  //         const response = await axios.get(
  //           `check_token_available?user_id=${localStorage.getItem("user_id")}`,
  //           {
  //             headers: { Authorization: `Bearer ${apiAccessToken}` },
  //           },
  //         )

  //         setData(response.data)

  //         if (
  //           response.data.user_brokers_props_accounts.length > 0 &&
  //           localStorage.getItem("success_step") === "4" &&
  //           localStorage.getItem("first_broker_added") === "no"
  //         ) {
  //           localStorage.setItem("success_step", "5")
  //           localStorage.setItem("first_broker_added", "yes")
  //           // alert(localStorage.getItem("first_broker_added"))
  //           const response = await axios.get(
  //             `predictive_application_set_up?success_step=5&user_id=${localStorage.getItem("user_id")}`,
  //             { headers: { Authorization: `Bearer ${apiAccessToken}` } },
  //           )

  //           if (response) {
  //             // TODO modal
  //             setIsModalOpen(true)
  //             // alert("Setup completed successfully!")
  //           }
  //           //  window.location.replace("/welcome")
  //         }
  //       } catch (error) {
  //         console.error("Error fetching data:", error)
  //       }
  //     }
  //   }

  //   fetchData()
  //   const intervalId = setInterval(fetchData, 2000)

  //   return () => clearInterval(intervalId)
  // }, [apiAccessToken])

  return (
    <Broker_Login_status_Fetch.Provider value={{ broker_login_status, isModalOpen, setIsModalOpen }}>
      {children}
    </Broker_Login_status_Fetch.Provider>
  )
}

export const useBrokerLoginStatus = () => {
  const context = useContext(Broker_Login_status_Fetch)

  if (!context) {
    throw new Error("useBrokerLoginStatus must be used within a GlobalDataProvider")
  }

  return context
}
