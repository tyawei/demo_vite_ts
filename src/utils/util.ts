
export const setSessionStorage = (key: string, value: string | number ): void => {
  window.sessionStorage.setItem(key, value)
}
export const getSessionStorage= (key: string): string | number | null => {
  return window.sessionStorage.getItem(key)
}