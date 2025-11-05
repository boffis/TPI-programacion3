import { createContext } from "react";

export const AuthContext = createContext({
    user: null,
    onLogin: () => { },
    onLogout: () => { },
    onApplySeller: () => { },
    onAddProduct: () => { }
});