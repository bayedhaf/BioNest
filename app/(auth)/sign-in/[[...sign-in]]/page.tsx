import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <SignIn 
        appearance={{
          elements: { rootBox: "max-w-md w-full", card: "bg-zinc-900 border-zinc-800" }
        }}
      />
    </div>
  )
}