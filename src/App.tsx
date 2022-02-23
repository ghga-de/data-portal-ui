import Header from './components/header/header'
import Footer from './components/footer/footer'
import Browse from './components/browse/browse'
import PageNotFound from './components/pageNotFound/pageNotFound'
import './App.scss'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Browse} exact />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
