import Header from './components/header/header'
import Footer from './components/footer/footer'
import Browse from './components/browse/browse'
import PageNotFound from './components/pageNotFound/pageNotFound'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/browse/dataset/:id" />
        <Route path="/browse/?skip=:skip&limit=:limit" />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
