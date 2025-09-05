import { createSlice } from "@reduxjs/toolkit"
import { RootStore } from "../../store"
interface UserCredentials {
  status: number
  message: string
}
interface InitialUserCredentialsInterface {
  data: UserCredentials | null
}
const initialState: InitialUserCredentialsInterface = {
  data: null,
}
const authSlices = createSlice({
  name: "@userCredentials",
  initialState,
  reducers: {},
})

export const {} = authSlices.actions
export const authData = (state: RootStore) => state.auth
export default authSlices.reducer
