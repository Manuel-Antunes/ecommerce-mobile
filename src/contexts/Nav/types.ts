export interface NavSection {
  name: string
  ref?: any
}
export interface NavContext {
  registerSection<T>(field: NavSection): void,
  navigateByName(name: string): void,
  navigateToTop(): void
}
