import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext";

const User = JSON.parse(localStorage.getItem('CurrentUser'))

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(User);

    
    useEffect(() => {
        if (user) {
            localStorage.setItem("CurrentUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("CurrentUser");
        }
    }, [user]);

    const handleLogin = (user) => {
        setUser(user);
    }

    const handleLogout = () => {
        setUser(null);
    }

    const handleApplySeller = () => {
        setUser((user)=>{
            return(
                {...user, status:"Seller"}
            )
        });        
    }

    const handleUpdateUser = (updates) => {
        setUser((prevUser) => {
        if (!prevUser) return null;
        return { ...prevUser, ...updates };
        });
    };

    const handleAddProduct = (newProduct) => {
        setUser((prevUser) => ({
            ...prevUser,
            products: [...prevUser.products, newProduct]
        }));
    };

    const handleUpdateProduct = (updatedProduct) => {
        setUser((prevUser) => ({
            ...prevUser,
            products: prevUser.products.map(p =>
            p.id === updatedProduct.id ? updatedProduct : p
            )
        }));
    };

    const handleDeleteProduct = (id) => {
        setUser((prevUser) => ({
            ...prevUser,
            products: prevUser.products.map(p =>
            p.id === id ? {...p, deleted:true} : p
            )
        }));
    };

    const handleAddPurchase = (purchase) => {
        setUser((prevUser) => ({
            ...prevUser,
            purchases: [...prevUser.purchases, purchase]
        }));
    }

    const handleDeletePurchase = () => {

    }


    return (
        <AuthContext
            value={{
                user,
                onLogin: handleLogin,
                onLogout: handleLogout,
                onApplySeller: handleApplySeller,
                onUpdateUser: handleUpdateUser,
                onAddProduct: handleAddProduct,
                onUpdateProduct: handleUpdateProduct,
                onDeleteProduct: handleDeleteProduct,
                onAddPurchase: handleAddPurchase,
                onDeletePurchase: handleDeletePurchase
            }}>
            {children}
        </AuthContext>
    )
}

export default AuthContextProvider