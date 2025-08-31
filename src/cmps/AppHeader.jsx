import { NavLink } from "react-router-dom";


export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container flex justify-between align-center">
                <h1>Mister Toy</h1>
                <nav className="app-nav flex">
                    <NavLink to="/">Dashboard</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>
            </section>
        </header>
    )
}