import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"

import "@fontsource-variable/inter"
import "@fontsource-variable/lora"
import "@fontsource-variable/lora/wght-italic.css"
import "./index.css"

import { router } from "@/router"
import { UserProvider } from "@/context/UserContext"
import { ProgressProvider } from "@/context/ProgressContext"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <ProgressProvider>
        <TooltipProvider delayDuration={200}>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </TooltipProvider>
      </ProgressProvider>
    </UserProvider>
  </StrictMode>,
)
