import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { Building2, Target, Users as UsersIcon, FileText } from 'lucide-react';

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-commerce',
  'Marketing',
  'Real Estate',
  'Manufacturing',
  'Entertainment',
  'Non-Profit',
  'Other'
];

const SKILL_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Design (UI/UX)',
  'Content Writing',
  'Video Editing',
  'SEO & Marketing',
  'Data Analysis',
  'Virtual Assistance',
  'Translation',
  'Consulting'
];

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Chinese',
  'Japanese',
  'Hindi',
  'Arabic',
  'Portuguese',
  'Russian',
  'Other'
];

export default function ClientOnboarding() {
  const { updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    customIndustry: '',
    preferredSkills: [] as string[],
    budgetRangeMin: '',
    budgetRangeMax: '',
    languages: [] as string[],
    customLanguage: '',
    bio: ''
  });

  const toggleSkill = (skill: string) => {
    if (formData.preferredSkills.includes(skill)) {
      setFormData({
        ...formData,
        preferredSkills: formData.preferredSkills.filter(s => s !== skill)
      });
    } else {
      setFormData({
        ...formData,
        preferredSkills: [...formData.preferredSkills, skill]
      });
    }
  };

  const toggleLanguage = (language: string) => {
    if (formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter(l => l !== language)
      });
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, language]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      companyName: formData.companyName,
      industry: formData.industry === 'Other' ? formData.customIndustry : formData.industry,
      preferredSkills: formData.preferredSkills,
      budgetRangeMin: parseFloat(formData.budgetRangeMin),
      budgetRangeMax: parseFloat(formData.budgetRangeMax),
      languages: formData.languages,
      bio: formData.bio,
      onboardingCompleted: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Client Profile</h1>
            <p className="text-gray-600">Tell us about your business and hiring needs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
              </div>

              <Input
                label="Company / Individual Name"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an industry</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              {formData.industry === 'Other' && (
                <Input
                  placeholder="Please specify your industry"
                  value={formData.customIndustry}
                  onChange={(e) => setFormData({ ...formData, customIndustry: e.target.value })}
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Hiring Preferences</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Skills (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {SKILL_CATEGORIES.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        formData.preferredSkills.includes(skill)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range per Project (USD)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Minimum"
                    value={formData.budgetRangeMin}
                    onChange={(e) => setFormData({ ...formData, budgetRangeMin: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Maximum"
                    value={formData.budgetRangeMax}
                    onChange={(e) => setFormData({ ...formData, budgetRangeMax: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <UsersIcon className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Communication</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => toggleLanguage(language)}
                      className={`p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                        formData.languages.includes(language)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
                {formData.languages.includes('Other') && (
                  <Input
                    placeholder="Enter language"
                    className="mt-3"
                    value={formData.customLanguage}
                    onChange={(e) => setFormData({ ...formData, customLanguage: e.target.value })}
                  />
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">About Your Projects</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Tell us about the type of freelancers you are looking for and the projects you typically need help with..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t">
              <Button type="submit" size="lg">
                Complete Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
