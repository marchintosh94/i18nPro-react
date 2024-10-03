<div>
    <img src="./assets/i18nPro.png" width="400" style="display: inline;"/>
    <img src="./assets/react.png" style="display:inline;" width="40"/>
</div>

<h1 style="width:100%;text-align:center;margin:3rem 0;">@marchintosh94/i18n-pro-react</h1>

# I18nPro React

I18nPro react is a React helper that provides functionalities for internationalization (i18n). It uses the [`i18nPro`](https://github.com/marchintosh94/i18nPro.git) library for the actual i18n operations.



## 📄 Table of Contents

1. [Installation](#installation)
2. [i18nPro](#i18npro)
3. [Usage](#usage)
    - [i18nProProvider & i18nProContext](#i18nproprovider--i18nprocontext)
        - [i18nProProvider Props](#i18nproprovider-props)
        - [Example](#example)
        - [Using the `useI18nProContext` context hook](#using-the-usei18nprocontext-context-hook)
    - [useI18nPro](#usei18npro)
    - [withI18nPro Higher-Order Component (WIP)](#withi18npro-higher-order-component-work-in-progress)
1. [License](#license)

## Installation

```bash
npm install @marchintosh94/i18n-pro-react
# or
yarn add @marchintosh94/i18n-pro-react
```

## <img src="./assets/ts.png" width="16"/> i18nPro

This is the main library that implements all core functionalities uesd by i18nPro React. 
Read more about core functionalities and how to use it
### 🔗[I18nPro](https://github.com/marchintosh94/i18nPro.git)

## Usage

### i18nProProvider & i18nProContext

`i18nProProvider` is a React component that provides the `i18nPro` instance to the rest of the application using the React Context API. It should be placed at the root of the component tree to ensure that all components have access to the `i18nPro` functionalities. 

`i18nProContext` is the React Context object that holds the `i18nPro` instance. It is used by the `useI18nPro` hook to access the `i18nPro` instance.

#### i18nProProvider Props

- `initialSetup`: The initial setup object for the `i18nPro` instance. This object should contain the following properties:
    - `locale`: The default locale to use.
    - `path`: The url to get translations or public path to the file containing the translation files. If not provided, you have to provide the `messages` object.
    - `messages`: An object containing the translation messages for the default locale. If not provided, you have to provide the `path`.

#### Example
    
```tsx
import React from 'react';
import { i18nProProvider } from '@marchintosh94/i18n-pro-react';

const initialSetup = {
    locale: 'en',
    path: 'http://localhost:3000/locales/en.json',
};

ReactDOM.render(
    <i18nProProvider initialSetup={initialSetup}>
        <App />
    </i18nProProvider>,
    document.getElementById('root')
);
```
##### Using the `useI18nProContext` context hook

```tsx
import React from 'react'
import { useI18nProContext } from '@marchintosh94/i18n-pro-react'

const MyComponent = () => {
  const { locale, t, switchLoadLanguage } = useI18nProContext()

  return (
    <div>
      <p>{t('hello')}</p>
      <button onClick={() => switchLoadLanguage('fr', { hello: 'Bonjour' })}>
        Switch to French
      </button>
    </div>
  )
}
```

### useI18nPro

`useI18nPro` is a custom React hook that provides functionalities for internationalization (i18n). 

#### Return Object

The hook returns an object with the following properties:

- `locale`: The current locale.
- `t`: A function to translate a given key into the current locale.
- `switchLoadLanguage`: A function to change the current language and load the new translations.
- `updateExisitngLocale`: A function to update the current locale if it's available in the `i18nPro` library.

#### `t(value: string, ...args): string`

Translates a given key into the current locale.

##### Parameters

- `value`: The key to translate.
- `...args`: The arguments to pass to the `i18nPro.t` function.

##### Return Value

The translated string.

#### `switchLoadLanguage(...args): Promise<string>`

Changes the current language and loads the new translations.

##### Parameters

- `...args`: The arguments to pass to the `i18nPro.changeLanguage` function.

##### Return Value

A promise that resolves to the updated locale.

#### `updateExisitngLocale(locale: string): string`

Updates the current locale if it's available in the `i18nPro` library.

##### Parameters

- `locale`: The locale to set.

##### Return Value

The updated locale, or an empty string if the locale was not updated.

### withI18nPro Higher-Order Component (Work in progress)

`withI18nPro` is a higher-order component (HOC) that enhances a component with `i18nPro` functionality. It uses the `useI18nPro` hook to provide internationalization (i18n) capabilities to the wrapped component.

#### Parameters

- `WrappedComponent`: The component to be wrapped. This component will receive all the props of the original component, along with the additional props provided by the `useI18nPro` hook.

#### Return Value

The HOC returns a new component that renders the `WrappedComponent` with the additional `i18nPro` props. The returned component accepts all the props of the `WrappedComponent`, except for the props provided by the `useI18nPro` hook.


## License

This project is licensed under the [MIT License](./LICENSE).
