import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const CloseButton = ({
  onClose,
  parentClass,
  iconClass,
  size = 12,
}: Readonly<{ parentClass?: string; iconClass?: string; onClose?: () => void; size?: number }>) => {
  return (
    <button className={cn("py-2 flex gap-2 text-xs items-center text-black", parentClass)} onClick={onClose}>
      Close
      <p className={cn("p-1 border border-black rounded-md text-black", iconClass)}>
        <X size={size} />
      </p>
    </button>
  )
}

export default CloseButton
