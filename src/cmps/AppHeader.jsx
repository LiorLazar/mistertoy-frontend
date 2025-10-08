import { Trans, useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { LoginSignup } from './LoginSignup'

export function AppHeader() {
  const user = useSelector(storeState => storeState.userModule.loggedInUser)
  const { t, i18n } = useTranslation()

  const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Spanish' },
  }

  function onLogout() {
    try {
      logout()
      showSuccessMsg('Bye Bye')
    } catch (error) {
      showErrorMsg('OOPs try again')
    }
  }

  return (
    <section className="app-header full">
      <div className="flex justify-between">
        <nav>
          <NavLink to="/">{t('home')}</NavLink> |
          <NavLink to="/toy">{t('toys')}</NavLink> |
          <NavLink to="/review">{t('reveiws')}</NavLink> |
          <NavLink to="/user">{t('profile')}</NavLink> |
          <NavLink to="/dashboard">{t('dashboard')}</NavLink> |
          <NavLink to="/about">{t('about')}</NavLink>
        </nav>
        <div>
          <Trans i18nKey="i18"></Trans>
          {Object.keys(lngs).map(lng => (
            <button
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
      </div>
      <div className="logo-login-container flex justify-between align-center">
        <div className="logo">Mister Toy</div>
        {user ? (
          <section>
            <Link to={'/user'}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
          </section>
        ) : (
          <section>
            <LoginSignup />
          </section>
        )}
      </div>
    </section>
  )
}
