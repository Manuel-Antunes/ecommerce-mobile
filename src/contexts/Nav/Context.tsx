/* istanbul ignore file */

import { createContext } from 'react'

import { NavContext } from './types'

export const NavigatiorContext = createContext<NavContext>({} as NavContext)
