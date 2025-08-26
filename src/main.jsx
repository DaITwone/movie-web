import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function Main() {
  useEffect(() => {
    AOS.init({
      duration: 800,   // thời gian animation (ms)
      once: false,      // chỉ chạy 1 lần khi scroll tới
      // offset: 100,     // khoảng cách trước khi kích hoạt animation
      easing: "ease-in-out",
      mirror: true     // khi scroll ngược thì phần tử sẽ ẩn đi
    });
  }, []);

  return <App />;
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
