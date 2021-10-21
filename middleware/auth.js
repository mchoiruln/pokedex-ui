// WARNING: this middleware only works in client-side

export default function ({ store, route, redirect, $fire }) {
  // find firebase access token from localStorage
  const userIsLoggedIn = !!localStorage.getItem('token')

  // redirect if user not login
  if (
    !userIsLoggedIn &&
    route.name.toLowerCase() !== 'login' &&
    route.name.toLowerCase() !== 'register'
  ) {
    // console.log('redirect to login')
    return redirect('/login')
  }

  // if authenticated redirect to index
  if (
    userIsLoggedIn &&
    (route.name.toLowerCase() === 'login' ||
      route.name.toLowerCase() === 'register')
  ) {
    // console.log('redirect to index')
    return redirect('/')
  }
}
