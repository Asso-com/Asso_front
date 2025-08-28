import { Navigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import useFetchMenuData from "./useFetchMenuData"

// Define the list of static routes
// const staticRoutes: string[] = ["/test"]

// Utility function to check if a route matches any allowed routes
// const matchRoute = (allowedRoutes: string[], pathname: string): boolean => {
//   return allowedRoutes.some(route =>
//     matchPath({ path: route, end: true }, pathname)
//   )
// }

function useAccessGuard(): React.ReactElement | null {
  const { accessToken } = useAuth()
  // const location = useLocation()

  useFetchMenuData()

  // Redirect to login if no access token is found
  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  // Optionally add route checking logic here with `matchRoute(...)` if needed
  return null
}

export default useAccessGuard
