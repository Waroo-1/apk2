import { useState } from 'react';
import { Star, MapPin, Search, Filter } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const MOCK_FREELANCERS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'UI/UX Designer',
    location: 'New York, USA',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    bio: 'Experienced designer with 8+ years creating beautiful, user-friendly interfaces',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    location: 'San Francisco, USA',
    rating: 5.0,
    reviews: 89,
    hourlyRate: 95,
    skills: ['React', 'Node.js', 'TypeScript'],
    bio: 'Building scalable web applications with modern tech stacks',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Content Writer',
    location: 'London, UK',
    rating: 4.8,
    reviews: 213,
    hourlyRate: 55,
    skills: ['SEO', 'Copywriting', 'Technical Writing'],
    bio: 'Crafting compelling content that drives engagement and conversions',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Video Editor',
    location: 'Toronto, Canada',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 75,
    skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
    bio: 'Creating stunning videos that tell your story',
    avatar: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg'
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    role: 'Social Media Manager',
    location: 'Miami, USA',
    rating: 4.7,
    reviews: 98,
    hourlyRate: 65,
    skills: ['Instagram', 'Facebook Ads', 'Analytics'],
    bio: 'Growing brands through strategic social media campaigns',
    avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg'
  },
  {
    id: '6',
    name: 'Robert Taylor',
    role: 'Mobile App Developer',
    location: 'Austin, USA',
    rating: 5.0,
    reviews: 74,
    hourlyRate: 90,
    skills: ['React Native', 'iOS', 'Android'],
    bio: 'Building beautiful mobile experiences for iOS and Android',
    avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg'
  }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Freelancers</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by skills, name, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="writing">Writing</option>
            <option value="video">Video & Animation</option>
            <option value="marketing">Marketing</option>
          </select>

          <Button variant="outline">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_FREELANCERS.map((freelancer) => (
          <div key={freelancer.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-blue-400 to-indigo-500" />
            <div className="p-6 -mt-16">
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-24 h-24 rounded-full border-4 border-white mx-auto mb-4 object-cover"
              />

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{freelancer.name}</h3>
                <p className="text-gray-600 mb-2">{freelancer.role}</p>

                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{freelancer.rating}</span>
                  <span className="text-gray-500 text-sm">({freelancer.reviews})</span>
                </div>

                <div className="flex items-center justify-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {freelancer.location}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 text-center">{freelancer.bio}</p>

              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {freelancer.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Starting at</p>
                  <p className="text-lg font-bold text-gray-900">${freelancer.hourlyRate}/hr</p>
                </div>
                <Button size="sm">View Profile</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
