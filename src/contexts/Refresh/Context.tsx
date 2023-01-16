import React, { createContext, useCallback, useContext, useState } from "react";

interface RefreshData {
  refreshing: boolean;
  startRefresh(): void;
  stopRefresh(): void;
}

const RefreshContext = createContext<RefreshData>({} as RefreshData)

export const RefreshProvider: React.FC = ({ children }) => {

  const [refreshing, setRefreshing] = useState(false);

  const startRefresh = useCallback(() => {
    setRefreshing(true);
  }, [refreshing])

  const stopRefresh = useCallback(() => {
    setRefreshing(false);
  }, [refreshing])


  return (
    <RefreshContext.Provider value={{ refreshing, startRefresh, stopRefresh }}>
      {children}
    </RefreshContext.Provider>
  )
}
export function useRefresh(): RefreshData {
  const context = useContext(RefreshContext);

  if (!context) {
    throw new Error('useRefresh must be used within a refresh provider');
  }

  return context;
}
