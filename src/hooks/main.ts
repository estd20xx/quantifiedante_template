import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

import { AppDispatch, RootStore } from "../store/store"
export const useTypedSelectorHook: TypedUseSelectorHook<RootStore> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
