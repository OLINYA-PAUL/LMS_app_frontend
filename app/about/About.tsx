import React from "react";

const About = () => {
  return (
    <div className="min-h-screen max-sm:p-10 py-16 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-sm border-b border-gray-200 dark:border-gray-700 px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Us
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Transforming education through technology
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-b-lg px-8 py-6">
          {/* Company Overview */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Our Company
              </h2>
            </div>
            <div className="pl-16">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Founded in 2020, our Learning Management System (LMS) was
                created with a simple mission: to make quality education
                accessible to everyone. We believe in the power of technology to
                transform how people learn and grow their skills.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, our platform serves thousands of students and educators
                across the globe, providing tools that make teaching more
                effective and learning more engaging. We're proud to be at the
                forefront of educational technology innovation.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Mission & Vision
              </h2>
            </div>
            <div className="pl-16">
              <div className="mb-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Our Mission
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  To empower educators and learners with intuitive, accessible
                  technology that enhances the educational experience and makes
                  learning more effective.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                  Our Vision
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  A world where quality education is available to everyone,
                  everywhere, and where technology serves as a bridge to connect
                  knowledge with those who seek it.
                </p>
              </div>
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Our Team
              </h2>
            </div>
            <div className="pl-16">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Our diverse team brings together experts in education, software
                development, UX design, and data science. We're united by our
                passion for improving education through innovation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Sarah Johnson
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    CEO & Co-Founder
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Former educator with 15 years of experience in digital
                    learning technologies.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Michael Chen
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    CTO & Co-Founder
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Software architect specializing in educational technology
                    platforms.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Priya Patel
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    Head of Product
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    UX/UI expert focused on creating intuitive learning
                    experiences.
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    David Martinez
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                    Lead Engineer
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Full-stack developer with expertise in educational software.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Our Values
              </h2>
            </div>
            <div className="pl-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Accessibility
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Creating tools that work for everyone, regardless of
                    background or ability.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Innovation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Continuously improving our platform through research and
                    creativity.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    User-Centered
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Designing with educators and learners at the center of every
                    decision.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                    Integrity
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Operating with transparency and honesty in everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                <div className="w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Get in Touch
              </h2>
            </div>
            <div className="pl-16">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We'd love to hear from you! Whether you're interested in our
                platform, have questions about our services, or want to join our
                team, feel free to reach out.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                  <div className="mr-4 text-blue-600 dark:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      Email Us
                    </h3>
                    <a
                      href="mailto:info@yourlms.com"
                      className="text-blue-600 dark:text-blue-400 text-sm"
                    >
                      info@yourlms.com
                    </a>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center">
                  <div className="mr-4 text-blue-600 dark:text-blue-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      Call Us
                    </h3>
                    <a
                      href="tel:+23407049580678"
                      className="text-blue-600 dark:text-blue-400 text-sm"
                    >
                      (+234) 07049580678
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
                Join us in our mission to transform education through
                technology.
              </p>
              <a
                href="/contact"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
