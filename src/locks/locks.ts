interface PerLocksInterface {
  img: {
    lightMode: {
      lock: string
      featureUnavailable: string
    }
    darkMode: {
      lock: string
      featureUnavailable: string
    }
  }
  message: string
}

interface LockInterface {
  controlCenter: PerLocksInterface
  neuraJournal: PerLocksInterface
  tradeDesk: PerLocksInterface
  echoCopier: PerLocksInterface
  simulationVerse: PerLocksInterface
  tradingIndicators: PerLocksInterface
  trainingAcademy: PerLocksInterface
  portfolioManagement: PerLocksInterface
  sentimentSubscriptions: PerLocksInterface
  accountCenter: PerLocksInterface
  supportCenter: PerLocksInterface
}

export const featureLockData: LockInterface = {
  controlCenter: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-control-center-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-control-center-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-control-center-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-control-center-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Control Center. Depending on the membership level you select, different features are presented to you. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  neuraJournal: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-neura-journal-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-neura-journal-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-neura-journal-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-neura-journal-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Neura Journal. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  tradeDesk: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-trade-desk-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-trade-desk-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-trade-desk-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-trade-desk-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Trade Desk. To access this feature, simply upgrade your  membership plan to Professional or Elite Membership Plan.`,
  },
  echoCopier: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-echo-copier-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-echo-copier-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-echo-copier-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-echo-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Echo Copier. To access this feature, simply upgrade your  membership plan to Elite Membership Plan.`,
  },
  simulationVerse: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-simulation-verse-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-simulation-verse-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-simulation-verse-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-simulation-verse-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Simulation Verse. To access this feature, simply upgrade your  membership plan to Professional or Elite Membership Plan.`,
  },
  tradingIndicators: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-proprietary-indicators-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-proprietary-indicators-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-proprietary-indicators-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-proprietary-indicators-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Proprietary Indicators. Depending on the membership level you select, different features are presented to you. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  trainingAcademy: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-training-academy-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-training-academy-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-training-academy-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-training-academy-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Training Academy. Depending on the membership level you select, different features are presented to you. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  portfolioManagement: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-portfoio-management-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-portfoio-management-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-portfoio-management-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-portfoio-management-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Portfolio Management. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  sentimentSubscriptions: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-sentiments-and-timely-updates-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-sentiments-and-timely-updates-is-under-development-badge-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-sentiments-and-timely-updates-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-sentiments-and-timely-updates-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Sentiment Subscriptions. Depending on the membership level you select, different features are presented to you. Choose the Membership level that best suits your current needs, from Novice, to Professional, to Elite.`,
  },
  accountCenter: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-account-center-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-account-center-is-under-development-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-account-center-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-account-center-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Quantified Ante Account Center. To access this feature, simply upgrade your  membership plan to [Novice/Professional/Elite]  Membership Plan.`,
  },
  supportCenter: {
    img: {
      lightMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-support-center-unavailable-access-badge-light-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-support-center-is-under-development-light-mode.svg",
      },
      darkMode: {
        lock: "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-support-center-unavailable-access-badge-dark-mode.svg",
        featureUnavailable:
          "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock/quantified-ante-support-center-is-under-development-badge-dark-mode.svg",
      },
    },
    message: `You don't have access to the Support Center. To access this feature, simply upgrade your  membership plan to [Novice/Professional/Elite]  Membership Plan.`,
  },
}
