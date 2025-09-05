declare module "*.svg" {
  import React = require("react")
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module "*.jsx" {
  import React from 'react'
  const Component: React.ComponentType<any>
  export default Component
}

declare module "*.js" {
  const content: any
  export default content
}

declare module "../MobileFilterDrawer" {
  import React from 'react'
  
  interface MobileFilterDrawerProps {
    isOpen: boolean
    onClose: () => void
    onApplyFilters?: () => void
    onClearFilters?: () => void
  }
  
  const MobileFilterDrawer: React.FC<MobileFilterDrawerProps>
  export default MobileFilterDrawer
}

declare module "../trade_locker/BrokersAccount" {
  export interface BrokersAccountResponse {
    user_brokers_props_accounts: Array<{
      Unique_id?: string
      unique_id?: string
      Name?: string
    }>
  }
  
  export const BrokersAccount: (apiAccessToken: string) => Promise<BrokersAccountResponse | null>
}
