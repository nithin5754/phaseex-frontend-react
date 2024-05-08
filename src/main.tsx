
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './app/store/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <Router>
  <Routes>
    <Route path="/*" element={
  <>
    <App />
  </>
    } />
  </Routes>
</Router>
  </Provider>

)
