
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../utils/auth';

function HomePage() {
  const authenticated = isAuthenticated();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: '💰',
      title: 'Track Expenses',
      description:
        'Log every expense with title, amount, date, and category in one organized dashboard.',
    },
    {
      icon: '📊',
      title: 'Spending Summary',
      description:
        "Get a bird's-eye view of your finances with total spending and expense count at a glance.",
    },
    {
      icon: '🏷️',
      title: 'Smart Categories',
      description:
        'Organize expenses into categories like Food, Travel, Bills — or create your own.',
    },
    {
      icon: '📝',
      title: 'Full CRUD',
      description:
        'Create, view, update, and delete expenses effortlessly with a clean interface.',
    },
    {
      icon: '🔐',
      title: 'Secure & Private',
      description:
        'JWT authentication with Spring Security keeps your financial data safe.',
    },
    {
      icon: '📱',
      title: 'Responsive Design',
      description:
        'Works seamlessly across desktop, tablet, and mobile devices.',
    },
  ];

  const techStack = [
    { name: 'React', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Spring Boot', color: 'bg-green-100 text-green-700' },
    { name: 'Spring Security', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'JWT', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'PostgresSQL', color: 'bg-blue-100 text-blue-700' },
    { name: 'Tailwind CSS', color: 'bg-sky-100 text-sky-700' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ─── Hero Section ─── */}
      <section className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-50 blur-3xl" />
        </div>

        <div
          className={`text-center max-w-3xl relative z-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Full-Stack Spring Boot + React
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Expense{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tracker
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track daily expenses, categorize spending, and view summaries —
            all in one clean, secure application.
          </p>

          {authenticated ? (
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5"
            >
              Go to Dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5"
              >
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 text-lg font-semibold px-8 py-4 rounded-xl border border-gray-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            </div>
          )}

          <div className="mt-12">
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-3 font-semibold">
              Built With
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tech.color} transition-transform duration-200 hover:scale-105 cursor-default`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section className="py-20 px-4 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Everything You <span className="text-indigo-600">Need</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Simple yet powerful features to manage your personal finances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      {!authenticated && (
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 shadow-xl shadow-indigo-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Ready to track your spending?
              </h2>
              <p className="text-indigo-100 mb-6">
                Create a free account and get started in seconds.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
              >
                Create Free Account
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <footer className="py-6 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Expense Tracker — Spring Boot + React</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/aman-origin" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/aman-in" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;