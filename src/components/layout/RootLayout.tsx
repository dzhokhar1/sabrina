import { Suspense } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ScrollToTop } from "@/components/layout/ScrollToTop"

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="size-8 animate-spin rounded-full border-2 border-hairline border-t-primary" />
    </div>
  )
}

function AnimatedOutlet() {
  const location = useLocation()
  const outlet = useOutlet()
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {outlet}
    </motion.div>
  )
}

export function RootLayout() {
  return (
    <div className="paper-noise relative flex min-h-svh flex-col">
      <ScrollToTop />
      <Header />
      <main className="relative z-10 flex-1">
        <Suspense fallback={<PageFallback />}>
          <AnimatedOutlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
