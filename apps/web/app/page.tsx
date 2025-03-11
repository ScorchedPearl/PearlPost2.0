"use client"
import React, { useEffect, useState } from 'react';
import { MessageSquare, Users, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import ChatBot from './_chatbot/page';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <nav className="fixed w-full bg-white/10 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">ConnectHub</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 hover:text-indigo-400 transition-colors">Features</button>
                <button className="px-4 py-2 hover:text-indigo-400 transition-colors">About</button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center h-screen">
  <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center">
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Connect. Share. <span className="text-indigo-400">Thrive.</span>
        </h1>
        <p
          className={`text-xl max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Join millions of people who use ConnectHub to share ideas, discover new connections, and build meaningful relationships.
        </p>
        <div
          className={`transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center group">
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>


      <div className="py-20 bg-gradient-to-br from-gray-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-800 to-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <MessageSquare className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Chat</h3>
              <p>Connect instantly with friends and colleagues through our lightning-fast messaging system.</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-800 to-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <Users className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Groups</h3>
              <p>Join communities that share your interests and passions.</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-800 to-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <TrendingUp className="h-12 w-12 text-indigo-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trending Topics</h3>
              <p>Stay updated with what's popular and trending in your network.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gradient-to-br from-gray-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-12">Trusted by millions worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-400">2M+</span>
              <span className="mt-2">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-400">500K+</span>
              <span className="mt-2">Communities</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-400">10M+</span>
              <span className="mt-2">Messages Daily</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-indigo-600">150+</span>
              <span className="text-gray-600 mt-2">Countries</span>
            </div>
          </div>
        </div>
      </div>
      <ChatBot></ChatBot>
    </div>
  );
}

export default App;
 
