import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import de Redux
import { store } from './store'; // Import de ton store Redux
import { AuthProvider } from './features/auth/AuthProvider';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* On ajoute le Provider Redux ici */}
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);