# Create Miro App

[create-miro-app](https://www.npmjs.com/package/create-miro-app)
```shell
npx create-miro-app@beta
```

## How to start:

- Run `yarn` or `npm install` to install dependencies
- Run `yarn start` or `npm start` to start developing, you should have a URL
  that looks like this

```
http://localhost:3000
```

- Paste the URL in `App URL` in your app settings
- open a board & you should see your app in the main toolbar when you click the
  three dots.

## How to build the app:

Run `yarn run build` or `npm run build` and this will generate a static output
inside `dist/` which you can host on static hosting service.

### About the app

This app is using [vite](https://vitejs.dev/) so you can check the documentation
if you want to modify `vite.config.js` configuration if needed.
