import Header from './components/header/header'
import Footer from './components/footer/footer'
import Browse from './components/browse/browse'
import Home from './components/home/home'
import PageNotFound from './components/pageNotFound/pageNotFound'
import './App.scss'
import { Routes, BrowserRouter, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />}>
          <Route path="?p=:page" element={<Browse />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
