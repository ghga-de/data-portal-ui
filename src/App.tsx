import Header from './components/header/header'
import Footer from './components/footer/footer'
import Browse from './components/browse/browse'
import PageNotFound from './components/pageNotFound/pageNotFound'
import './App.scss'
import { Routes, BrowserRouter, Route } from "react-router-dom"


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Browse />} />
        </Route>
        <Route path="/browse">
          <Route index element={<Browse />} />
          <Route path="?p=:page" element={<Browse />} />
          <Route path="?q=:search&p=:page" element={<Browse />} />
          <Route path="?f=:filter&p=:page" element={<Browse />} />
          <Route path="?q=:search&f=:filter&p=:page" element={<Browse />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
