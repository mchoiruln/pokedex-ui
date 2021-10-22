// for every request set token header bearer

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('token')
    config.headers.common.Authorization = `Bearer ${token}`
  })

  $axios.onError((error) => {
    if (
      error.response.data &&
      error.response.data.code === 'auth/id-token-expired'
    ) {
      localStorage.removeItem('token')
      redirect('/login')
    }
  })
}
