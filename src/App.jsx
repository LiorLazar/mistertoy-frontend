import './assets/style/main.css'

import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { store } from "./services/store/store.js"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from './cmps/AppFooter.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={<ToyIndex />} path="/toys" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}