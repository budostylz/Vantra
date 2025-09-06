import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import global styles from src/origin/css



import App from './App';
import "./origin/base/css/animate.css";
import "./origin/base/css/bootstrap-datepicker.css";
import "./origin/base/css/bootstrap.min.css";
import "./origin/base/css/flaticon.css";
import "./origin/base/css/jquery.timepicker.css";
import "./origin/base/css/magnific-popup.css";
import "./origin/base/css/owl.carousel.min.css";
import "./origin/base/css/owl.theme.default.min.css";
import "./origin/base/css/style.css";

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
