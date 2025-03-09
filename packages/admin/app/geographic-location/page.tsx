"use client";

import React from 'react';
import { ArrowRight, Plus, Search, Filter, MapPin, Edit, Trash } from 'lucide-react';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Link from 'next/link';

// Mock data for locations
const mockLocations = [
  { id: 1, name: 'الرياض', type: 'مدينة', region: 'منطقة الرياض', coordinates: '24.7136° N, 46.6753° E' },
  { id: 2, name: 'جدة', type: 'مدينة', region: 'منطقة مكة المكرمة', coordinates: '21.4858° N, 39.1925° E' },
  { id: 3, name: 'الدمام', type: 'مدينة', region: 'المنطقة الشرقية', coordinates: '26.4207° N, 50.0888° E' },
  { id: 4, name: 'مكة المكرمة', type: 'مدينة', region: 'منطقة مكة المكرمة', coordinates: '21.3891° N, 39.8579° E' },
  { id: 5, name: 'المدينة المنورة', type: 'مدينة', region: 'منطقة المدينة المنورة', coordinates: '24.5247° N, 39.5692° E' },
  { id: 6, name: 'الطائف', type: 'مدينة', region: 'منطقة مكة المكرمة', coordinates: '21.2886° N, 40.4164° E' },
  { id: 7, name: 'تبوك', type: 'مدينة', region: 'منطقة تبوك', coordinates: '28.3998° N, 36.5714° E' },
  { id: 8, name: 'بريدة', type: 'مدينة', region: 'منطقة القصيم', coordinates: '26.3292° N, 43.9708° E' },
];

export default function GeographicLocationPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredLocations = mockLocations.filter(location => 
    location.name.includes(searchTerm) ||
    location.type.includes(searchTerm) ||
    location.region.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="p-6">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:underline flex items-center gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة إلى الرئيسية
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">الموقع الجغرافي</h1>
          <p className="text-muted-foreground">إدارة المواقع الجغرافية والمناطق</p>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">المواقع</h2>
          <Button startIcon={<Plus className="h-4 w-4" />}>
            إضافة موقع جديد
          </Button>
        </div>
        
        <Card className="mb-6">
          <div className="p-4 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="البحث عن موقع..." 
                className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" startIcon={<Filter className="h-4 w-4" />}>
              تصفية
            </Button>
          </div>
        </Card>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">الاسم</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">النوع</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">المنطقة</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">الإحداثيات</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">{location.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{location.type}</td>
                    <td className="px-4 py-3 text-sm">{location.region}</td>
                    <td className="px-4 py-3 text-sm">{location.coordinates}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex justify-start gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="تعديل الموقع"
                          startIcon={<Edit className="h-4 w-4" />}
                        />
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          iconOnly 
                          aria-label="حذف الموقع"
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
              عرض <span className="font-medium">{filteredLocations.length}</span> من <span className="font-medium">{mockLocations.length}</span> مواقع
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>السابق</Button>
              <Button variant="outline" size="sm">التالي</Button>
            </div>
          </div>
        </Card>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">خريطة المواقع</h2>
          <Card>
            <div className="h-96 bg-muted/30 flex items-center justify-center">
              <p className="text-muted-foreground">سيتم عرض خريطة المواقع هنا</p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}