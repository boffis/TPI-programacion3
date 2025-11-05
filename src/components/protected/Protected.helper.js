import { jwtDecode } from "jwt-decode";

export const IsTokenValid = (token, status = null, statusNeeded = null) => {
    
    if (!token) return false;

    if (statusNeeded !== null){
        if (statusNeeded === "Seller") {
            if (status!=="Seller" && status !== "SysAdmin") return false
        } else {
            if (status !== "SysAdmin") return false
        }
    }

    try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;

        return currentTime < decodedToken.exp;

    } catch (error) {
        console.error("Error decoding the token", error)
        return false;
    }
}