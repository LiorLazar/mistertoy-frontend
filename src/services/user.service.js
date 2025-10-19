import { httpService } from './http.service.js'

export const userService = {
  login,
  signup,
  logout,
  getLoggedInUser,
  getEmptyCredentials,
}

const BASE_URL = 'auth/'
const STORAGE_KEY = 'loggedinUser'

async function login({ username, password }) {
  try {
    const user = await httpService.post(BASE_URL + 'login', {
      username,
      password,
    })
    _setLoggedInUser(user)
    return user
  } catch (error) {
    console.log('Could not login')
  }
}

async function signup(credentials) {
  try {
    const user = await httpService.post(BASE_URL + 'signup', credentials)
    _setLoggedInUser(user)
    return user
  } catch (err) {
    console.log('Could not signup')
  }
}

async function logout() {
  try {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.log('Could not logout')
  }
}

function getLoggedInUser() {
  try {
    const entity = sessionStorage.getItem(STORAGE_KEY)
    return entity ? JSON.parse(entity) : null
  } catch (error) {
    console.log('Error parsing logged in user from storage', error)
    return null
  }
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: '',
  }
}

function _setLoggedInUser(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
