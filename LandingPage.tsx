import { useState } from 'react';
import { Users, Briefcase, TrendingUp, Shield, Star, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';

export default function LandingPage() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'freelancer' | 'client' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    phone: ''
  });

  const { signUp, signIn } = useAuth();

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setSelectedRole(null);
  };

  const handleRoleSelect = (role: 'freelancer' | 'client') => {
    setSelectedRole(role);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.country,
      formData.phone,
      selectedRole
    );
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">FreelanceHub</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sign In
            </button>
            <Button onClick={handleRegisterClick} size="lg">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Perfect Freelancer
              <br />
              <span className="text-blue-600">Or Launch Your Career</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with top talent or showcase your skills. Join thousands of professionals building successful careers on FreelanceHub.
            </p>
            <Button onClick={handleRegisterClick} size="lg" className="text-xl px-12 py-4">
              Register Now <ArrowRight className="inline ml-2 w-6 h-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">50,000+ Freelancers</h3>
              <p className="text-gray-600">Access a diverse pool of talented professionals ready to bring your projects to life.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">$100M+ Earned</h3>
              <p className="text-gray-600">Our community has earned over $100 million through successful collaborations.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Platform</h3>
              <p className="text-gray-600">Protected payments, verified profiles, and dispute resolution for peace of mind.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-12 mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Featured Freelancers</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Sarah Johnson', role: 'UI/UX Designer', rating: 4.9, projects: 127 },
                { name: 'Michael Chen', role: 'Full Stack Developer', rating: 5.0, projects: 89 },
                { name: 'Emily Rodriguez', role: 'Content Writer', rating: 4.8, projects: 213 },
                { name: 'David Kim', role: 'Video Editor', rating: 4.9, projects: 156 }
              ].map((freelancer, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4" />
                  <h4 className="font-bold text-gray-900 text-center mb-1">{freelancer.name}</h4>
                  <p className="text-sm text-gray-600 text-center mb-3">{freelancer.role}</p>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{freelancer.rating}</span>
                    <span className="text-gray-500 text-sm">({freelancer.projects})</span>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    View Profile
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-xl p-12 text-center text-white mb-20">
            <h2 className="text-4xl font-bold mb-6">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { text: "FreelanceHub transformed my business. I found the perfect developers for my project in days.", author: "James Wilson, CEO" },
                { text: "As a freelancer, this platform helped me build a steady stream of clients. Highly recommend!", author: "Lisa Chen, Designer" },
                { text: "The quality of talent here is exceptional. Every project has exceeded expectations.", author: "Robert Taylor, Founder" }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                  <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={showRegisterModal}
        onClose={() => {
          setShowRegisterModal(false);
          setSelectedRole(null);
        }}
        title="Join FreelanceHub"
        size="lg"
      >
        {!selectedRole ? (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">Choose how you want to use FreelanceHub:</p>
            <button
              onClick={() => handleRoleSelect('client')}
              className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="flex items-start space-x-4">
                <Briefcase className="w-8 h-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Client</h3>
                  <p className="text-gray-600">Looking to hire talented freelancers for my projects</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => handleRoleSelect('freelancer')}
              className="w-full p-6 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all text-left group"
            >
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Freelancer</h3>
                  <p className="text-gray-600">Ready to showcase my skills and find amazing work</p>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <Input
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <Input
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
              label="Country"
              type="text"
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />
            <Input
              label="Phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedRole(null)}
                className="flex-1"
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Create Account
              </Button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title="Welcome Back"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => {
                setShowLoginModal(false);
                setShowRegisterModal(true);
              }}
              className="text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </Modal>
    </div>
  );
}
