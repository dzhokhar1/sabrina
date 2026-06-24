import { lazy } from "react"
import { createHashRouter } from "react-router-dom"
import { RootLayout } from "@/components/layout/RootLayout"
import { RequireUser } from "@/components/layout/RequireUser"

const RegisterPage = lazy(() =>
  import("@/pages/RegisterPage").then((m) => ({ default: m.RegisterPage })),
)
const TestPage = lazy(() =>
  import("@/pages/TestPage").then((m) => ({ default: m.TestPage })),
)
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
)
const PortraitPage = lazy(() =>
  import("@/pages/PortraitPage").then((m) => ({ default: m.PortraitPage })),
)
const LevelPage = lazy(() =>
  import("@/pages/LevelPage").then((m) => ({ default: m.LevelPage })),
)
const LibraryPage = lazy(() =>
  import("@/pages/LibraryPage").then((m) => ({ default: m.LibraryPage })),
)
const CoursePage = lazy(() =>
  import("@/pages/CoursePage").then((m) => ({ default: m.CoursePage })),
)
const LecturePage = lazy(() =>
  import("@/pages/LecturePage").then((m) => ({ default: m.LecturePage })),
)
const CertificatePage = lazy(() =>
  import("@/pages/CertificatePage").then((m) => ({ default: m.CertificatePage })),
)
const UploadPage = lazy(() =>
  import("@/pages/UploadPage").then((m) => ({ default: m.UploadPage })),
)
const ProfilePage = lazy(() =>
  import("@/pages/ProfilePage").then((m) => ({ default: m.ProfilePage })),
)
const CooperationPage = lazy(() =>
  import("@/pages/CooperationPage").then((m) => ({ default: m.CooperationPage })),
)
const NotFound = lazy(() =>
  import("@/pages/NotFound").then((m) => ({ default: m.NotFound })),
)

export const router = createHashRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <RegisterPage /> },
      { path: "test", element: <TestPage /> },
      { path: "cooperation", element: <CooperationPage /> },
      {
        path: "app",
        element: <RequireUser />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "portrait", element: <PortraitPage /> },
          { path: "level", element: <LevelPage /> },
          { path: "library", element: <LibraryPage /> },
          { path: "course/:courseId", element: <CoursePage /> },
          { path: "course/:courseId/lecture/:lectureId", element: <LecturePage /> },
          { path: "course/:courseId/certificate", element: <CertificatePage /> },
          { path: "upload", element: <UploadPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
])
