const AboutPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">About Our HRM System</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 mb-4">
          Our mission is to provide a comprehensive human resource management solution that helps businesses
          streamline their HR processes, improve employee engagement, and make data-driven decisions.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Key Features</h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-2">
          <li>Employee Information Management</li>
          <li>Time and Attendance Tracking</li>
          <li>Payroll Management</li>
          <li>Performance Evaluation</li>
          <li>Training and Development</li>
          <li>Recruitment and Onboarding</li>
        </ul>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-2">For more information, please contact:</p>
        <p className="text-gray-600">Email: info@hrmsystem.com</p>
        <p className="text-gray-600">Phone: (123) 456-7890</p>
      </div>
    </div>
  )
}

export default AboutPage
