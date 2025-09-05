interface EndPointsInterface {
  accountAndPerferences: string
  deleteUserAccountAndPerf: string
  eventTitles: string
  insertUserAccountNPerf: string
}
export const endPoints: EndPointsInterface = {
  accountAndPerferences: "show_User_accounts_and_pref?user_id=",
  deleteUserAccountAndPerf: "delete_user_accounts_and_pref?id=",
  eventTitles: "trade_working_time?user_id=",
  insertUserAccountNPerf: "insert_User_accounts_and_pref/?user_id="
}
