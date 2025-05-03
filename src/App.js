import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PublicPortfolio from './pages/PublicPortfolio';
import NotFound from './pages/NotFound'; 
import { useContext } from 'react';
import { ThemeProviderWrapper  } from './context/ThemeContext';
import CaseStudyForm from './pages/components/caseStudyForm';

const RESERVED_ROUTES = ['login', 'register', 'dashboard', 'admin']; 

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function UsernameRouterWrapper() {
  const location = useLocation();
  const path = location.pathname.split('/')[1];

  if (RESERVED_ROUTES.includes(path)) {
    return <NotFound />;
  }

  return <PublicPortfolio />;
}

function App() {
  return (
    
      <ThemeProviderWrapper >
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/casestudy/new"
           element={
            <ProtectedRoute>
               <CaseStudyForm />
           </ProtectedRoute>
           } />
           <Route path="/edit-case-study/:id" element={<ProtectedRoute><CaseStudyForm editMode /></ProtectedRoute>} />
          {/* Catch-all for /username routes */}
          <Route path="/:username" element={<UsernameRouterWrapper />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
