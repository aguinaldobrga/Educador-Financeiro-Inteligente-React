import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { type SimulationFormData, simulationFormSteps } from '@/data/simulation';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';

import { FormStep } from "@/components/features/Simulation/FormStep";
import { StepProgress } from './Progress'

export const SimulationForm = () => {
  const { saveFormData } = useSimulationStorage()
  const navigate = useNavigate()
 

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<SimulationFormData>({
    user: {
      name: '',
      initialBalance: '',
      initialGoalAmount: '',
    },
    income: '',
    expenses: '',
    debts: '',
    goalName: '',
    goalAmount: '',
    goalDeadline: '',
  })
  const totalSteps = simulationFormSteps.length
  const currentStep = simulationFormSteps[currentStepIndex]

  const handleNextStep = (value: string) => {
    const stepId = currentStep.id

    let updatedFormData = { ...formData }

    if (
      stepId === 'name' ||
      stepId === 'initialBalance' ||
      stepId === 'initialGoalAmount'
    ) {
      updatedFormData = {
        ...formData,
        user: {
          ...formData.user,
          [stepId === 'name'
            ? 'name'
            : stepId === 'initialBalance'
            ? 'initialBalance'
            : 'initialGoalAmount']: value,
        },
      }
    } else {
      updatedFormData = {
        ...formData,
        [stepId]: value,
      }
    }

    setFormData(updatedFormData)

    if (currentStepIndex + 1 > totalSteps - 1) {
      const newSimulation = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        ...updatedFormData,
      }

      saveFormData(newSimulation)

      void navigate(`/resultado/${newSimulation.id}`)
      return
    }

    setCurrentStepIndex((prev) => prev + 1)
  }

  const handlePreviousStep = () => {
    if (currentStepIndex === 0) {
      return
    }

    setCurrentStepIndex((prev) => prev - 1)
  }

  return (
    <>
      <StepProgress
        currentStep={currentStepIndex + 1}
        totalSteps={totalSteps}
      />
      <FormStep
        key={currentStep.id}
        {...currentStep}
        onBack={handlePreviousStep}
        onNext={handleNextStep}
        hideBackButton={currentStepIndex === 0}
      />
    </>
  )
}