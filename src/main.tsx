
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster.tsx';
import { store } from './app/api/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <Provider store={store}>
  <Router>
  <Routes>
    
    <Route path="/*" element={
  <>
    <App />
  <Toaster />
  </>
    } />
  </Routes>


</Router>
  </Provider>
  </ThemeProvider>

)
