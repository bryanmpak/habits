import { create } from "zustand"

type AccountLinkStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAccountLink = create<AccountLinkStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true })
  },
  onClose: () => set({ isOpen: false }),
}))
