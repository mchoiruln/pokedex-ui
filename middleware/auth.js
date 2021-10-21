// WARNING: this middleware only works in client-side

export default function ({ store, route, redirect, $fire }) {
  const userIsLoggedIn = !!localStorage.getItem('token')

  if (!userIsLoggedIn && route.name.toLowerCase() !== 'login') {
    return redirect('/login')
  }

  if (userIsLoggedIn && route.name.toLowerCase() === 'login') {
    return redirect('/')
  }
}
