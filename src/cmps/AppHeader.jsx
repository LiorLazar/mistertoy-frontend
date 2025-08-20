import { NavLink } from "react-router-dom";


export function AppHeader() {
    return (
        <header className="app-header">
            <section>
                <h1>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toys">Toys</NavLink>
                </nav>
            </section>
        </header>
    )
}