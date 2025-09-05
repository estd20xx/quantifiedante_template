import { getTheme } from "@table-library/react-table-library/baseline"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { useEffect, useState } from "react"

import axios from "@/lib/axios"
import { TableLabel } from "../subscriptions/Subscriptions"

interface Order {
  order_id: string
  total_tax: number
  shipping_address_id: string
  billing_address_id: string
  user_id: string
  payment_mode: string
  date: string
  payment_status: string
  order_status: string
  shipping_cost: number
  discount: number
}

const Orders = () => {
  const [orders, setOrders] = useState<Array<Order>>([
    {
      order_id: "684944aac478249dd7105ba6",
      total_tax: 0,
      shipping_address_id: "68493b722a99fcdbf83ecdf6",
      billing_address_id: "68493b782a99fcdbf83ecdf7",
      user_id: "68493a38d22bf0f1806d1016",
      payment_mode: "stripe",
      date: "June 11, 2025",
      payment_status: "paid",
      order_status: "Deliver",
      shipping_cost: 0,
      discount: 0,
    },
  ])

  const getOrders = async () => {
    const response = await axios.get("admin-panel/show_order/?order_id=684944aac478249dd7105ba6")

    setOrders(response.data.order_data)
    console.log(response.data.data)
    try {
    } catch (error) {}
  }

  useEffect(() => {
    getOrders()
  }, [])

  const nodes = orders.map((current) => {
    return {
      ...current,
      id: current.order_id,
    }
  })

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  25% 15% 20% 20% 20% 20% 20% 20% 20% 10% 10%;
      `,
      Cell: `
    padding: 16px 8px;
  text-align: left;
  white-space: nowrap;     
  overflow: hidden;
    `,
      HeaderCell: `
      padding: 16px 8px;
      border-bottom: 1px solid #D9D9D9;
      border-top: 1px solid #D9D9D9;
    `,
    },
  ])

  const COLUMNS = [
    {
      label: <TableLabel>Order ID</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.order_id}</span>
      ),
    },
    {
      label: <TableLabel>Total Tax</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.total_tax}</span>
      ),
    },
    {
      label: <TableLabel>Shipping Address ID</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.shipping_address_id}</span>
      ),
    },
    {
      label: <TableLabel>Billing Address Id</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.billing_address_id}</span>
      ),
    },
    {
      label: <TableLabel>User ID</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.user_id}</span>
      ),
    },
    {
      label: <TableLabel>Payment Mode</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.payment_mode}</span>
      ),
    },
    {
      label: <TableLabel>Date</TableLabel>,
      renderCell: (item: Order) => <span className="text-xs sm:text-sm whitespace-nowrap">{item.date}</span>,
    },
    {
      label: <TableLabel>Payment Status</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.payment_status}</span>
      ),
    },
    {
      label: <TableLabel>Order Status</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.order_status}</span>
      ),
    },
    {
      label: <TableLabel>Shipping Cost</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.shipping_cost}</span>
      ),
    },
    {
      label: <TableLabel>Discount</TableLabel>,
      renderCell: (item: Order) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.discount}</span>
      ),
    },
  ]

  return (
    <div className=" bg-white rounded-2xl w-full p-5 max-w-full">
      <CompactTable
        columns={COLUMNS}
        data={{ nodes }}
        layout={{ custom: true, horizontalScroll: true }}
        theme={theme}
      />
    </div>
  )
}

export default Orders

// custom?: boolean;
//     horizontalScroll?: boolean;
//     fixedHeader?: boolean;
//     isDiv?: boolean;
//     resizedLayout?: string;
//     onLayoutChange?: (grid: string) => void;
