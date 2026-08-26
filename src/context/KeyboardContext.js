import { createContext, useContext } from 'react'

export const KeyboardContext = createContext({
  litKeys: {},
  triggerCascade: () => {},
  triggerWave: () => {},
  triggerAmbient: () => {},
  isBookingOpen: false,
  openBookingModal: () => {},
  closeBookingModal: () => {},
  isChatOpen: false,
  openChatModal: () => {},
  closeChatModal: () => {},
})

export const useKeyboardContext = () => useContext(KeyboardContext)

