import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './i18n';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper p-8 flex flex-col items-center justify-center font-sans text-soil-900 text-center">
          <h1 className="text-3xl font-serif font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="text-soil-700 mb-6 max-w-md">The application encountered an unexpected error. Please return to the home screen to continue your session.</p>
          <button 
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
            className="bg-soil-900 text-wheat-100 px-6 py-3 rounded-full font-bold hover:bg-soil-700 transition"
          >
            Return to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
