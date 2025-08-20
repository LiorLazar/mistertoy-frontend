import './assets/style/main.css'

import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import { store } from "./services/store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from './cmps/AppFooter.jsx'


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout"></main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}