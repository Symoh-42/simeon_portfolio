import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutPage, ContactPage, HomePage, PortfolioPage } from './pages';
import MainLayout from './pages/_layout';
const App = () => {
    return (
        <Router>
            <Routes element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </Router>
    )
}

export default App