import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

const STORAGE_KEY = 'ai_chef_data'

const defaultState = {
  photo: null,
  name: '',
  agreedToTerms: false,
  q1: null,
  q2: null,
  q3: null,
  persona: null,
  chefId: null,
}

export function AppProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState
    } catch {
      return defaultState
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  function update(partial) {
    setData(prev => ({ ...prev, ...partial }))
  }

  function reset() {
    setData(defaultState)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AppContext.Provider value={{ data, update, reset }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
