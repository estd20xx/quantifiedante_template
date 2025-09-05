export type MemberType = "No Plan" | "Novice" | "Professional" | "Elite"

import React, { createContext, useContext, useEffect, useState } from "react"

import axios from "../lib/axios"

interface MembershipContextType {
  memberShipPlan: string
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

  useEffect(() => {
    const userID = localStorage.getItem("user_id")
    if (!userID) return
    setIsMembershipLoading(true)
    const fetchPlan = async () => {
      try {
        const response = await axios.get("fetch_plan", { params: { user_id: userID } })

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
  }, [localStorage.getItem("user_id")])

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
