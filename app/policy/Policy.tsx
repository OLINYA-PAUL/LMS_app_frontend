import React from "react";

const Policy = () => {
  return (
    <div className="min-h-screen  py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-sm border-b border-gray-200 dark:border-gray-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Last updated: May 20, 2025
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-b-lg px-8 py-6">
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              Your privacy is important to us. This policy explains how our LMS
              collects, uses, and protects your data. By using our platform, you
              agree to the practices described below.
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    1
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Information We Collect
                </h2>
              </div>
              <div className="pl-16">
                <ul className="list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Name and contact information (e.g. email address)</li>
                  <li>Course enrollments, completions, and quiz results</li>
                  <li>
                    User-generated content such as comments or submissions
                  </li>
                  <li>Device, browser, and IP address for security</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    2
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  How We Use Your Information
                </h2>
              </div>
              <div className="pl-16">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  We use the information to:
                </p>
                <ul className="list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Deliver and improve your learning experience</li>
                  <li>Monitor academic progress and course performance</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Send notifications and updates (you can opt out)</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    3
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Data Protection & Security
                </h2>
              </div>
              <div className="pl-16">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  We use modern security practices to protect your data:
                </p>
                <ul className="list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Encryption of sensitive data</li>
                  <li>Role-based access controls for internal systems</li>
                  <li>Regular security audits</li>
                  <li>
                    Secure password hashing (we never store plain passwords)
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    4
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Rights
                </h2>
              </div>
              <div className="pl-16">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  You have full control over your data. You can:
                </p>
                <ul className="list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Request a copy of your personal data</li>
                  <li>Ask for corrections or deletion of inaccurate data</li>
                  <li>Withdraw your consent at any time</li>
                  <li>Close your account and request data removal</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    5
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cookies & Tracking
                </h2>
              </div>
              <div className="pl-16">
                <p className="text-gray-700 dark:text-gray-300">
                  We use cookies to enhance your experience. These cookies help
                  us remember your preferences, analyze performance, and deliver
                  relevant content. You may disable cookies in your browser
                  settings if you prefer.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                    6
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Changes to This Policy
                </h2>
              </div>
              <div className="pl-16">
                <p className="text-gray-700 dark:text-gray-300">
                  We may update this policy from time to time. Major changes
                  will be communicated via in-app notifications or email. We
                  recommend reviewing this policy periodically.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                For any questions or concerns about this policy, please contact
                us.
              </p>
              <a
                href="mailto:support@yourlms.com"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
