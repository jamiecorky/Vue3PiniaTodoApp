# Vue3TodoApp

This project is a todo app that works with full CRUD functionality. While styling wasn't a priority in this project I aimed to follow WCAG 2.2 accessibility guidelines.

The project uses the below to achieve the end product:

- Axios for API calls
- Pinia for state management
- Vue test utils for unit testing (pinia testing added to this too)
- Tailwind for styling with some CSS for conditional rendering

Next steps for this project would be to improve coverage of unit tests, componetise base components rather than using tailwind for individual buttons and look for ways to improve the UX of the app.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
