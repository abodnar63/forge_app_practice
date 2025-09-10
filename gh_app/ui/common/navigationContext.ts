import { createContext } from 'react';
import { VIEW } from '../common/constants'

const NavigationContext = createContext<{ setCurrentView: React.Dispatch<React.SetStateAction<VIEW>>} | null>(null); // Initial default value

export default NavigationContext;