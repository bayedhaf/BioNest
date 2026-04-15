"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"

export default function UserSync() {
  const { isLoaded, isSignedIn, user } = useUser()
  const hasSyncedRef = useRef(false)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user || hasSyncedRef.current) {
      return
    }

    const email = user.primaryEmailAddress?.emailAddress

    if (!email) {
      return
    }

    hasSyncedRef.current = true

    void fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: user.firstName,
        last_name: user.lastName,
        username: user.username,
      }),
    }).catch(() => {
      hasSyncedRef.current = false
    })
  }, [isLoaded, isSignedIn, user])

  return null
}
