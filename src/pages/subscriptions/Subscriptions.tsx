import { getTheme } from "@table-library/react-table-library/baseline"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { useEffect, useState } from "react"

import axios from "@/lib/axios"

export const TableLabel = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 ">
      <span className="text-xs sm:text-sm font-semibold">{children}</span>
      {/* <ArrowDownUp className="text-grayNeuraText h-3 w-3 sm:h-4 sm:w-4" /> */}
    </div>
  )
}

export interface SubscriptionResponse {
  status: boolean
  count: number
  subscription_data: SubscriptionData[]
}

export interface SubscriptionData {
  subscription_id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  product_type: string
  product_name: string
  expiry_date: string
  renewal_date: string
  joining_date: string
  status: string
  order_details: OrderDetail[]
}

export interface OrderDetail {
  order_detail_id: string
  user_id: string
  order_id: string
  price: string
  date: string
  quantity: number
  subscription_type: string
  product_name: string
  product_type: string
  product_description: string
  product_per_month_price: string
  product_per_year_price: string
}

interface SubscriptionsResponse extends SubscriptionData {
  id: string
}

function Users() {
  const [subscriptionsData, setSubscriptionsData] = useState<Array<SubscriptionData>>([
    {
      subscription_id: "684fb263ee4269d96a49e6c2",
      user_id: "684fb262ee4269d96a49e6c0",
      first_name: "AneelBull",
      last_name: "Kathayat",
      email: "kathayatanil3@gmail.com",
      product_type: "service",
      product_name: "Professional",
      expiry_date: "July 16, 2025",
      renewal_date: "July 16, 2025",
      joining_date: "June 16, 2025",
      status: "Active",
      order_details: [
        {
          order_detail_id: "684944aac478249dd7105ba7",
          user_id: "684fb262ee4269d96a49e6c0",
          order_id: "684ac4fd7816205d5a399f6e",
          price: "199",
          date: "June 11, 2025",
          quantity: 1,
          subscription_type: "per_month",
          product_name: "Novice",
          product_type: "service",
          product_description:
            "Get full access to the Quantified Ante Learning Academy with expert-led training, daily live-trading sessions, exclusive Discord channels, market sentiment newsletters, simulated trading, our AI assistant Sloan, and lifetime updates with 24/7 support.",
          product_per_month_price: "199",
          product_per_year_price: "1910",
        },
      ],
    },
  ])

  const getSubscriptions = async () => {
    const response = await axios.get("admin-panel/show_subscription/?user_id=684fb262ee4269d96a49e6c0")

    setSubscriptionsData(response.data.order_data)
    console.log(response.data.data)
    try {
    } catch (error) {}
  }

  useEffect(() => {
    getSubscriptions()
  }, [])
  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  20% 20% 20% 20% 20% 20% 20% 20% 20% 25% 20%;
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

  const nodes: SubscriptionsResponse[] = subscriptionsData.map((item, index) => ({
    ...item,
    id: index.toString(),
  }))

  const COLUMNS = [
    {
      label: <TableLabel>Subscription ID</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.subscription_id}</span>
      ),
    },
    {
      label: <TableLabel>User ID</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.user_id}</span>
      ),
    },
    {
      label: <TableLabel>First Name</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.first_name}</span>
      ),
    },
    {
      label: <TableLabel>Last Name</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.last_name}</span>
      ),
    },
    {
      label: <TableLabel>Email</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.email}</span>
      ),
    },
    {
      label: <TableLabel>Product Type</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.product_type}</span>
      ),
    },
    {
      label: <TableLabel>Product Name</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.product_name}</span>
      ),
    },
    {
      label: <TableLabel>Expiry Date</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.expiry_date}</span>
      ),
    },
    {
      label: <TableLabel>Renew Date</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.renewal_date}</span>
      ),
    },
    {
      label: <TableLabel>Joining Date</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.joining_date}</span>
      ),
    },
    {
      label: <TableLabel>Status</TableLabel>,
      renderCell: (item: SubscriptionsResponse) => (
        <span className="text-xs sm:text-sm whitespace-nowrap ">{item.status}</span>
      ),
    },
  ]

  return (
    <div className=" bg-white rounded-2xl w-full p-5 ">
      <div className="overflow-x-auto w-full">
        <CompactTable
          columns={COLUMNS}
          data={{ nodes }}
          layout={{ custom: true, horizontalScroll: true, fixedHeader: true }}
          theme={theme}
        />
      </div>
    </div>
  )
}

export default Users
