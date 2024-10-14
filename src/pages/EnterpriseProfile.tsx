import React, { useState } from 'react';

const EnterpriseProfile: React.FC = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    recruiters: [{ email: '', password: '' }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleRecruiterChange = (index: number, field: 'email' | 'password', value: string) => {
    const updatedRecruiters = [...profile.recruiters];
    updatedRecruiters[index][field] = value;
    setProfile(prev => ({ ...prev, recruiters: updatedRecruiters }));
  };

  const addRecruiter = () => {
    setProfile(prev => ({
      ...prev,
      recruiters: [...prev.recruiters, { email: '', password: '' }],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Enterprise profile updated:', profile);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Enterprise Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={profile.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Recruiters</h3>
          {profile.recruiters.map((recruiter, index) => (
            <div key={index} className="mb-2">
              <input
                type="email"
                placeholder="Email"
                value={recruiter.email}
                onChange={(e) => handleRecruiterChange(index, 'email', e.target.value)}
                className="w-full px-3 py-2 border rounded mb-1"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={recruiter.password}
                onChange={(e) => handleRecruiterChange(index, 'password', e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addRecruiter}
            className="mt-2 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Add Recruiter
          </button>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default EnterpriseProfile;