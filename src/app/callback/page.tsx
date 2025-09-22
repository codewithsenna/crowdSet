"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.replace(/^#/, ""))
    const accessToken = params.get("access_token")

    if (accessToken) {
      localStorage.setItem("spotify_access_token", accessToken)
      router.push("/") // go back home
    }
  }, [router])

  return <p>Logging you in…</p>
}
