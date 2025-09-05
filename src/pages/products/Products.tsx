import { getTheme } from "@table-library/react-table-library/baseline"
import { CompactTable } from "@table-library/react-table-library/compact"
import { useTheme } from "@table-library/react-table-library/theme"
import { useEffect, useState } from "react"

import { TableLabel } from "../subscriptions/Subscriptions"

import axios from "@/lib/axios"

interface Product {
  prod_id: string
  prod_name: string
  product_type: string
  product_description: string
  product_per_month_price: null | string
  product_per_year_price: null | string
  product_image: string
}

const Products = () => {
  const [Products, setProducts] = useState<Array<Product>>([
    {
      prod_id: "6821c81b6ad41dfa80ffc578",
      prod_name: "HTF Power of Three Indicator by Quantified Ante",
      product_type: "items",
      product_description:
        "The HTF Power of Three Indicator helps traders align lower timeframe entries with institutional market phases on higher timeframes. Built around the Accumulation, Manipulation, and Distribution model, this tool tracks key behavioral shifts that often precede major moves in the market. By identifying these phases clearly on higher timeframes, traders can better time their trades with the broader market structure, improving precision, narrative alignment, and confidence in execution.",
      product_per_month_price: null,
      product_per_year_price: null,
      product_image:
        "https://Quantified-Ante.b-cdn.net/Products-Images/quantified-ante-proprietary-indicators-htf-power-of-three-indicator-by-quantified-ante-cart-product-cover.png",
    },
    {
      prod_id: "6821c9a16ad41dfa80ffc582",
      prod_name: "Smart Money Concepts and Liquidity Swings by Quantified Ante",
      product_type: "items",
      product_description:
        "Our Smart Money Concepts & Liquidity Swings Indicator is a highly effective tool engineered to help traders align their strategies with true institutional order flow. By automatically identifying critical shifts in market structure, strategic liquidity grabs, and key swing points, this indicator clearly reveals how Smart Money navigates price action, providing you with high-probability trade setups. It dynamically tracks essential higher highs, lower lows, confirmed break-of-structure (BOS), and precise change-of-character (CHoCH) levels, ensuring you stay ahead of significant market moves and capitalize on institutional footprints.",
      product_per_month_price: null,
      product_per_year_price: null,
      product_image:
        "https://Quantified-Ante.b-cdn.net/Products-Images/quantified-ante-proprietary-indicators-smart-money-concepts-and-liquidity-swings-by-quantified-ante-cart-product-cover.png",
    },
    {
      prod_id: "6821c5f66ad41dfa80ffc573",
      prod_name: "Professional",
      product_type: "service",
      product_description:
        "Professional Membership includes access to an expanded suite of elite-level tools, including over 15 private indicators, and advanced training to accelerate your trading edge. It builds on everything included in the Novice Membership, along with direct access to the proprietary Exploit Trading Strategy. You'll also receive 8 hours of personalized 1-on-1 Trade Execution Training and entry into exclusive Professional Channels within the Quantified Ante Discord Server for mentorship and in-depth discussion.",
      product_per_month_price: "499",
      product_per_year_price: "4790",
      product_image:
        "https://Quantified-Ante.b-cdn.net/Products-Images/quantified-ante-professional-membership-cart-product-cover.png",
    },
    {
      prod_id: "6821c5a56ad41dfa80ffc572",
      prod_name: "Novice",
      product_type: "service",
      product_description:
        "Novice Membership includes access to Quantified Ante’s core trading tools, training, and community resources. This membership unlocks the complete Core Curriculum and Training inside the Quantified Ante Learning Academy, along with access to the Core Four Plus Indicator and Predictive Application featuring multi-broker integration. You'll access the AI-enhanced Neura Journal to track and reflect on trades more effectively, and stay connected through our private Members-Only Discord channels. You’ll also receive the Weekly Market Sentiments newsletter, join Daily Live-Trading Sessions with Head Traders, and get Weekly Top-Down Market Overviews from our analysts.",
      product_per_month_price: "199",
      product_per_year_price: "1910",
      product_image:
        "https://Quantified-Ante.b-cdn.net/Products-Images/quantified-ante-novice-membership-cart-product-cover.png",
    },
    {
      prod_id: "6821c6d96ad41dfa80ffc575",
      prod_name: "Algorithmic Moves Indicator by Quantified Ante",
      product_type: "items",
      product_description:
        "Our Algorithmic Moves Indicator maps Interbank Price Delivery with precision, helping traders identify high-probability turning points using the IPDA framework. Built on the proprietary Interbank Price Delivery Algorithm (IPDA), this tool highlights Fractal IPDA Time Windows and outlines Standard Deviations at market extremes, revealing hidden structure behind algorithmic price behavior. It’s designed for Smart Money Concept traders who want to anticipate price delivery timing and reversal zones with greater clarity and confidence.",
      product_per_month_price: null,
      product_per_year_price: null,
      product_image:
        "https://Quantified-Ante.b-cdn.net/Products-Images/quantified-ante-proprietary-indicators-algorithmic-moves-indicator-by-quantified-ante-cart-product-cover.png",
    },
  ])

  const getProducts = async () => {
    const response = await axios.get("admin-panel/show_products")

    setProducts(response.data.data)
    console.log(response.data.data)
    try {
    } catch (error) {}
  }

  useEffect(() => {
    getProducts()
  }, [])

  const nodes = Products.map((current, index) => {
    return {
      ...current,
      id: index.toString(),
    }
  })

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns:  25% 50% 25% 100% 25% 25%;
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

  const COLUMNS = [
    {
      label: <TableLabel>Product ID</TableLabel>,
      renderCell: (item: Product) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.prod_id}</span>
      ),
    },
    {
      label: <TableLabel>Product Name</TableLabel>,
      renderCell: (item: Product) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.prod_name}</span>
      ),
    },
    {
      label: <TableLabel>Product Type</TableLabel>,
      renderCell: (item: Product) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.product_type}</span>
      ),
    },
    {
      label: "Product Descriptions",
      renderCell: (item: Product) => item.product_description,
    },
    {
      label: <TableLabel>Product Price/month</TableLabel>,
      renderCell: (item: Product) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.product_per_month_price}</span>
      ),
    },
    {
      label: <TableLabel>Product Price/year</TableLabel>,
      renderCell: (item: Product) => (
        <span className="text-xs sm:text-sm whitespace-nowrap">{item.product_per_year_price}</span>
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

export default Products
