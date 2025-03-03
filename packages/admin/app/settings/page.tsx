"use client";

import React from 'react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { Save, User, Lock, Bell, Globe, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-6">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <a href="#profile" className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#security" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                      <Lock className="h-4 w-4" />
                      <span>Security</span>
                    </a>
                  </li>
                  <li>
                    <a href="#notifications" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                    </a>
                  </li>
                  <li>
                    <a href="#appearance" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                      <Globe className="h-4 w-4" />
                      <span>Appearance</span>
                    </a>
                  </li>
                  <li>
                    <a href="#privacy" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                      <Shield className="h-4 w-4" />
                      <span>Privacy</span>
                    </a>
                  </li>
                  <li>
                    <a href="#billing" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                      <CreditCard className="h-4 w-4" />
                      <span>Billing</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </Card>
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <Card id="profile">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        defaultValue="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        defaultValue="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      defaultValue="john.doe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea 
                      className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={4}
                      defaultValue="Admin user with full system access."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button startIcon={<Save className="h-4 w-4" />}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card id="security">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Current Password</label>
                    <input 
                      type="password" 
                      className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button startIcon={<Save className="h-4 w-4" />}>
                      Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}