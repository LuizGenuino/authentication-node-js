import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import EmailVerificationPage from "./pages/EmailVerificationPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"

function App() {


  return (
    <div className="min-h-screen bg-background flex justify-center items-center" >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </Routes>
    </div>
  )
}

export default App
