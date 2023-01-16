import { useContext, useEffect, useMemo } from "react";
import { NavigatiorContext } from './Context'
import { NavContext } from './types'
export function useNavigator() {
  const {
    navigateByName,
    navigateToTop,
    registerSection
  } = useContext<NavContext>(NavigatiorContext)

  return {
    navigateByName,
    navigateToTop,
    registerSection
  }
}
