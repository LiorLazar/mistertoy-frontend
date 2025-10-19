import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux'
import { LoginSignup } from './LoginSignup'
import { logout } from '../services/store/actions/user.actions'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    function onLogout() {
        logout()
    }

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
            {user ? (
                <section>
                    <span to={`/user/${user._id}`}>Hello {user.fullname}</span>
                    <button onClick={onLogout}>Logout</button>
                </section>
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
        </header>
    )
}