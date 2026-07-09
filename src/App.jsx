import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bezienswaardigheden from './pages/Bezienswaardigheden';
import Activiteiten from './pages/Activiteiten';
import Praktisch from './pages/Praktisch';
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bezienswaardigheden" element={<Bezienswaardigheden />} />
            <Route path="/activiteiten" element={<Activiteiten />} />
            <Route path="/praktisch" element={<Praktisch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
