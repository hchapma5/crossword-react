"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface ReactQueryClientProviderProps {
  children: React.ReactNode
}

export default function ReactQueryClientProvider({
  children,
}: ReactQueryClientProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
