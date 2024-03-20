"use client"

import * as React from "react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/InputOTP"

type InputOTPControlledProps = {
  otpValue: string
  setOtpValue: React.Dispatch<React.SetStateAction<string>>
}

export function InputOTPControlled({
  otpValue,
  setOtpValue,
}: InputOTPControlledProps) {
  function FakeDash() {
    return (
      <div className='flex w-10 justify-center items-center'>
        <div className='w-3 h-[2px] rounded-full bg-accent-foreground/20' />
      </div>
    )
  }

  return (
    <InputOTP
      maxLength={6}
      value={otpValue}
      onChange={(value) => setOtpValue(value)}
      render={({ slots }) => (
        <InputOTPGroup>
          {slots.slice(0, 3).map((slot, index) => (
            <InputOTPSlot key={index} {...slot} />
          ))}

          <FakeDash />

          {slots.slice(3).map((slot, index) => (
            <InputOTPSlot key={index} {...slot} />
          ))}
        </InputOTPGroup>
      )}
    />
  )
}
