
import { backendurl } from "@/constants/myapi"

interface AccountIntercace {
  token: string
  token_available: string
  Name: string
  broker_nam: string
  prop_name: string
  unique_id: number
}

export interface BrokerAccountResponse {
  user_trade_status: string
  user_brokers_props_accounts: Array<AccountIntercace>
}

export const BrokersAccount = async (apiAccessToken: string) => {
  const url = backendurl()

  return null
  // try {
  //   if (apiAccessToken) {
  //     const response = await axios.get(
  //       `${url}check_token_available/?user_id=${localStorage.getItem("user_id")}`,
  //       {
  //         headers: { Authorization: `Bearer ${apiAccessToken}` },
  //       },
  //     )

  //     console.log("Broker accounts fetched successfully:", response.data)

  //     return response.data
  //   }
  // } catch (error) {
  //   console.error("Error fetching account info:", error)

  //   return null
  // }
}
