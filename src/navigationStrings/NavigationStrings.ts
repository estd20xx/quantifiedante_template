interface NavigationStringsInterface {
  initialSetup: string
  activePositions: string
  accountCenter: string
  marketImpactCalender: string
  main: string
  performance: string
  orders: string
  accountOrder: string
  positionHistory: string
  cashHistory: string
  fills: string
  accountBalanceHistory: string
  executionReport: string
  accountProfitNLoss: string
  slonInsigts: string

  tradeDesk: string

  trainingAcademy: string
  allCourses: string
  activeCourses: string
  completedCoursed: string
  certificate: string

  echoCopier: string
  simulationVerse: string
  dashboard: string
  orderDetails: string
  subscriptionDetailsNew: string
  downloads: string
  subscriptions: string
  subscriptionsDetails: string
  wallets: string
  addNewPaymentMethods: string
  giftCard: string
  changePaymentMethods: string
  billingShippingAddress: string
  productRefunds: string
  productCancel: string
  productExchange: string
  settings: string
  updateEmail: string
  updatePhoneNumber: string
  proprietaryIndicators: string
  communicationPreferences: string
  changePaymentMethod: string

  supportCenter: string
  askSolon: string
  messages: string
  contactUs: string

  // TODO [ To Create ] but not in siteMap Green or cyan
  currentlyActive: string
  toExplore: string
  portfolioManagament: string
  sentiMentSubscriptions: string
  weeklyTopDown: string
  timelyBytes: string
  newDashboard: string

  // Admins
  adminUsers: string
  adminSubscriptions: string
  adminOrders: string
  adminProducts: string
}

export const navigationStrings: NavigationStringsInterface = {
  initialSetup: "/initial-setup",
  activePositions: "/control-center/active-positions",
  accountCenter: "/control-center/account-connections",
  marketImpactCalender: "/control-center/market-impacts",
  main: "/neura-journal/dashboard",
  performance: "/neura-journal/performance",
  orders: "/neura-journal/orders",
  accountOrder: "/account-center/orders",
  positionHistory: "/neura-journal/position-history",
  cashHistory: "/neura-journal/cash-history",
  fills: "/neura-journal/fills",
  accountBalanceHistory: "/neura-journal/account-balance-history",
  executionReport: "/neura-journal/execution-report",
  accountProfitNLoss: "/neura-journal/accounts-profit-and-loss",
  slonInsigts: "/neura-journal/sloan-insights",
  tradeDesk: "/trade-desk",

  trainingAcademy: "/training-academy",
  allCourses: "/training-academy/courses",
  activeCourses: "/training-academy/active-courses",
  completedCoursed: "/training-academy/completed-courses",
  certificate: "/training-academy/certificates",

  echoCopier: "/echo-copier",
  simulationVerse: "/simulation-verse",
  dashboard: "/account-center/dashboard",
  orderDetails: "/account-center/order-details/:id",
  subscriptionDetailsNew: "/account-center/subscriptions-detail/:id",
  downloads: "/account-center/downloads",
  subscriptions: "/account-center/subscriptions",
  subscriptionsDetails: "/account-center/subscriptions-details",
  wallets: "/account-center/wallets-addresses",
  addNewPaymentMethods: "/account-center/wallets/payment-methods/add-new-payment-method",
  giftCard: "/account-center/gift-cards",
  changePaymentMethods: "/account-center/change-payment-method",
  billingShippingAddress: "/account-center/billing-shipping-address",
  productRefunds: "/account-center/product-refund",
  productCancel: "/account-center/product-cancel",
  productExchange: "/account-center/product-exchange",
  settings: "/account-center/account-settings",
  updateEmail: "/account-center/updated-email",
  updatePhoneNumber: "/account-center/updated-phone-number",
  proprietaryIndicators: "/account-center/proprietary-indicators",
  communicationPreferences: "/account-center/communication-preferences",

  supportCenter: "/support-center",
  askSolon: "/support-center/ask-sloan",
  messages: "/support-center/messages", // Present in siteMap
  contactUs: "/support-center/contact-us",

  currentlyActive: "/trading-indicators/currently-active",
  toExplore: "/trading-indicators/to-explore",

  portfolioManagament: "/portfolio-management",
  sentiMentSubscriptions: "/sentiment-subscriptions",
  weeklyTopDown: "/sentiment-subscriptions/weekly-top-down",
  timelyBytes: "/sentiment-subscriptions/timely-bytes",
  newDashboard: "/new-dashboard/dashboard",

  adminUsers: "/admin/users",
  adminSubscriptions: "/admin/subscriptions",
  adminOrders: "/admin/orders",
  adminProducts: "/admin/products",
  changePaymentMethod: "/account-center/payment-method",
}

interface NavigationStringInterfaceWebsite {
  smartMoney: string
  predictiveApplicationTradingControlCenter: string
  neuraTradeJournal: string
  echoTradeCopier: string
  simulationVerseBuilder: string
  liveTrading: string
  timelyMarketInsights: string
  whatTradersSay: string
  passwordReset: string
  passwordResetSeeInboxOTP: string
  passwordUpdated: string
  orderPaymentTypeValidation: string
  orderConfirmThankYou: string
  coreFourIndicator: string
  relativeVolumeRatioIndicator: string
  fairValueGapIndicator: string
  algorithmsMovesIndicator: string
  marketSessionIndicator: string
  keyLevelsIndicator: string
  hftPowerThreeIndicator: string
  smartMoneyConceptsAndLiquiditySwingsIndicator: string
  ictMacrosIndicator: string
  ictPropulsionBlockIndicator: string
  ictConceptIndicator: string
  ictSilverBulletIndicator: string
  ictUnicornIndicator: string
  threeDriveIndicator: string
  aboutUs: string
  productNPricing: string
  trainingAcademy: string
  discordCommunity: string
}

export const navigationStringWebsite: NavigationStringInterfaceWebsite = {
  discordCommunity: "discord-community",
  trainingAcademy: "smart-money-training-academy",
  productNPricing: "products-services-pricing",
  smartMoney: "smart-money-trading-indicators",
  predictiveApplicationTradingControlCenter: "predictive-trading-application-control-center",
  neuraTradeJournal: "neura-trade-journal",
  echoTradeCopier: "echo-trade-copier",
  simulationVerseBuilder: "simulation-verse-backtesting-strategy-builder",
  liveTrading: "live-trading-futures-crypto-forex-options-equities",
  timelyMarketInsights: "timely-market-insights",
  whatTradersSay: "what-traders-investors-say-about-quantifiedante",
  passwordReset: "password-reset",
  passwordResetSeeInboxOTP: "password-reset-see-inbox-for-one-time-passcode",
  passwordUpdated: "password-successfully-updated",
  orderPaymentTypeValidation: "order-payment-type-validation",
  orderConfirmThankYou: "order-confirmed-thank-you",
  coreFourIndicator: "predictive-indicator/core-four-plus-by-quantified-ante",
  relativeVolumeRatioIndicator: "predictive-indicator/relative-volume-ratios-by-quantified-ante",
  fairValueGapIndicator: "predictive-indicator/fair-value-gap-by-quantified-ante",
  algorithmsMovesIndicator: "predictive-indicator/algorithmic-moves-by-quantified-ante",
  marketSessionIndicator: "predictive-indicator/market-sessions-by-quantified-ante",
  keyLevelsIndicator: "predictive-indicator/key-levels-by-quantified-ante",
  hftPowerThreeIndicator: "predictive-indicator/htf-power-of-three-by-quantified-ante",
  smartMoneyConceptsAndLiquiditySwingsIndicator:
    "predictive-indicator/smart-money-concepts-and-liquidity-swings-by-quantified-ante",
  ictMacrosIndicator: "predictive-indicator/ict-macros-by-quantified-ante",
  ictPropulsionBlockIndicator: "predictive-indicator/ict-propulsion-blocks-by-quantified-ante",
  ictConceptIndicator: "predictive-indicator/ict-concepts-by-quantified-ante",
  ictSilverBulletIndicator: "predictive-indicator/ict-silver-bullet-by-quantified-ante",
  ictUnicornIndicator: "predictive-indicator/ict-unicorn-by-quantified-ante",
  threeDriveIndicator: "predictive-indicator/three-drive-by-quantified-ante",
  aboutUs: "about-us",
}
