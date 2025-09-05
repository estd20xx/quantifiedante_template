import React from 'react';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonType = 'button' | 'submit' | 'reset';
type ButtonVariant = 'primary' | 'secondary' | 'filled' | 'outlined' | 'warning';

interface CustomisedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: ButtonType;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

// ✅ Size Classes with Responsive Consideration
const sizeClasses: Record<ButtonSize, string> = {
  small: 'px-3 py-2 text-xs sm:text-sm h-[36px] sm:h-[40px] min-w-[80px]',
  medium: 'px-3 sm:px-5 py-1 text-sm sm:text-base h-[44px] sm:h-[48px] min-w-[100px]',
  large: 'px-6 sm:px-8 py-3 text-base sm:text-lg h-[52px] sm:h-[56px] min-w-[120px]',
};

// ✅ Variant Classes for Different Styles
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg',
  secondary: 'bg-white text-pink-500 border border-pink-500 hover:bg-pink-50 font-medium rounded-lg',
  filled: 'bg-[#5585FF] hover:bg-[#3f6be0] text-white font-medium rounded-lg',
  outlined: 'bg-white text-[#5585FF] border border-[#5585FF] hover:bg-[#f5f7ff] font-medium rounded-lg',
  warning: 'bg-[#F2F2F2] text-[#262626] font-semibold rounded-lg hover:bg-gray-200',
};

const CustomisedButton: React.FC<CustomisedButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  size = 'medium',
  variant = 'filled',
}) => {
  const finalSize = sizeClasses[size];
  const finalVariant = variantClasses[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        transition-all duration-200 ease-in-out 
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${finalSize} ${finalVariant} ${className}
      `}
    >
      {children}
    </button>
  );
};

export default CustomisedButton;
