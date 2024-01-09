/* AppTheme START */

// This approach is an alternative to enums.
// Apparently it is being discouraged.
// Sources:
//  [1] https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh#:~:text=ENUMs%20may%20seem%20like%20a,opt%20for%20objects%20or%20types.
//  [2] https://maxheiber.medium.com/alternatives-to-typescript-enums-50e4c16600b1

// AppTheme as object
export const AppTheme = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

// AppTheme as type
type ObjectValues<T> = T[keyof T];
export type AppTheme = ObjectValues<typeof AppTheme>;

/* AppTheme END */
