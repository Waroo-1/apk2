import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, Users, Briefcase, DollarSign, Clock, Star } from 'lucide-react';

export default function Dashboard() {
  const { profile } = useAuth();
  const isFreelancer = profile?.role === 'freelancer';

  if (isFreelancer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome back, {profile?.firstName}!
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Active Orders</h3>
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
            <p className="text-sm text-green-600 mt-1">+2 this week</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Earnings</h3>
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">$24,500</p>
            <p className="text-sm text-green-600 mt-1">+$3,200 this month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avg. Rating</h3>
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">4.9</p>
            <p className="text-sm text-gray-600 mt-1">156 reviews</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Response Time</h3>
              <Clock className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">2h</p>
            <p className="text-sm text-gray-600 mt-1">Average</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { client: 'Sarah Wilson', project: 'Website Redesign', status: 'In Progress', due: '2 days' },
                { client: 'Mike Johnson', project: 'Logo Design', status: 'Review', due: '5 days' },
                { client: 'Emma Davis', project: 'Mobile App UI', status: 'In Progress', due: '1 week' }
              ].map((order, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{order.project}</h3>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Client: {order.client}</p>
                  <p className="text-sm text-gray-500 mt-1">Due in {order.due}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Performance</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm font-bold text-gray-900">98%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">On-Time Delivery</span>
                  <span className="text-sm font-bold text-gray-900">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Client Satisfaction</span>
                  <span className="text-sm font-bold text-gray-900">4.9/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back, {profile?.firstName}!
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Projects</h3>
            <Briefcase className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">8</p>
          <p className="text-sm text-green-600 mt-1">+3 this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Spent</h3>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$18,200</p>
          <p className="text-sm text-gray-600 mt-1">This year</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Connections</h3>
            <Users className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">24</p>
          <p className="text-sm text-green-600 mt-1">+5 new</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg. Project</h3>
            <TrendingUp className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$2,275</p>
          <p className="text-sm text-gray-600 mt-1">Per project</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Projects</h2>
          <div className="space-y-4">
            {[
              { freelancer: 'John Smith', project: 'E-commerce Platform', status: 'In Progress', budget: '$5,000' },
              { freelancer: 'Lisa Chen', project: 'Brand Identity', status: 'Review', budget: '$2,500' },
              { freelancer: 'David Kim', project: 'Marketing Campaign', status: 'In Progress', budget: '$3,200' }
            ].map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{project.project}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Freelancer: {project.freelancer}</p>
                <p className="text-sm text-gray-900 font-semibold mt-1">{project.budget}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Freelancers</h2>
          <div className="space-y-4">
            {[
              { name: 'Sarah Johnson', role: 'UI/UX Designer', rating: 4.9 },
              { name: 'Michael Chen', role: 'Full Stack Developer', rating: 5.0 },
              { name: 'Emily Rodriguez', role: 'Content Writer', rating: 4.8 }
            ].map((freelancer, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{freelancer.name}</h3>
                  <p className="text-sm text-gray-600">{freelancer.role}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-sm">{freelancer.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
