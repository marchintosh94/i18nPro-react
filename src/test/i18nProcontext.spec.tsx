import React, { useEffect } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nProProvider, useI18nProContext } from '../context/i18nProContext'

describe('I18nProContext', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render children and provide context values', () => {
    act(() => {
      render(
        <I18nProProvider
          initialSetup={{ locale: 'en', messages: { key: 'value' } }}
        >
          <div>Test Child</div>
        </I18nProProvider>
      )
    })
    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should provide correct context values and update locale on load', () => {
    const TestComponent = () => {
      const { switchLoadLanguage, locale, t } = useI18nProContext()

      return (
        <div>
          <span>{locale}</span>
          <button
            onClick={() =>
              switchLoadLanguage('es', {
                change_language: 'cambiar el idioma'
              })
            }
          >
            {t('change_language')}
          </button>
        </div>
      )
    }
    const { container } = render(
      <I18nProProvider initialSetup={{ locale: 'fr', messages: {} }}>
        <TestComponent />
      </I18nProProvider>
    )
    waitFor(() => {
      expect(screen.getByText('fr')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('change_language')
    })
  })

  it('should provide correct context values, update locale on load and load tranlsation from path', () => {
    const TestComponent = () => {
      const { switchLoadLanguage, locale, t } = useI18nProContext()

      return (
        <div>
          <span>{locale}</span>
          <button
            onClick={() =>
              switchLoadLanguage('es', {
                change_language: 'cambiar el idioma'
              })
            }
          >
            {t('change_language')}
          </button>
        </div>
      )
    }
    const { container } = render(
      <I18nProProvider initialSetup={{ locale: 'fr', path: '' }}>
        <TestComponent />
      </I18nProProvider>
    )
    waitFor(() => {
      expect(screen.getByText('fr')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('change_language')
    })
  })
  it('should provide update locale when new laguage has been loaded', () => {
    const TestComponent = () => {
      const { locale, switchLoadLanguage, t } = useI18nProContext()

      return (
        <div>
          <span>{locale}</span>
          <button
            onClick={() =>
              switchLoadLanguage('es', {
                change_language: 'cambiar el idioma'
              })
            }
          >
            {t('change_language')}
          </button>
        </div>
      )
    }
    const { container } = render(
      <I18nProProvider
        initialSetup={{ locale: 'fr', messages: { test: 'test' } }}
      >
        <TestComponent />
      </I18nProProvider>
    )
    act(() => {
      fireEvent.click(screen.getByRole('button'))
    })
    waitFor(() => {
      expect(screen.getByText('es')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('cambiar el idioma')
    })
  })
})
