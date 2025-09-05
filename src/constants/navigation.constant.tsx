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
            path: "#",
            pro: false,
            novice: false,
            elite: false,
            crossDomain: false,
          },
          {
            name: "Account Connections",
            path: "#",
            pro: true,
            novice: false,
            elite: false,
          },
          {
            name: "Market Impacts",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
      {
        icon: <NeuraJournal />,
        name: "Neura Journal",
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          { name: "Dashboard", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Performance",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Orders", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Position History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Cash History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "Fills", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Account Balance History",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Execution Report",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Accounts P&L",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Sloan Insights",
            path: "#",
            pro: true,
            novice: false,
            elite: false,
          },
        ],
      },
      {
        icon: <TradeDesk />,
        name: "Trade Desk",
        path: "#",
        pro: true,
        novice: false,
        elite: false,
      },
      {
        icon: <EchoCopier />,
        name: "Echo Copier",
        path: "#",
        pro: false,
        novice: false,
        elite: true,
      },

      {
        icon: <SimulationVerse />,
        name: "Simulation Verse",
        path: "#",
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
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          { name: "To Explore", path: "#", pro: false, novice: false, elite: false },
        ],
      },
    ],
  },
  {
    title: "TRAINING PROGRAMS",
    items: [
      {
        name: "Training Academy",
        icon: <TrainingAcademy />,
        pro: false,
        novice: true,
        elite: false,
        subItems: [
          {
            name: "All Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Active Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Completed Courses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Certificates",
            path: "#",
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
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Timely Bytes",
            path: "#",
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
          { name: "Dashboard", path: "#", pro: false, novice: false, elite: false },
          { name: "Orders", path: "#", pro: false, novice: false, elite: false },
          { name: "Downloads", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Subscriptions",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Wallets & Addresses",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },

          { name: "Gift Cards", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Communication Preferences",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
          {
            name: "Proprietary Indicators",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },

          {
            name: "Account Settings",
            path: "#",
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
          { name: "Ask Sloan", path: "#", pro: false, novice: false, elite: false },
          { name: "Messages", path: "#", pro: false, novice: false, elite: false },
          {
            name: "Contact Us",
            path: "#",
            pro: false,
            novice: false,
            elite: false,
          },
        ],
      },
    ],
  },
]
