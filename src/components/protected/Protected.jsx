import { useContext } from "react"
import { Navigate, Outlet } from "react-router"
import { AuthContext } from "../../services/authContext/AuthContext"
import { IsTokenValid } from "./Protected.helpers";

const Protected = () => {
    const { user } = useContext(AuthContext);

    if (!IsTokenValid(user.token)) {
        return <Navigate to='/login' replace />
    }
    return <Outlet />
}

export default Protected