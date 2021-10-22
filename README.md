# Pokedex UI

[![Netlify Status](https://api.netlify.com/api/v1/badges/eed06510-f0dc-45d5-9ee4-9dd3a35f81f0/deploy-status)](https://app.netlify.com/sites/pokedex-ui-nuxt/deploys)

This web application about encyclopedia of Pokemon, it can search by Pokedex Number  
and name of the Pokemon. Not only that it's also show about stats and image of the Pokemon.

## Environment

Check file .env.example, make sure you completely fill before run the App.

```ini
# .env file at root project
#url of the backend 
BACKEND_HOST_API=http://localhost:3001

#firebase configuration
apiKey=
authDomain=
projectId=
storageBucket=
messagingSenderId=
appId=
```

## Development

```bash
$ npm install
# serve with hot reload at localhost:3000
$ npm run dev
```

## Production

```bash
$ npm install
$ npm run generate
# copy dist to server as static web app
```

## 3rd party library

What 3rd party library we used :

- Vue Formulate
  > To create form input and support validation out of box
- Axios
  > To consume api backend
- Vue-Chartjs
  > To show statistic pokemon

## Deployment

- [Pokedex UI](https://pokedex-ui-nuxt.netlify.app)
- [Pokedex API](https://pokedex-api-express.herokuapp.com/)