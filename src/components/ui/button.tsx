import React from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles = 'app-btn'

    const variantStyles = {
      default: 'app-btn-primary',
      destructive: 'app-btn-danger',
      outline: 'app-btn-outline',
      secondary: 'app-btn-outline',
      ghost: 'app-btn-ghost',
      link: 'app-btn-link',
    }

    const sizeStyles = {
      default: 'app-btn-md',
      sm: 'app-btn-sm',
      lg: 'app-btn-lg',
      icon: 'app-btn-icon',
      'icon-sm': 'app-btn-icon-sm',
    }

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
