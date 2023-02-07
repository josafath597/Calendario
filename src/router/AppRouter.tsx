import { Route } from "react-router"
import { Routes, Navigate } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"

export const AppRouter = () => {
    const isAuthenticated: boolean = false
  return (
    <Routes>
        {
            isAuthenticated 
            ? <Route path="/auth/*" element={ <LoginPage />} />
            : <Route path="/*" element={ <CalendarPage /> } />
        }

        <Route path="/*" element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
