"use client"

import { useEffect, useState } from "react"
import AccountLinkModal from "./account-link-modal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AccountLinkModal />
    </>
  )
}

export default ModalProvider
