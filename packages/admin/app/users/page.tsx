"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, Trash, Edit, Eye } from 'lucide-react';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Avatar from '@monorepo/shared-ui/src/components/Avatar/Avatar';

// Mock data for users
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago' },
  { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '1 week ago' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Active', lastLogin: '3 hours ago' },
  { id: 5, name: 'Michael Wilson', email: 'michael@example.com', role: 'Viewer', status: 'Active', lastLogin: '5 days ago' },
  { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', role: 'Admin', status: 'Active', lastLogin: '1 hour ago' },
  { id: 7, name: 'David Miller', email: 'david@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2 weeks ago' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Viewer', status: 'Active', lastLogin: '4 days ago' },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          <Button startIcon={<Plus className="h-4 w-4" />}>
            Add User
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" startIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </div>
        </Card>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Login</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Avatar 
                          size="sm"
                          initials={user.name.split(' ').map(n => n[0]).join('')}
                        />
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'Admin' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500' 
                          : user.role === 'Editor'
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-500'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-500'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'Active' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                          : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="View user"
                          startIcon={<Eye className="h-4 w-4" />}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="Edit user"
                          startIcon={<Edit className="h-4 w-4" />}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="Delete user"
                          startIcon={<Trash className="h-4 w-4" />}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{mockUsers.length}</span> users
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}