import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  error?: string
  hint?: string
  optional?: boolean
}

/** Underlined editorial input with label, hint, and inline error */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField({ label, error, hint, optional, className, ...props }, ref) {
    const id = useId()
    const messageId = `${id}-message`
    const message = error ?? hint

    return (
      <div className={className}>
        <label htmlFor={id} className="editorial-label flex items-baseline gap-2 text-ink">
          {label}
          {optional ? (
            <span className="normal-case tracking-normal text-muted">(optional)</span>
          ) : null}
        </label>
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'mt-2 min-h-12 w-full border-b bg-transparent text-body-lg text-ink outline-none transition-colors duration-300 placeholder:text-muted/70 focus:border-burgundy',
            error ? 'border-burgundy' : 'border-border',
          )}
          {...props}
        />
        {message ? (
          <p
            id={messageId}
            className={cn('mt-2 text-small', error ? 'text-burgundy' : 'text-muted')}
          >
            {message}
          </p>
        ) : null}
      </div>
    )
  },
)
