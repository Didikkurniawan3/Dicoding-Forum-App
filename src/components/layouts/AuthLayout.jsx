import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../footer/Footer"
import Header from "../header/Header"

export const AuthLayout = () => {
    const auth = useSelector((states) => states.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate("/")
        }
    }, [auth, navigate])

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <section className="flex-grow flex justify-center items-center">
                <Outlet />
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
