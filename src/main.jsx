import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AuthContextProvider from './services/authContext/AuthContextProvider.jsx';
import CartContextProvider from './services/cartContext/CartContextProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
      <App />
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
