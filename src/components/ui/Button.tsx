import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-canvas hover:bg-wine focus-visible:outline-wine border border-ink',
  secondary:
    'bg-transparent text-ink border border-ink hover:bg-ink hover:text-canvas',
  ghost:
    'bg-transparent text-ink-soft hover:text-ink hover:bg-stone/30 border border-transparent',
  link: 'bg-transparent text-ink underline-offset-4 hover:underline px-0 py-0 h-auto border-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-xs tracking-[0.14em]',
  md: 'h-11 px-6 text-xs tracking-[0.16em]',
  lg: 'h-12 px-8 text-sm tracking-[0.18em]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      type = 'button',
      disabled,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-body font-medium uppercase transition-colors duration-300 disabled:pointer-events-none disabled:opacity-40',
          variant !== 'link' && sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    )
  },
)
