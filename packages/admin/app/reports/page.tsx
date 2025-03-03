"use client";

import React from 'react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import { Download, Filter, ChevronDown } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <Button startIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Report Type</label>
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none">
                  <option>Sales Report</option>
                  <option>Inventory Report</option>
                  <option>User Activity</option>
                  <option>Financial Summary</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Custom range</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Home & Kitchen</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" startIcon={<Filter className="h-4 w-4" />}>
                Apply Filters
              </Button>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-md mb-4">
                <p className="text-muted-foreground">Sales chart will be displayed here</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Sales</h3>
                  <p className="text-2xl font-bold">$24,780</p>
                  <p className="text-xs text-green-500">+12% from last period</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Orders</h3>
                  <p className="text-2xl font-bold">1,243</p>
                  <p className="text-xs text-green-500">+8% from last period</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Avg. Order Value</h3>
                  <p className="text-2xl font-bold">$19.94</p>
                  <p className="text-xs text-green-500">+3% from last period</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Conversion Rate</h3>
                  <p className="text-2xl font-bold">3.2%</p>
                  <p className="text-xs text-red-500">-1% from last period</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Units Sold</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">Premium Headphones</td>
                      <td className="px-4 py-3 text-sm">Electronics</td>
                      <td className="px-4 py-3 text-sm">$149.99</td>
                      <td className="px-4 py-3 text-sm">245</td>
                      <td className="px-4 py-3 text-sm">$36,747.55</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">Wireless Mouse</td>
                      <td className="px-4 py-3 text-sm">Electronics</td>
                      <td className="px-4 py-3 text-sm">$29.99</td>
                      <td className="px-4 py-3 text-sm">189</td>
                      <td className="px-4 py-3 text-sm">$5,668.11</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">Smartphone Case</td>
                      <td className="px-4 py-3 text-sm">Accessories</td>
                      <td className="px-4 py-3 text-sm">$19.99</td>
                      <td className="px-4 py-3 text-sm">312</td>
                      <td className="px-4 py-3 text-sm">$6,236.88</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">Bluetooth Speaker</td>
                      <td className="px-4 py-3 text-sm">Audio</td>
                      <td className="px-4 py-3 text-sm">$79.99</td>
                      <td className="px-4 py-3 text-sm">156</td>
                      <td className="px-4 py-3 text-sm">$12,478.44</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm font-medium">Laptop Backpack</td>
                      <td className="px-4 py-3 text-sm">Accessories</td>
                      <td className="px-4 py-3 text-sm">$59.99</td>
                      <td className="px-4 py-3 text-sm">98</td>
                      <td className="px-4 py-3 text-sm">$5,879.02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}