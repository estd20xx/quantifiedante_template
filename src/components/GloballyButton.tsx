import React from "react"

export type ButtonSize = "small" | "medium" | "large"
type ButtonType = "button" | "submit" | "reset"
type ButtonVariant = "solid" | "ghost"

interface GloballyButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: ButtonType
  disabled?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

const sizeClasses: Record<ButtonSize, string> = {
  small: "px-3 py-2 text-sm rounded-md",
  medium: "px-6 py-2 text-base rounded-md",
  large: "px-9 py-3 text-lg rounded-md",
}

const variantClasses: Record<ButtonVariant, string> = {
  solid: `
    bg-pinkMilkish text-white
    hover:bg-pinkMilkishHover
    active:bg-pinkMilkishActive
    disabled:opacity-50 disabled:bg-pinkMilkishDisable
  `,
  ghost: `
    bg-transparent text-white border border-white
    hover:bg-white hover:text-black
    active:bg-whiteActive active:text-black active:border border-whiteActive
    disabled:bg-transparent disabled:text-white/30 disabled:border-white/30
  `,
}

const GloballyButton: React.FC<GloballyButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  size = "medium",
  variant = "solid",
}) => {
  const finalSize = sizeClasses[size]
  const finalVariant = variantClasses[variant]

  return (
    <button
      className={`
        rounded-lg transition-all
        ${finalSize} ${finalVariant} ${className}
      `}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default GloballyButton
