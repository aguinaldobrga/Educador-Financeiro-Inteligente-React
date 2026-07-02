import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  variant: 'primary' | 'secondary' | 'ghost'
  icon?: LucideIcon
}

const baseClass = 'flex cursor-pointer justify-center items-center gap-2 rounded-md px-4 py-3 text-sm font-medium transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80';

const variantClass = {
  primary: 'bg-primary text-primary-foreground font-semebold rouded-xl',
  secondary: 'bg-secondary-button border border-border rouded-3xl',
  ghost: 'rouded-lg text-foreground'
}


export function Button({ 
  variant, 
  className,
  icon: Icon,
  children,
  ...props

}: ButtonProps){
  return (
    <button {...props} className={[baseClass, variantClass[variant], className].join(' ')}>
      {Icon && <Icon size={20} />}
      { children }
    </button>
  )
}