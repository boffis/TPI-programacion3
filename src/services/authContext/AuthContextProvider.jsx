import { useState } from "react"
import { AuthContext } from "./AuthContext";

const User = JSON.parse(localStorage.getItem('CurrentUser'))

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(User);

    const handleLogin = (user) => {
        setUser(user);
        localStorage.setItem('CurrentUser', JSON.stringify(user))
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('CurrentUser');
    }

    const handleApplySeller = () => {
        setUser((user)=>{
            return(
                {...user, status:"Seller"}
            )
        });        
        localStorage.setItem('CurrentUser', JSON.stringify(user))
    }

    const handleAddProduct = (purchase) => {
        
        setUser((user)=>{
            if(user.purchases){
                return(
                    {...user, purchases: user.purchases.push(purchase) }
                )
            }
            return(
                {...user, purchases:[purchase]}
            )
        })
    }

    return (
        <AuthContext
            value={{
                user,
                onLogin: handleLogin,
                onLogout: handleLogout,
                handleApplySeller,
                handleAddProduct
            }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider