import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import { store } from "./services/store/store.js"


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <main className="main-layout"></main>
        </section>
      </Router>
    </Provider>
  )
}