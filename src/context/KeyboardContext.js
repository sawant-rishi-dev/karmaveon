import { createContext, useContext } from 'react'

export const KeyboardContext = createContext({
  litKeys: {},
  triggerCascade: () => {},
  triggerWave: () => {},
  triggerAmbient: () => {},
})

export const useKeyboardContext = () => useContext(KeyboardContext)
