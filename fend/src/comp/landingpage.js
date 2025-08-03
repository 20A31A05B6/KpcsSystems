import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Ct from './Ct';

const LandingPage = () => {
  const { state } = useContext(Ct);

  return (
    <div className="landing-con">
      <header className="landing-header">
        <h1>Welcome to Our Platform</h1>
      </header>
      <main className="landing-main">
        <div className="landing-card">
          <h2>{state.token ? `Hello, ${state.name}!` : 'Discover New Possibilities'}</h2>
          <p>
            {state.token
              ? 'Welcome back! Dive into your personalized dashboard to connect, create, and collaborate.'
              : 'Join our innovative platform to connect, create, and collaborate like never before.'}
          </p>
          <Link
            to={state.token ? '/home' : '/home'}
            className="landing-btn landing-btn-primary"
          >
            {state.token ? 'Go to Dashboard' : 'Explore Now'}
          </Link>
        </div>
      </main>
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Your Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;