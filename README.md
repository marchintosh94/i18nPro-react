<div>
    <img src="./assets/i18nPro.png" width="400" style="display: inline;"/>
    <img src="./assets/react.png" style="display:inline;" width="40"/>
</div>

<h1 style="width:100%;text-align:center;margin:3rem 0;">@marchintosh94/i18n-pro-react</h1>

# I18nPro React

I18nPro react is a React helper that provides functionalities for internationalization (i18n). It uses the [`i18nPro`](https://github.com/marchintosh94/i18nPro.git) library for the actual i18n operations.



## 📄 Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [i18nPro](#i18npro)
4. [Usage](#usage)
    - [useI18nPro](#usei18npro)
    - [withI18nPro Higher-Order Component](#withi18npro-higher-order-component)
1. [License](#license)

## Installation

```bash
npm install @marchintosh94/i18n-pro-react
# or
yarn add @marchintosh94/i18n-pro-react
```
## Configuration

- `defaultLocale` (string): The default language to use if no language is specified.

Import the i18nPro module and set your desired configuration in the entry point of your application:

```typescript
// src/index.ts

import { i18nPro } from '@marchintosh94/i18n-pro-react'

i18nPro.defaultLocale = 'en-US'

//... other
```

## <img src="./assets/ts.png" width="16"/> i18nPro

This is the main library that implements all core functionalities uesd by i18nPro React. 
Read more about core functionalities and how to use it
### 🔗[I18nPro](https://github.com/marchintosh94/i18nPro.git)

## Usage

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

### withI18nPro Higher-Order Component

`withI18nPro` is a higher-order component (HOC) that enhances a component with `i18nPro` functionality. It uses the `useI18nPro` hook to provide internationalization (i18n) capabilities to the wrapped component.

#### Parameters

- `WrappedComponent`: The component to be wrapped. This component will receive all the props of the original component, along with the additional props provided by the `useI18nPro` hook.

#### Return Value

The HOC returns a new component that renders the `WrappedComponent` with the additional `i18nPro` props. The returned component accepts all the props of the `WrappedComponent`, except for the props provided by the `useI18nPro` hook.

### I18nProProvider

`I18nProProvider` is a context provider component that supplies `i18nPro` functionality to its child components. It uses the `useI18nPro` hook to provide internationalization (i18n) capabilities to the components within its context.

#### Parameters

- `children`: The child components that will have access to the `i18nPro` context.

#### Return Value

The `I18nProProvider` returns a context provider that wraps its children with the `i18nPro` context. The wrapped children will have access to the `i18nPro` context values, such as `locale`, `switchLoadLanguage`, `t`, and `updateExisitngLocale`.

### useI18nProContext

`useI18nProContext` is a custom hook that provides access to the `i18nPro` context. It must be used within a component that is a descendant of the `i18nProProvider`.

#### Return Value

The hook returns the `i18nPro` context values, including:

- `locale`: The current locale.
- `switchLoadLanguage`: A function to switch the current language.
- `t`: A function to translate text.
- `updateExisitngLocale`: A function to update the existing locale.

#### Error Handling

If `useI18nProContext` is used outside of an `i18nProProvider`, it will throw an error with the message: "useI18nProContext must be used within an I18nProProvider".

## License

This project is licensed under the [MIT License](./LICENSE).
