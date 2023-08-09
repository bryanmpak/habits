import LinkForm from "@/components/LinkForm"

const page = () => {
  return (
    <div className="w-80 rounded-md mx-auto flex flex-col items-center gap-8 pt-20">
      <h1 className="text-3xl text-title">link accounts ❤️</h1>
      <LinkForm />
    </div>
  )
}

export default page
