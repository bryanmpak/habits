import LinkConnectForm from "@/components/LinkConnectForm"
import { getAuthSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { toast } from "sonner"

const page = async () => {
  const session = await getAuthSession()
  if (!session) {
    toast("please sign in to continue", {
      description: "only signed in users can link accounts",
    })
  }
  const userEmail = session?.user.email as string

  const response = await prisma.linkingRequest.findFirst({
    where: { responderEmail: userEmail },
    select: { secretQuestion: true },
  })
  const question = response?.secretQuestion

  return (
    <div className='w-80 rounded-md mx-auto flex flex-col items-center gap-8 pt-20'>
      <h1 className='text-3xl text-title'>link accounts ❤️</h1>
      <p className='text-title'>{question}</p>
      <LinkConnectForm />
    </div>
  )
}

export default page
