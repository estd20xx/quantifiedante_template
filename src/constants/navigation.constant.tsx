import { ReactComponent as ControlCenter } from "../icons/ControlCenter.svg"
import { ReactComponent as EchoCopier } from "../icons/EchoCopier.svg"
import { ReactComponent as NeuraJournal } from "../icons/NeuraJournal.svg"
import { ReactComponent as Portfolio } from "../icons/PortFolio.svg"
import { ReactComponent as SentiMental } from "../icons/SentiMental.svg"
import { ReactComponent as SimulationVerse } from "../icons/SimulationVerse.svg"
import { ReactComponent as Support } from "../icons/Support.svg"
import { ReactComponent as TradeDesk } from "../icons/TradeDesk.svg"
import { ReactComponent as TrainingIndicator } from "../icons/TradingIndicators.svg"
import { ReactComponent as TrainingAcademy } from "../icons/TT.svg"
import { ReactComponent as AccountCenter } from "../icons/User.svg"
import { navigationStrings } from "../navigationStrings/NavigationStrings"

import { websiteUrl } from "./myapi"

type NavItem = {
  name: string
  icon: React.ReactNode
  path?: string
  pro?: boolean
  novice?: boolean
  elite?: boolean
  isPublic?: boolean
  crossDomain?: boolean
  newTab?: boolean
  subItems?: {
    name: string
    path: string
    pro?: boolean
    novice?: boolean
    elite?: boolean
    crossDomain?: boolean
    newTab?: boolean
  }[]
}

interface NavInterface {
  title: string
  items: Array<NavItem>
}

export const newNavItems: Array<NavInterface> = [
  {
    title: "PREDICTIVE TOOLS",
    items: [
      {
        icon: <ControlCenter />,
        name: "Control Center",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "Active Positions",
            path: navigationStrings.activePositions,
            pro: false,
            novice: false,
            elite: false,
            crossDomain: false,
          },
          {
            name: "Account Connections",
            path: navigationStrings.accountCenter,
            pro: true,
            novice: false,
            elite: false,
          },
          {
            name: "Market Impacts",
            path: navigationStrings.marketImpactCalender,
            pro: false,
            novice: false,
            elite: false,
          },
          // { name: "General Settings", path: "/setting", pro: false, novice: false, elite: false }
        ],
      },
      {
        icon: <NeuraJournal />,
        name: "Neura Journal",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          { name: "Dashboard", path: navigationStrings.main, pro: false, novice: false, elite: false },
          {
            name: "Performance",
            path: navigationStrings.performance,
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Orders", path: navigationStrings.orders, pro: false, novice: false, elite: false },
          {
            name: "Position History",
            path: navigationStrings.positionHistory,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Cash History",
            path: navigationStrings.cashHistory,
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Fills", path: navigationStrings.fills, pro: false, novice: false, elite: false },
          {
            name: "Account Balance History",
            path: navigationStrings.accountBalanceHistory,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Execution Report",
            path: navigationStrings.executionReport,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Accounts P&L",
            path: navigationStrings.accountProfitNLoss,
            pro: false,
            novice: false,
            elite: false,
          },
          // { name: "Order Execution", path: "/order-execution", pro: false },
          // { name: "Final Order Execution", path: "/final-order-execution", pro: false },
          // { name: "Daily Orders", path: "/today-order", pro: false }
          // { name: "User", path: "/user-information", pro: false }
          {
            name: "Sloan Insights",
            path: navigationStrings.slonInsigts,
            pro: true,
            novice: false,
            elite: false,
          },
        ],
      },
      {
        icon: <TradeDesk />,
        name: "Trade Desk",
        path: navigationStrings.tradeDesk,
        pro: true,
        novice: false,
        elite: false,
      },
      {
        icon: <EchoCopier />,
        name: "Echo Copier",
        path: navigationStrings.echoCopier,
        pro: false,
        novice: false,
        elite: true,
      },

      {
        icon: <SimulationVerse />,
        name: "Simulation Verse",
        path: navigationStrings.simulationVerse,
        pro: true,
        novice: false,
        elite: false,
      },
      {
        name: "Trading Indicators",
        icon: <TrainingIndicator />,
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          {
            name: "Currently Active",
            path: navigationStrings.currentlyActive,
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "To Explore", path: navigationStrings.toExplore, pro: false, novice: false, elite: false },
        ],
      },
    ],
  },
  {
    title: "TRAINING PROGRAMS",
    items: [
      {
        name: "Training Academy",
        // path: navigationStrings.trainingAcademy,
        icon: <TrainingAcademy />,
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "All Courses",
            path: navigationStrings.allCourses,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Active Courses",
            path: navigationStrings.activeCourses,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Completed Courses",
            path: navigationStrings.completedCoursed,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Certificates",
            path: navigationStrings.certificate,
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },
  {
    title: "MORE SERVICES",
    items: [
      {
        icon: <Portfolio />,
        name: "Portfolio Management",
        path: "/portfolio-management",
        pro: false,
        novice: true,
        elite: false,
        subItems: [],
      },
      {
        icon: <SentiMental />,
        name: "Sentiment Subscriptions",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "Weekly Top Down",
            path: navigationStrings.weeklyTopDown,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Timely Bytes",
            path: navigationStrings.timelyBytes,
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },

  {
    title: "ACCOUNT MANAGEMENT",
    items: [
      {
        icon: <AccountCenter />,
        name: "Account Center",
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          { name: "Dashboard", path: navigationStrings.dashboard, pro: false, novice: false, elite: false },
          { name: "Orders", path: navigationStrings.accountOrder, pro: false, novice: false, elite: false },
          { name: "Downloads", path: navigationStrings.downloads, pro: false, novice: false, elite: false },
          {
            name: "Subscriptions",
            path: navigationStrings.subscriptions,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Wallets & Addresses",
            path: navigationStrings.wallets,
            pro: false,
            novice: false,
            elite: false,
          },
          // { name: "Message Center", path: "/account/message-center", pro: false, novice: false, elite: false },

          { name: "Gift Cards", path: navigationStrings.giftCard, pro: false, novice: false, elite: false },
          {
            name: "Communication Preferences",
            path: navigationStrings.communicationPreferences,
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Proprietary Indicators",
            path: navigationStrings.proprietaryIndicators,
            pro: false,
            novice: false,
            elite: false,
          },

          {
            name: "Account Settings",
            path: navigationStrings.settings,
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },
  {
    title: "GET SUPPORT",
    items: [
      {
        icon: <Support />,
        name: "Support Center",
        pro: false,
        novice: false,
        elite: false,
        isPublic: true,
        subItems: [
          { name: "Ask Sloan", path: navigationStrings.askSolon, pro: false, novice: false, elite: false },
          { name: "Messages", path: navigationStrings.messages, pro: false, novice: false, elite: false },
          {
            name: "Contact Us",
            path: websiteUrl + "contact-us",
            pro: false,
            novice: false,
            elite: false,
            crossDomain: true,
            newTab: true,
          },
        ],
      },
    ],
  },
]
