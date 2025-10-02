import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from '../hooks/useNavigate';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Briefcase, Lightbulb, GraduationCap, Upload, Plus, X } from 'lucide-react';

const PREDEFINED_OCCUPATIONS = [
  'Graphic Designer',
  'Web Developer',
  'Mobile App Developer',
  'Video Editor',
  'Content Writer',
  'Social Media Manager',
  'SEO Specialist',
  'Virtual Assistant',
  'Data Analyst',
  'UI/UX Designer',
  'Custom'
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

export default function FreelancerOnboarding() {
  const [step, setStep] = useState(1);
  const { profile, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [basicInfo, setBasicInfo] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    country: profile?.country || '',
    profilePhoto: ''
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    occupations: [] as string[],
    customOccupation: '',
    experiences: [{ occupation: '', yearsFrom: '', yearsTo: '' }],
    languages: [] as string[],
    customLanguage: '',
    bio: ''
  });

  const [skillsPortfolio, setSkillsPortfolio] = useState({
    skills: [{ name: '', level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Expert' }],
    projects: [{ title: '', description: '', image: '', links: '' }],
    personalWebsite: ''
  });

  const [educationCerts, setEducationCerts] = useState({
    education: [{ college: '', degree: '', passoutYear: '' }],
    certifications: [{ name: '', issuedBy: '', year: '' }],
    documents: [] as string[]
  });

  const addExperience = () => {
    setProfessionalInfo({
      ...professionalInfo,
      experiences: [...professionalInfo.experiences, { occupation: '', yearsFrom: '', yearsTo: '' }]
    });
  };

  const removeExperience = (index: number) => {
    setProfessionalInfo({
      ...professionalInfo,
      experiences: professionalInfo.experiences.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    setSkillsPortfolio({
      ...skillsPortfolio,
      skills: [...skillsPortfolio.skills, { name: '', level: 'Beginner' }]
    });
  };

  const removeSkill = (index: number) => {
    setSkillsPortfolio({
      ...skillsPortfolio,
      skills: skillsPortfolio.skills.filter((_, i) => i !== index)
    });
  };

  const addProject = () => {
    setSkillsPortfolio({
      ...skillsPortfolio,
      projects: [...skillsPortfolio.projects, { title: '', description: '', image: '', links: '' }]
    });
  };

  const removeProject = (index: number) => {
    setSkillsPortfolio({
      ...skillsPortfolio,
      projects: skillsPortfolio.projects.filter((_, i) => i !== index)
    });
  };

  const addEducation = () => {
    setEducationCerts({
      ...educationCerts,
      education: [...educationCerts.education, { college: '', degree: '', passoutYear: '' }]
    });
  };

  const removeEducation = (index: number) => {
    setEducationCerts({
      ...educationCerts,
      education: educationCerts.education.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    setEducationCerts({
      ...educationCerts,
      certifications: [...educationCerts.certifications, { name: '', issuedBy: '', year: '' }]
    });
  };

  const removeCertification = (index: number) => {
    setEducationCerts({
      ...educationCerts,
      certifications: educationCerts.certifications.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      updateProfile({ onboardingCompleted: true });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleOccupation = (occupation: string) => {
    if (professionalInfo.occupations.includes(occupation)) {
      setProfessionalInfo({
        ...professionalInfo,
        occupations: professionalInfo.occupations.filter(o => o !== occupation)
      });
    } else {
      setProfessionalInfo({
        ...professionalInfo,
        occupations: [...professionalInfo.occupations, occupation]
      });
    }
  };

  const toggleLanguage = (language: string) => {
    if (professionalInfo.languages.includes(language)) {
      setProfessionalInfo({
        ...professionalInfo,
        languages: professionalInfo.languages.filter(l => l !== language)
      });
    } else {
      setProfessionalInfo({
        ...professionalInfo,
        languages: [...professionalInfo.languages, language]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
              <span className="text-sm text-gray-500">Step {step} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={basicInfo.firstName}
                  onChange={(e) => setBasicInfo({ ...basicInfo, firstName: e.target.value })}
                />
                <Input
                  label="Last Name"
                  value={basicInfo.lastName}
                  onChange={(e) => setBasicInfo({ ...basicInfo, lastName: e.target.value })}
                />
              </div>

              <Input
                label="Email"
                type="email"
                value={basicInfo.email}
                onChange={(e) => setBasicInfo({ ...basicInfo, email: e.target.value })}
              />

              <Input
                label="Phone"
                type="tel"
                value={basicInfo.phone}
                onChange={(e) => setBasicInfo({ ...basicInfo, phone: e.target.value })}
              />

              <Input
                label="Country"
                value={basicInfo.country}
                onChange={(e) => setBasicInfo({ ...basicInfo, country: e.target.value })}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Photo
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <Button variant="outline">Upload Photo</Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Briefcase className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Professional Information</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupations (Select all that apply)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PREDEFINED_OCCUPATIONS.map((occupation) => (
                    <button
                      key={occupation}
                      onClick={() => toggleOccupation(occupation)}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                        professionalInfo.occupations.includes(occupation)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {occupation}
                    </button>
                  ))}
                </div>
                {professionalInfo.occupations.includes('Custom') && (
                  <Input
                    placeholder="Enter your occupation"
                    className="mt-3"
                    value={professionalInfo.customOccupation}
                    onChange={(e) => setProfessionalInfo({ ...professionalInfo, customOccupation: e.target.value })}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                {professionalInfo.experiences.map((exp, index) => (
                  <div key={index} className="flex items-end space-x-2 mb-3">
                    <Input
                      placeholder="Occupation"
                      value={exp.occupation}
                      onChange={(e) => {
                        const newExps = [...professionalInfo.experiences];
                        newExps[index].occupation = e.target.value;
                        setProfessionalInfo({ ...professionalInfo, experiences: newExps });
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="From (Year)"
                      type="number"
                      value={exp.yearsFrom}
                      onChange={(e) => {
                        const newExps = [...professionalInfo.experiences];
                        newExps[index].yearsFrom = e.target.value;
                        setProfessionalInfo({ ...professionalInfo, experiences: newExps });
                      }}
                      className="w-32"
                    />
                    <Input
                      placeholder="To (Year)"
                      type="number"
                      value={exp.yearsTo}
                      onChange={(e) => {
                        const newExps = [...professionalInfo.experiences];
                        newExps[index].yearsTo = e.target.value;
                        setProfessionalInfo({ ...professionalInfo, experiences: newExps });
                      }}
                      className="w-32"
                    />
                    {professionalInfo.experiences.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeExperience(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addExperience}>
                  <Plus className="w-4 h-4 mr-2" /> Add Experience
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language}
                      onClick={() => toggleLanguage(language)}
                      className={`p-2 border-2 rounded-lg text-sm font-medium transition-all ${
                        professionalInfo.languages.includes(language)
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-blue-400'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
                {professionalInfo.languages.includes('Other') && (
                  <Input
                    placeholder="Enter language"
                    className="mt-3"
                    value={professionalInfo.customLanguage}
                    onChange={(e) => setProfessionalInfo({ ...professionalInfo, customLanguage: e.target.value })}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  placeholder="Tell us about your expertise and what makes you unique..."
                  value={professionalInfo.bio}
                  onChange={(e) => setProfessionalInfo({ ...professionalInfo, bio: e.target.value })}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Skills & Portfolio</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                {skillsPortfolio.skills.map((skill, index) => (
                  <div key={index} className="flex items-end space-x-2 mb-3">
                    <Input
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => {
                        const newSkills = [...skillsPortfolio.skills];
                        newSkills[index].name = e.target.value;
                        setSkillsPortfolio({ ...skillsPortfolio, skills: newSkills });
                      }}
                      className="flex-1"
                    />
                    <select
                      value={skill.level}
                      onChange={(e) => {
                        const newSkills = [...skillsPortfolio.skills];
                        newSkills[index].level = e.target.value as 'Beginner' | 'Intermediate' | 'Expert';
                        setSkillsPortfolio({ ...skillsPortfolio, skills: newSkills });
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    {skillsPortfolio.skills.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addSkill}>
                  <Plus className="w-4 h-4 mr-2" /> Add Skill
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio Projects
                </label>
                {skillsPortfolio.projects.map((project, index) => (
                  <div key={index} className="border border-gray-300 rounded-lg p-4 mb-3">
                    <Input
                      placeholder="Project title"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...skillsPortfolio.projects];
                        newProjects[index].title = e.target.value;
                        setSkillsPortfolio({ ...skillsPortfolio, projects: newProjects });
                      }}
                      className="mb-3"
                    />
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                      rows={2}
                      placeholder="Project description"
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...skillsPortfolio.projects];
                        newProjects[index].description = e.target.value;
                        setSkillsPortfolio({ ...skillsPortfolio, projects: newProjects });
                      }}
                    />
                    <Input
                      placeholder="Project links (comma-separated)"
                      value={project.links}
                      onChange={(e) => {
                        const newProjects = [...skillsPortfolio.projects];
                        newProjects[index].links = e.target.value;
                        setSkillsPortfolio({ ...skillsPortfolio, projects: newProjects });
                      }}
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" /> Upload Image
                      </Button>
                      {skillsPortfolio.projects.length > 1 && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeProject(index)}
                        >
                          <X className="w-4 h-4 mr-2" /> Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addProject}>
                  <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
              </div>

              <Input
                label="Personal Website / Portfolio URL"
                placeholder="https://"
                value={skillsPortfolio.personalWebsite}
                onChange={(e) => setSkillsPortfolio({ ...skillsPortfolio, personalWebsite: e.target.value })}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Education & Certifications</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                {educationCerts.education.map((edu, index) => (
                  <div key={index} className="flex items-end space-x-2 mb-3">
                    <Input
                      placeholder="College/University"
                      value={edu.college}
                      onChange={(e) => {
                        const newEdu = [...educationCerts.education];
                        newEdu[index].college = e.target.value;
                        setEducationCerts({ ...educationCerts, education: newEdu });
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...educationCerts.education];
                        newEdu[index].degree = e.target.value;
                        setEducationCerts({ ...educationCerts, education: newEdu });
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Year"
                      type="number"
                      value={edu.passoutYear}
                      onChange={(e) => {
                        const newEdu = [...educationCerts.education];
                        newEdu[index].passoutYear = e.target.value;
                        setEducationCerts({ ...educationCerts, education: newEdu });
                      }}
                      className="w-32"
                    />
                    {educationCerts.education.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeEducation(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addEducation}>
                  <Plus className="w-4 h-4 mr-2" /> Add Education
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certifications
                </label>
                {educationCerts.certifications.map((cert, index) => (
                  <div key={index} className="flex items-end space-x-2 mb-3">
                    <Input
                      placeholder="Certification name"
                      value={cert.name}
                      onChange={(e) => {
                        const newCerts = [...educationCerts.certifications];
                        newCerts[index].name = e.target.value;
                        setEducationCerts({ ...educationCerts, certifications: newCerts });
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Issued by"
                      value={cert.issuedBy}
                      onChange={(e) => {
                        const newCerts = [...educationCerts.certifications];
                        newCerts[index].issuedBy = e.target.value;
                        setEducationCerts({ ...educationCerts, certifications: newCerts });
                      }}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Year"
                      type="number"
                      value={cert.year}
                      onChange={(e) => {
                        const newCerts = [...educationCerts.certifications];
                        newCerts[index].year = e.target.value;
                        setEducationCerts({ ...educationCerts, certifications: newCerts });
                      }}
                      className="w-32"
                    />
                    {educationCerts.certifications.length > 1 && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeCertification(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addCertification}>
                  <Plus className="w-4 h-4 mr-2" /> Add Certification
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents (Identity / Certifications)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Drag and drop files here or click to browse</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-8 border-t">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button onClick={handleNext}>
              {step === 4 ? 'Complete Profile' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
