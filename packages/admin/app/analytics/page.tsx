"use client";

import React from 'react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { Download, Calendar, Users, ShoppingBag, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Button variant="outline" startIcon={<Calendar className="h-4 w-4" />}>
                Last 30 days
              </Button>
            </div>
            <Button startIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                <h3 className="text-3xl font-bold">12,345</h3>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
                <h3 className="text-3xl font-bold">1,243</h3>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <ShoppingBag className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <h3 className="text-3xl font-bold">$48,290</h3>
                <div className="flex items-center mt-2 text-green-500 text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>+15% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <h3 className="text-3xl font-bold">3.2%</h3>
                <div className="flex items-center mt-2 text-red-500 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span>-1% from last month</span>
                </div>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                <TrendingUp className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Traffic Overview</h2>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">Traffic chart will be displayed here</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Traffic Sources</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Direct</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Organic Search</span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Social Media</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Referral</span>
                  <span className="font-medium">10%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">User Demographics</h2>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">Demographics chart will be displayed here</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Device Distribution</h2>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-md">
                <p className="text-muted-foreground">Device distribution chart will be displayed here</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}