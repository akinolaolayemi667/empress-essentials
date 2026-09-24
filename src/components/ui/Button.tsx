import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import { cn } from '@/lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

type SharedProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
  children?: ReactNode
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined
  }

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

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

function buttonClassName({
  variant,
  size,
  fullWidth,
  className,
}: {
  variant: ButtonVariant
  size: ButtonSize
  fullWidth: boolean
  className?: string
}) {
  return cn(
    'inline-flex items-center justify-center gap-2.5 font-body font-medium uppercase transition-[color,background-color,border-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
    variant === 'primary' || variant === 'ghost' ? sizeClasses[size] : null,
    variant === 'secondary' && 'py-2 text-caption tracking-[0.2em]',
    variantClasses[variant],
    fullWidth && 'w-full',
    className,
  )
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref,
  ) {
    const classes = buttonClassName({ variant, size, fullWidth, className })
    const content = (
      <>
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </>
    )

    if ('href' in props && props.href) {
      const { href, ...rest } = props
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...rest}
        >
          {content}
        </a>
      )
    }

    const buttonProps = props as ButtonAsButton
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type={buttonProps.type ?? 'button'}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    )
  },
)
