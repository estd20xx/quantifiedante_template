import { useTypedSelectorHook } from "../hooks/main"
import { authData } from "../store/slices/userInfo/Auth.slice"

export const useAuth = () => {
  const userAuthData = useTypedSelectorHook(authData)

  if (userAuthData.data == null) {
    throw new Error("wrong credentials")
  }

  return [userAuthData] as const
}
