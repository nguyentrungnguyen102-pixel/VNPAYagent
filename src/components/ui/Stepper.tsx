import { cn } from '../../utils/cn'
import { Check } from 'lucide-react'

interface Step {
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
              i < currentStep ? 'bg-vnpay-blue text-white' : i === currentStep ? 'bg-vnpay-blue text-white ring-4 ring-vnpay-blue/20' : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
            )}>
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={cn('text-xs mt-1 font-medium whitespace-nowrap', i <= currentStep ? 'text-vnpay-blue' : 'text-gray-400')}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn('flex-1 h-0.5 mx-2 mt-[-14px]', i < currentStep ? 'bg-vnpay-blue' : 'bg-gray-200 dark:bg-gray-700')} />
          )}
        </div>
      ))}
    </div>
  )
}
