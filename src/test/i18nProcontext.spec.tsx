import React, { useEffect } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { I18nProProvider, useI18nProContext } from '../context/i18nProContext'
import { i18nPro } from '@marchintosh94/i18n-pro'

describe('I18nProContext', () => {
  i18nPro.defaultLocale = 'fr'
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render children and provide context values', () => {
    render(
      <I18nProProvider>
        <div>Test Child</div>
      </I18nProProvider>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })

  it('should provide correct context values and update locale on load', () => {
    const TestComponent = () => {
      const { locale, switchLoadLanguage, t } = useI18nProContext()
      useEffect(() => {
        switchLoadLanguage('en-us', {
          change_language: 'change language'
        })
      }, [])
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
      <I18nProProvider>
        <TestComponent />
      </I18nProProvider>
    )

    expect(screen.getByText('fr')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('change_language')
    waitFor(() => {
      expect(screen.getByText('en-us')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveTextContent('change language')
      console.log(container.innerHTML)
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
      <I18nProProvider>
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

  it('should throw error when useI18nProContext is used outside of I18nProProvider', () => {
    const TestComponent = () => {
      try {
        useI18nProContext()
      } catch (e) {
        return <div>{(e as Error).message}</div>
      }
      return <></>
    }

    render(<TestComponent />)

    expect(
      screen.getByText(
        'useI18nProContext must be used within an I18nProProvider'
      )
    ).toBeInTheDocument()
  })
})
