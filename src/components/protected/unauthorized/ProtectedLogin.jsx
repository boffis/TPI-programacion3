import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../../../services/authContext/AuthContext"
import { IsTokenValid } from "../Protected.helper";

const ProtectedLogin = () => {
    const { user, onLogout } = useContext(AuthContext);

    if (!IsTokenValid(user?.token)) {
        onLogout()
        return <Navigate to='/login' replace />
    }
    return <Outlet />
}

export default ProtectedLogin