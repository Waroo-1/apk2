import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import FreelancerOnboarding from './pages/FreelancerOnboarding';
import ClientOnboarding from './pages/ClientOnboarding';
import Dashboard from './pages/Dashboard';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';

function AppContent() {
  const { user, profile, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return <LandingPage />;
  }

  if (!profile.onboardingCompleted) {
    return profile.role === 'freelancer' ? (
      <FreelancerOnboarding />
    ) : (
      <ClientOnboarding />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'explore':
        return <ExplorePage />;
      case 'profile':
        return <ProfilePage />;
      case 'gigs':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Gigs</h1>
            <p className="text-gray-600">Manage your service offerings here</p>
          </div>
        );
      case 'orders':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Orders</h1>
            <p className="text-gray-600">View and manage your orders</p>
          </div>
        );
      case 'earnings':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Earnings</h1>
            <p className="text-gray-600">Track your earnings and payouts</p>
          </div>
        );
      case 'connections':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Connections</h1>
            <p className="text-gray-600">Manage your professional network</p>
          </div>
        );
      case 'billing':
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Billing & Payments</h1>
            <p className="text-gray-600">Manage your payment methods and transaction history</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
