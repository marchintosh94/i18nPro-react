import { act, fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PropsWithChildren } from 'react'
import { withI18nPro } from '../HOC/withI18nPro'
import { WithI18nProExtendedProps } from '../types/hoc'
import { i18nPro } from '@marchintosh94/i18n-pro'

describe('Test i18nPro HOC', () => {
  const Text = ({
    t,
    locale,
    switchLoadLanguage,
    label,
    children
  }: PropsWithChildren<{ label: string } & WithI18nProExtendedProps>) => {
    return (
      <>
        <span>{locale}</span>
        <span id="label">{t(label)}</span>
        {children}
        <button
          onClick={() =>
            switchLoadLanguage('en', { label: 'this is my label' })
          }
        >
          Change
        </button>
      </>
    )
  }

  const TextI18n = withI18nPro(Text)

  beforeAll(() => {
    i18nPro.defaultLocale = 'en-US'
  })

  it('Extended properties should exists', () => {
    const { getByText } = render(<TextI18n label="label" />)
    expect(getByText('label')).toBeInTheDocument()
    expect(getByText('en-US')).toBeInTheDocument()
  })
  it('Change language should update language and translate the label', async () => {
    const { getByText, getByRole } = render(<TextI18n label="label" />)
    act(() => {
      fireEvent.click(getByRole('button'))
    })
    await waitFor(() => {
      expect(() => getByText('label')).toThrow()
      expect(() => getByText('en-US')).toThrow()
      expect(getByText('this is my label')).toBeInTheDocument()
      expect(getByText('en')).toBeInTheDocument()
    })
  })
})
