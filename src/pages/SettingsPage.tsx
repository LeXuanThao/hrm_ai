import { useState } from 'react'
import { useSetting, useTheme } from '../providers'

const SettingsPage = () => {
  const { settings, updateSetting } = useSetting()
  const { theme, setTheme } = useTheme()
  const [notification, setNotification] = useState(settings.notifications || false)
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
  }
  
  const handleNotificationChange = (enabled: boolean) => {
    setNotification(enabled)
    updateSetting('notifications', enabled)
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Theme</label>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange('light')}
              className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Light
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Dark
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`px-4 py-2 rounded ${theme === 'system' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              System
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex items-center">
          <label htmlFor="notifications" className="mr-4">Enable Notifications</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="notifications"
              className="absolute w-6 h-6 opacity-0 cursor-pointer"
              checked={notification}
              onChange={(e) => handleNotificationChange(e.target.checked)}
            />
            <div className={`w-12 h-6 transition-all rounded-full ${notification ? 'bg-blue-500' : 'bg-gray-300'}`}>
              <div 
                className={`absolute w-6 h-6 transition bg-white rounded-full shadow-md transform ${notification ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-gray-600 mb-4">Manage your account preferences and personal information.</p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Update Profile
        </button>
      </div>
    </div>
  )
}

export default SettingsPage
