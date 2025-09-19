import { useState, useEffect } from 'react';

interface UserPreferences {
  nickname?: string;
  ageGroup?: string;
  musicType?: string[];
  quotePreferences?: string[];
  asmrVoiceStyle?: string;
}

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState<UserPreferences>({});
  const [showSplash, setShowSplash] = useState(true);

  // Age group options
  const ageGroups = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+', 'Prefer not to say'];

  // Music type options
  const musicTypes = [
    'Classical',
    'Ambient',
    'Nature Sounds',
    'Lo-Fi',
    'Jazz',
    'Piano',
    'Meditation',
    'Binaural Beats',
    'White Noise'
  ];

  // Quote preference options
  const quoteTypes = [
    'Motivational',
    'Mindfulness',
    'Inspirational',
    'Philosophical',
    'Spiritual',
    'Positive Affirmations',
    'Scientific Facts',
    'Historical Quotes'
  ];

  // ASMR voice style options
  const voiceStyles = [
    'Calm & Soothing',
    'Whisper',
    'Gentle & Soft',
    'Professional',
    'Storytelling',
    'Guided Meditation'
  ];

  // Hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof UserPreferences, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof UserPreferences, value: string) => {
    setUserData(prev => {
      const currentValues = Array.isArray(prev[field]) ? (prev[field] as string[]) : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [field]: newValues
      };
    });
  };

  const handleComplete = () => {
    // Store data in localStorage
    localStorage.setItem('userPreferences', JSON.stringify(userData));
    console.log('User preferences saved:', userData);
    // Here you would typically send to backend
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
            <span className="text-white text-2xl font-bold">Alura</span>
          </div>
          <h1 className="text-3xl font-light text-gray-800 mb-2">Serenity Space</h1>
          <p className="text-gray-600">Your personal relaxation companion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(currentStep + 1) * 25}%` }}
          />
        </div>

        <div className="p-6">
          {currentStep === 0 && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🌿</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Welcome to Alura!
              </h2>
              <p className="text-gray-600 mb-6">
                Let's get to know you better to create a personalized experience that helps you relax and find peace.
              </p>
              <img 
                src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4feffd27-dc17-4f50-96a6-66a5cb2e44f7.png" 
                alt="Peaceful nature scene with soft morning light filtering through trees over a calm lake" 
                className="w-full rounded-lg mb-6"
              />
            </div>
          )}

          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Tell us about yourself</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nickname (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="What should we call you?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={userData.nickname || ''}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Group
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={userData.ageGroup || ''}
                    onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                  >
                    <option value="">Select your age group</option>
                    {ageGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Preferences</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What type of music helps you relax?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {musicTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleMultiSelect('musicType', type)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          userData.musicType?.includes(type)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What kind of quotes inspire you?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {quoteTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleMultiSelect('quotePreferences', type)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          userData.quotePreferences?.includes(type)
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Voice Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Preferred ASMR Voice Style
                  </label>
                  <div className="space-y-2">
                    {voiceStyles.map(style => (
                      <button
                        key={style}
                        type="button"
                        onClick={() => handleInputChange('asmrVoiceStyle', style)}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${
                          userData.asmrVoiceStyle === style
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Almost Done!</h3>
                  <p className="text-sm text-blue-600">
                    Your preferences will help us create a personalized relaxation experience just for you.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-6 py-3 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
