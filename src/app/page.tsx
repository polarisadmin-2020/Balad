"use client";

import { useState } from 'react';
import { ArrowRight, CheckCircle, Globe, Users, Zap } from 'lucide-react';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import { colors } from '@monorepo/shared-ui/src/styles/colors';

const features = [
  {
    icon: <Globe className="h-6 w-6 text-sa-500" />,
    title: "Global Reach",
    description: "Connect with users worldwide through our comprehensive platform"
  },
  {
    icon: <Zap className="h-6 w-6 text-sa-500" />,
    title: "Lightning Fast",
    description: "Experience blazing fast performance with our optimized infrastructure"
  },
  {
    icon: <Users className="h-6 w-6 text-sa-500" />,
    title: "Team Collaboration",
    description: "Work seamlessly with your team using our collaborative tools"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "This platform has transformed how we manage our projects. The efficiency gains are remarkable."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    content: "The best solution we've found for our team's needs. Highly recommended!"
  }
];

export default function Home() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sa-900 to-sa-950 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Build Better, Together
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Transform your ideas into reality with our powerful collaboration platform
          </p>
          <div className="flex gap-4">
            <Button 
              variant="primary"
              size="lg"
              className="bg-sa-500 hover:bg-sa-600"
              endIcon={<ArrowRight className="h-5 w-5" />}
            >
              Get Started
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-sa-50">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-700 mb-4">{testimonial.content}</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sa-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using our platform to build amazing things
          </p>
          <Button 
            variant="primary"
            size="lg"
            className="bg-white text-sa-900 hover:bg-gray-100"
            endIcon={<ArrowRight className="h-5 w-5" />}
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sa-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sa-500">About</a></li>
                <li><a href="#" className="hover:text-sa-500">Careers</a></li>
                <li><a href="#" className="hover:text-sa-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sa-500">Features</a></li>
                <li><a href="#" className="hover:text-sa-500">Pricing</a></li>
                <li><a href="#" className="hover:text-sa-500">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sa-500">Blog</a></li>
                <li><a href="#" className="hover:text-sa-500">Support</a></li>
                <li><a href="#" className="hover:text-sa-500">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-sa-500">Privacy</a></li>
                <li><a href="#" className="hover:text-sa-500">Terms</a></li>
                <li><a href="#" className="hover:text-sa-500">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-sa-800 text-center text-gray-400">
            <p>© 2025 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}