import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <SignUp 
        appearance={{
          elements: { rootBox: "max-w-md w-full", card: "bg-zinc-900 border-zinc-800" }
        }}
      />
    </div>
  )
}