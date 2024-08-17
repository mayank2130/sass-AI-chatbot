"use client"
import React, { useState, createContext, useContext, ReactNode } from 'react'

type AuthContextType = {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const initialValues: AuthContextType = {
  currentStep: 1,
  setCurrentStep: () => undefined,
}

const AuthContext = createContext<AuthContextType>(initialValues)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialValues.currentStep)
  
  const value: AuthContextType = {
    currentStep,
    setCurrentStep,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuthContextHook(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}