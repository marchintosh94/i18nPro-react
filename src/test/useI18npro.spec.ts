import { act, renderHook, waitFor } from '@testing-library/react';
import { useI18nPro } from '../hook/useI18nPro';
import { i18nPro } from '@marchintosh94/i18n-pro';

describe('useI18nPro Hook', () => {
  beforeAll(() => {
    i18nPro.defaultLocale = 'en-US';
  });

  it('should initialize with the default locale', () => {
    const { result } = renderHook(() => useI18nPro());
    expect(result.current.locale).toEqual('en-US');
  });

  it('should change the locale when switchLoadLanguage is called', async () => {
    const { result } = renderHook(() => useI18nPro());

    act(() => {
      result.current.switchLoadLanguage('it', { 'hello': 'ciao' });
    });

    await waitFor(() => {
        expect(result.current.locale).toEqual('it');
    });

  });

  it('should translate text when t is called', () => {
    const { result } = renderHook(() => useI18nPro());

    act(() => {
      result.current.switchLoadLanguage('it', { 'hello': 'ciao' });
    });

    expect(result.current.t('hello')).toEqual('ciao');
  });

  it('should update the locale when updateExisitngLocale is called', () => {
    const { result } = renderHook(() => useI18nPro());

    act(() => {
      result.current.updateExisitngLocale('fr');
    });

    waitFor(() => {
        expect(result.current.locale).toEqual('fr');
    })
  });
});