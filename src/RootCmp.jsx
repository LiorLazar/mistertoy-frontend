import './assets/style/main.css'

import { Provider } from "react-redux"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { store } from "./services/store/store"
import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from './cmps/AppFooter'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { useEffect } from 'react'
import { loadToyLabels } from './services/store/actions/toy.actions'
import { ToyEdit } from './pages/ToyEdit'
import { Dashboard } from './cmps/Dashboard'
import { About } from './pages/About'


export default function App() {

  useEffect(() => {
    loadToyLabels()
  }, [])

  return (
    <Provider store={store}>
      <Router basename='/mistertoy-frontend'>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/about' element={<About />} />
              <Route path="/toy" element={<ToyIndex />} />
              <Route path="/toy/:toyId" element={<ToyDetails />} />
              <Route path='/toy/edit' element={<ToyEdit />} />
              <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}