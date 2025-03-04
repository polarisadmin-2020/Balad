"use client";

import React, { useState } from 'react';
import { Plus, Search, Filter, Trash, Edit, Eye } from 'lucide-react';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';

// Mock data for products
const mockProducts = [
  { id: 1, name: 'Premium Headphones', category: 'Electronics', price: '$149.99', stock: 45, status: 'In Stock' },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: '$29.99', stock: 78, status: 'In Stock' },
  { id: 3, name: 'Ergonomic Keyboard', category: 'Electronics', price: '$89.99', stock: 12, status: 'Low Stock' },
  { id: 4, name: 'Ultra HD Monitor', category: 'Electronics', price: '$349.99', stock: 0, status: 'Out of Stock' },
  { id: 5, name: 'Bluetooth Speaker', category: 'Audio', price: '$79.99', stock: 34, status: 'In Stock' },
  { id: 6, name: 'Smartphone Case', category: 'Accessories', price: '$19.99', stock: 120, status: 'In Stock' },
  { id: 7, name: 'Laptop Backpack', category: 'Accessories', price: '$59.99', stock: 8, status: 'Low Stock' },
  { id: 8, name: 'Wireless Charger', category: 'Electronics', price: '$39.99', stock: 56, status: 'In Stock' },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button startIcon={<Plus className="h-4 w-4" />}>
            Add Product
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search products..." 
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm font-medium">{product.name}</td>
                    <td className="px-4 py-3 text-sm">{product.category}</td>
                    <td className="px-4 py-3 text-sm">{product.price}</td>
                    <td className="px-4 py-3 text-sm">{product.stock}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'In Stock' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-500' 
                          : product.status === 'Low Stock'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500'
                            : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="View product"
                          startIcon={<Eye className="h-4 w-4" />}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="Edit product"
                          startIcon={<Edit className="h-4 w-4" />}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="Delete product"
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
              Showing <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{mockProducts.length}</span> products
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