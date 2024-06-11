'use client'

import * as React from 'react'

const LOCAL_STORAGE_KEY = 'ollama-model'

interface OllamaContext {
  chosenModelName: string  
  setChosenModelName: (name:string) => void
  isLoading: boolean
}

const OllamaContext = React.createContext<OllamaContext | undefined>(
  undefined
)

export function useOllamaModel() {
  const context = React.useContext(OllamaContext)
  if (!context) {
    throw new Error('useOllamaModel must be used within a OllamaProvider')
  }
  return context
}

interface OllamaModelProviderProps {
  children: React.ReactNode
}

export function OllamaProvider({ children }: OllamaModelProviderProps) {
  const [chosenModelName, setChosenModelName] = React.useState('codestral:latest')
  const [isLoading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value) {
      setChosenModelName(JSON.parse(value))
    }
    setLoading(false)
  }, [])


  if (isLoading) {
    return null
  }

  return (
    <OllamaContext.Provider
      value={{ chosenModelName, setChosenModelName, isLoading }}
    >
      {children}
    </OllamaContext.Provider>
  )
}
