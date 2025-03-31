import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css'; // Create this file for styling

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Redirect logged-in users away from landing page
    if(user) navigate('/dashboard');
  }, [user, navigate]);

  return (
    <main className="home-container">
      <h1 className="hero-title">Scam Detection System</h1>
      <div className="cta-buttons">
        {!user && (
          <>
            <button onClick={() => navigate('/login')} className="auth-button">
              Login
            </button>
            <button onClick={() => navigate('/register')} className="auth-button">
              Register
            </button>
          </>
        )}
        <button onClick={() => navigate('/transactions')} className="main-cta">
          Check Transaction
        </button>
      </div>
    </main>
  );
};

export default Home;