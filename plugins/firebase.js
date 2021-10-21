// look at your firebase console and documentation
import { initializeApp } from 'firebase/app'
// for task of UI only sign in with Firebase, for another use backend
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export default (
  {
    $config: {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
    },
  },
  inject
) => {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)

  // inject into nuxt global context
  inject('fire', {
    auth,
    signInWithEmailAndPassword,
    signOut,
  })
}
