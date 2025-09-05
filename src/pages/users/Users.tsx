import { getTheme } from "@table-library/react-table-library/baseline"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { useEffect, useState } from "react"

import { TableLabel } from "../subscriptions/Subscriptions"

import axios from "@/lib/axios"

interface AdminUserInterface {
  id: string
  first_name: string
  last_name: string
  email: string
  contact: string
  discord_id: string
  tradingview_id: string
}

function Users() {
  const [adminUsers, setAdminUsers] = useState<Array<AdminUserInterface>>([
    {
      id: "68518512a1300da2be9ac609",
      first_name: "Abhishek ",
      last_name: "Kumar",
      email: "ak352319@gmail.com",
      contact: "+918521431037",
      discord_id: "",
      tradingview_id: "",
    },
    {
      id: "68474e5ebd2d5d84a57855cd",
      first_name: "Adele",
      last_name: "Prinsloo",
      email: "Prinsloo.ac@gmail.com",
      contact: "+16155742147",
      discord_id: "",
      tradingview_id: "",
    },
    {
      id: "68475090bd2d5d84a57855e9",
      first_name: "Adele",
      last_name: "Prinsloo",
      email: "prinsloo.ac@gmail.com",
      contact: "+16155742147",
      discord_id: "1275608804301606974",
      tradingview_id: "Acprins3369",
    },
    {
      id: "6849c3ed2a99fcdbf83ece46",
      first_name: "Alicia",
      last_name: "Garrett",
      email: "wmptradingllc@gmail.com",
      contact: "+17144251704",
      discord_id: "1325985666630422660",
      tradingview_id: "WMPTradingLLC",
    },
    {
      id: "6849c3192a99fcdbf83ece43",
      first_name: "Alicia",
      last_name: "Garrett",
      email: "wmptrading@gmail.com",
      contact: "+17144251704",
      discord_id: "",
      tradingview_id: "",
    },
  ])

  const getUsers = async () => {
    const response = await axios.get("show_user")

    setAdminUsers(response.data?.users)
    console.log(response.data)
    try {
    } catch (error) {}
  }

  useEffect(() => {
    getUsers()
  }, [])

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: 30% 20% 20% 20% 20% 20% 20%;
      `,
      Cell: `
    padding: 16px 8px;
  text-align: left;
  white-space: nowrap;     
  overflow: hidden;       
  text-overflow: initial; 
    `,
      HeaderCell: `
      padding: 16px 8px;
      border-bottom: 1px solid #D9D9D9;
      border-top: 1px solid #D9D9D9;
    `,
    },
  ])

  const nodes: AdminUserInterface[] = adminUsers?.map((item) => ({
    id: item.id,
    first_name: item.first_name,
    last_name: item.last_name,
    email: item.email,
    contact: item.contact,
    discord_id: item.discord_id,
    tradingview_id: item.tradingview_id,
  }))

  const COLUMNS = [
    {
      label: <TableLabel>User ID</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span className="text-xs sm:text-sm">{item.id}</span>,
    },
    {
      label: <TableLabel>First Name</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span>{item.first_name}</span>,
    },
    {
      label: <TableLabel>Last Name</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span className="text-xs sm:text-sm">{item.last_name}</span>,
    },
    {
      label: <TableLabel>Email</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span className="text-xs sm:text-sm">{item.email}</span>,
    },
    {
      label: <TableLabel>Contact</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span className="text-xs sm:text-sm">{item.contact}</span>,
    },
    {
      label: <TableLabel>Discord ID</TableLabel>,
      renderCell: (item: AdminUserInterface) => <span className="text-xs sm:text-sm">{item.discord_id}</span>,
    },
    {
      label: <TableLabel>TradingView ID</TableLabel>,
      renderCell: (item: AdminUserInterface) => (
        <span className="text-xs sm:text-sm">{item.tradingview_id}</span>
      ),
    },
  ]

  return (
    <div className=" bg-white rounded-2xl w-full p-5">
      <CompactTable
        columns={COLUMNS}
        data={{ nodes }}
        layout={{ custom: true, horizontalScroll: true }}
        theme={theme}
      />
    </div>
  )
}

export default Users
