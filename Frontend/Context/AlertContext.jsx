import React, { createContext, useContext, useState } from 'react';
import AlertModal from '../src/components/AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: '', type: 'success' });

 
  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: '', type: 'success' });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
     
      <AlertModal
        message={alert.message}
        type={alert.type}
        duration={2000}
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
};


export const useAlert = () => useContext(AlertContext);