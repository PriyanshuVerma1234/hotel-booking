import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppProvider } from './context/AppContext.jsx'

// import your publishable key 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY){
  throw new Error('Add your clerk Publishable Key to the .env file')
}

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}
  afterSignOutUrl="/">
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>
  </ClerkProvider>,
)



// import { createRoot } from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import { ClerkProvider } from "@clerk/clerk-react";

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// console.log("KEY =", PUBLISHABLE_KEY);

// createRoot(document.getElementById("root")).render(
//   <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// </ClerkProvider>
// );