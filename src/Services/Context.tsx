import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {Alert, Snackbar} from "../Components";
import { createClient } from '@supabase/supabase-js';
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ThemeProvider, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../theme";

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(timezone);


interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext(null);

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { t: translate, i18n } = useTranslation();
  const timeOutDuration = 4000;
  const isDarkMode = useMediaQuery("(prefers-color-scheme :dark)");

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang)
  }

  function showSnackMessage(message: string) {
    setSnackMessage(message);
    setSnackbarOpen(true);
  }

  function handleCloseSnackbar() {
    setSnackMessage("");
    setSnackbarOpen(false);
  }

  function showAlert(message: string, severity: string) {
    setAlertSeverity(severity);
    setAlertMessage(message);

    setTimeout(() => {
      setAlertSeverity("");
      setAlertMessage("");
    }, timeOutDuration)
  }

  const shareStates = {
    showSnackMessage,
    showAlert,
    changeLanguage,
    supabase,
    translate,
  }

  useEffect(() => {
    const storeLanguage = localStorage.getItem("language");

    if (storeLanguage) {
      changeLanguage(storeLanguage);
    } else {
      const navLanguage = navigator.language.split("-");
      changeLanguage(navLanguage[0]);
    }
  }, [])

  return (
    <AppContext.Provider value={shareStates}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {children}
        <Snackbar
          autoHideDuration={timeOutDuration}
          open={snackbarOpen}
          message={snackMessage}
          onClose={handleCloseSnackbar}
          className="Button"
        />

        {alertMessage && <Alert severity={alertSeverity}>
          {alertMessage}
        </Alert>}
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
}

export default AppProvider;
