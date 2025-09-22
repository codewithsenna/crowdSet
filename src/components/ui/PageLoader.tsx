"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function PageLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // When pathname changes, show loader briefly
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 500) // adjust delay
    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      </div>
    </div>
  )
}
