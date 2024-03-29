import { z } from "zod"

export const accountLinkValidator = z.object({
  email: z.string().email({ message: "please input a valid email address" }),
  passcode: z.string().length(6, { message: "passcode must be 6 digits" }),
})

export type TAccountLinkValidator = z.infer<typeof accountLinkValidator>
