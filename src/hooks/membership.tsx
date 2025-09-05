import { MemberType } from "@namelessnerd/quantifiedante"
import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "../lib/axios"

interface MembershipContextType {
  memberShipPlan: MemberType
  expiryDatePlan: string
  setMemberShipPlan: React.Dispatch<React.SetStateAction<MemberType>>
  setExpiryDatePlan: React.Dispatch<React.SetStateAction<string>>
  isMembershipLoading: boolean
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

export const MembershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memberShipPlan, setMemberShipPlan] = useState<MemberType>("No Plan")
  const [expiryDatePlan, setExpiryDatePlan] = useState("")
  const [isMembershipLoading, setIsMembershipLoading] = useState<boolean>(true)
  const apiAccessToken = ""
  const userID = localStorage.getItem("user_id")

  useEffect(() => {
    if (!userID) return
    if (!apiAccessToken) return
    setIsMembershipLoading(true)
    const fetchPlan = async () => {
      try {
        const response = await axios.get("fetch_plan", {
          params: { user_id: userID },
          headers: {
            Authorization: `Bearer ${apiAccessToken}`,
          },
        })

        if (response.data.status === true) {
          setMemberShipPlan(response.data.membership_plan)
          setExpiryDatePlan(response.data.expiry_date)
        }
      } catch (err) {
        console.error("Failed to fetch membership plan", err)
      } finally {
        setIsMembershipLoading(false)
      }
    }

    fetchPlan()
  }, [userID, apiAccessToken])

  return (
    <MembershipContext.Provider
      value={{ memberShipPlan, setMemberShipPlan, expiryDatePlan, setExpiryDatePlan, isMembershipLoading }}
    >
      {children}
    </MembershipContext.Provider>
  )
}

export const useMembership = (): MembershipContextType => {
  const context = useContext(MembershipContext)

  if (!context) {
    throw new Error("useMembership must be used within a MembershipProvider")
  }

  return context
}
