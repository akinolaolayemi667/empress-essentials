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
    'bg-ink text-canvas border border-ink hover:-translate-y-0.5 hover:bg-ink-secondary focus-visible:outline-burgundy',
  secondary:
    'bg-transparent text-ink border-0 border-b border-ink rounded-none px-0 hover:border-burgundy hover:text-burgundy',
  ghost:
    'bg-transparent text-ink-secondary hover:text-ink border border-transparent',
  link: 'bg-transparent text-ink underline-offset-[6px] hover:underline px-0 py-0 h-auto border-0',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-5 text-caption tracking-[0.18em]',
  md: 'min-h-11 px-7 text-caption tracking-[0.2em]',
  lg: 'min-h-12 px-9 text-small tracking-[0.2em]',
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
          'inline-flex items-center justify-center gap-2.5 font-body font-medium uppercase transition-[color,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
          variant === 'primary' || variant === 'ghost' ? sizeClasses[size] : null,
          variant === 'secondary' && 'py-2 text-caption tracking-[0.2em]',
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
