import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bezienswaardigheden from './pages/Bezienswaardigheden';
import Activiteiten from './pages/Activiteiten';
import Praktisch from './pages/Praktisch';
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
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
