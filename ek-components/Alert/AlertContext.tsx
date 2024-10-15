import React from 'react';
import { createContext, useContext, useEffect, useReducer } from 'react';

interface AlertType {
  type?: 'success' | 'error';
  message: string;
}

type AlertAction =
  | { type: 'SHOW_ALERT'; alert: AlertType | null }
  | { type: 'HIDE_ALERT' };

function alertReducer(
  state: AlertType | null,
  action: AlertAction
): AlertType | null {
  switch (action.type) {
    case 'SHOW_ALERT':
      return action.alert;
    case 'HIDE_ALERT':
      return null;
    default:
      return state;
  }
}

export const AlertContext = createContext<{
  showAlert: (alert: AlertType | null) => void;
  alert: AlertType | null;
}>({
  showAlert: () => {},
  alert: null,
});

export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [alert, dispatch] = useReducer(alertReducer, null);
  let handleAlert: any;

  useEffect(() => {
    if (!alert && handleAlert) {
      clearTimeout(handleAlert);
    }
  }, [alert]);

  const showAlert = (alert: AlertType | null) => {
    dispatch({ type: 'SHOW_ALERT', alert });
    handleAlert = setTimeout(() => {
      dispatch({ type: 'HIDE_ALERT' });
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert, alert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  return context;
};
