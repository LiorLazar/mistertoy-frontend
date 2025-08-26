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


export default function App() {

  useEffect(() => {
    loadToyLabels()
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className="main-layout">
            <Routes>
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>
  )
}