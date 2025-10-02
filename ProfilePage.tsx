import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Phone, MapPin, Globe, CreditCard as Edit2, Save } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function ProfilePage() {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    country: profile?.country || '',
    bio: profile?.bio || ''
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600" />

        <div className="px-8 pb-8">
          <div className="flex items-end justify-between -mt-16 mb-6">
            <div className="flex items-end space-x-4">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-indigo-500" />
              <div className="mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.firstName} {profile?.lastName}
                </h1>
                <p className="text-gray-600 capitalize">{profile?.role}</p>
              </div>
            </div>

            <Button
              variant={isEditing ? 'primary' : 'outline'}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />

              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />

              <Input
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Country</p>
                    <p className="font-medium">{profile?.country}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-700">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {profile?.bio && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-700">{profile.bio}</p>
                </div>
              )}

              {profile?.role === 'freelancer' && (
                <>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'TypeScript', 'Node.js', 'UI/UX Design', 'Figma'].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Portfolio</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="aspect-video bg-gray-200 rounded-lg" />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
