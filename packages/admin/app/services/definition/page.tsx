"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Filter, Plus, MoreHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import TextInput from '@monorepo/shared-ui/src/components/TextInput/TextInput';
import Modal from '@monorepo/shared-ui/src/components/Modal/Modal';
import Switch from '@monorepo/shared-ui/src/components/Switch/Switch';
import { colors } from '@monorepo/shared-ui/src/styles/colors';

// Mock data for initial development
const mockServiceGroups = [
  { id: 1, arabic_name: 'مجموعة 1', english_name: 'Group 1', is_active: true },
  { id: 2, arabic_name: 'مجموعة 2', english_name: 'Group 2', is_active: false }
];

export default function ServiceDefinitionPage() {
  // State for services data
  const [serviceGroups, setServiceGroups] = useState(mockServiceGroups);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('serviceGroup');

  // Modal states
  const [createModal, setCreateModal] = useState({
    show: false,
    type: null
  });

  // Form states
  const [newServiceGroup, setNewServiceGroup] = useState({
    nameAr: '',
    nameEn: '',
    isActive: true
  });

  const [newService, setNewService] = useState({
    nameAr: '',
    nameEn: '',
    group: '',
    status: 'فعال',
    attachments: []
  });

  const [newSubService, setNewSubService] = useState({
    nameAr: '',
    nameEn: '',
    service: '',
    status: 'فعال',
    attachments: []
  });

  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/services/${activeTab}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      switch (activeTab) {
        case 'serviceGroup':
          setServiceGroups(Array.isArray(data) ? data : mockServiceGroups);
          break;
        case 'services':
          setServices(Array.isArray(data) ? data : []);
          break;
        case 'subServices':
          setSubServices(Array.isArray(data) ? data : []);
          break;
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
      
      // Fallback to mock data in case of error
      if (activeTab === 'serviceGroup') {
        setServiceGroups(mockServiceGroups);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG files are allowed');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      
      // Add form data based on modal type
      const formValues = createModal.type === 'serviceGroup' ? newServiceGroup :
                        createModal.type === 'services' ? newService : newSubService;
      
      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add file if selected
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const response = await fetch(`https://172.16.2.57/crm/api/services/${createModal.type}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchData();
      setCreateModal({ show: false, type: null });
      resetForms();
    } catch (err) {
      console.error("Error creating item:", err);
      setError("Failed to create item. Please try again.");
    }
  };

  const resetForms = () => {
    setNewServiceGroup({ nameAr: '', nameEn: '', isActive: true });
    setNewService({ nameAr: '', nameEn: '', group: '', status: 'فعال', attachments: [] });
    setNewSubService({ nameAr: '', nameEn: '', service: '', status: 'فعال', attachments: [] });
    setSelectedFile(null);
  };

  const getActiveData = () => {
    switch (activeTab) {
      case 'serviceGroup':
        return serviceGroups.filter(group => 
          group.arabic_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          group.english_name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'services':
        return services.filter(service => 
          service.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          service.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.group?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      case 'subServices':
        return subServices.filter(subService => 
          subService.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) || 
          subService.nameEn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subService.service?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Card className="m-6">
        <div className="w-[80%] mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center gap-4">
            <Link href="/">
              <Button 
                variant="outline" 
                size="sm" 
                iconOnly 
                aria-label="العودة إلى الرئيسية"
                className="bg-sa-600 text-white border-sa-700 hover:bg-sa-500"
                style={{ backgroundColor: colors.sa[600], borderColor: colors.sa[700], color: 'white' }}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-3xl">تعريف الخدمات</h1>
          </div>

          {/* Content Card */}
          <Card 
            variant="outlined" 
            className="p-0 overflow-hidden border border-border"
            style={{ backgroundColor: '#F8FAFC' }}
          >
            {/* Tabs */}
            <div dir="rtl" className="border-b border-border bg-white">
              <div className="grid grid-cols-3 w-full">
                <button
                  className={`py-3 font-medium text-sm relative text-center transition-colors ${
                    activeTab === 'serviceGroup' 
                      ? 'text-sa-600 bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveTab('serviceGroup')}
                >
                  مجموعة الخدمات
                  {activeTab === 'serviceGroup' && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5" 
                      style={{ backgroundColor: colors.sa[600] }}
                    ></div>
                  )}
                </button>
                <button
                  className={`py-3 font-medium text-sm relative text-center transition-colors ${
                    activeTab === 'services' 
                      ? 'text-sa-600 bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveTab('services')}
                >
                  الخدمات
                  {activeTab === 'services' && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5" 
                      style={{ backgroundColor: colors.sa[600] }}
                    ></div>
                  )}
                </button>
                <button
                  className={`py-3 font-medium text-sm relative text-center transition-colors ${
                    activeTab === 'subServices' 
                      ? 'text-sa-600 bg-background' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveTab('subServices')}
                >
                  الخدمات الفرعية
                  {activeTab === 'subServices' && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5" 
                      style={{ backgroundColor: colors.sa[600] }}
                    ></div>
                  )}
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6" dir="rtl">
              {/* Search and Create Button */}
              <div className="mb-6 flex justify-between items-center">
                <div className="flex items-center">
                  <TextInput
                    placeholder="البحث باسم الخدمة"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[300px]"
                    style={{ backgroundColor: 'white' }}
                  />
                  <Button
                    variant="primary"
                    iconOnly
                    className="mr-2"
                    style={{ 
                      backgroundColor: colors.sa[600], 
                      color: 'white',
                      width: '40px',
                      height: '40px',
                      padding: 0,
                      borderRadius: '4px'
                    }}
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button 
                  variant="primary" 
                  style={{ 
                    backgroundColor: colors.sa[600], 
                    color: 'white',
                    minWidth: '200px'
                  }}
                  size="lg"
                  startIcon={<Plus className="h-4 w-4" />}
                  onClick={() => setCreateModal({ show: true, type: activeTab })}
                >
                  {activeTab === 'serviceGroup' ? 'إنشاء مجموعة جديدة' :
                   activeTab === 'services' ? 'إنشاء خدمة جديدة' :
                   'إنشاء خدمة فرعية جديدة'}
                </Button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        {activeTab === 'serviceGroup' && (
                          <>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم المجموعة باللغة العربية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم المجموعة باللغة الإنجليزية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">الحالة</th>
                            <th className="py-4 px-4 text-center font-medium text-gray-600"></th>
                          </>
                        )}
                        {activeTab === 'services' && (
                          <>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم الخدمة باللغة العربية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم الخدمة باللغة الإنجليزية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">المجموعة</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">الحالة</th>
                            <th className="py-4 px-4 text-center font-medium text-gray-600"></th>
                          </>
                        )}
                        {activeTab === 'subServices' && (
                          <>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم الخدمة الفرعية باللغة العربية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">اسم الخدمة الفرعية باللغة الإنجليزية</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">الخدمة</th>
                            <th className="py-4 px-4 text-right font-medium text-gray-600">الحالة</th>
                            <th className="py-4 px-4 text-center font-medium text-gray-600"></th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {getActiveData().map((item, index) => (
                        <tr 
                          key={item.id} 
                          className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                        >
                          {activeTab === 'serviceGroup' ? (
                            <>
                              <td className="py-4 px-4 text-gray-800">{item.arabic_name}</td>
                              <td className="py-4 px-4 text-gray-800">{item.english_name}</td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  item.is_active 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.is_active ? 'فعال' : 'غير فعال'}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                  <MoreHorizontal className="h-5 w-5" />
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="py-4 px-4 text-gray-800">{item.nameAr}</td>
                              <td className="py-4 px-4 text-gray-800">{item.nameEn}</td>
                              <td className="py-4 px-4 text-gray-800">
                                {activeTab === 'services' ? item.group : item.service}
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  item.status === 'فعال' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-center">
                                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                  <MoreHorizontal className="h-5 w-5" />
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* Create Modal */}
      <Modal
        show={createModal.show}
        title={createModal.type === 'serviceGroup' ? 'إنشاء مجموعة جديدة' :
              createModal.type === 'services' ? 'إنشاء خدمة جديدة' :
              'إنشاء خدمة فرعية جديدة'}
        onClose={() => {
          setCreateModal({ show: false, type: null });
          resetForms();
        }}
        buttonsList={[
          {
            id: 'cancel',
            label: 'إلغاء',
            onClick: () => {
              setCreateModal({ show: false, type: null });
              resetForms();
            },
            extraClass: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          },
          {
            id: 'save',
            label: 'حفظ',
            onClick: handleCreate,
            extraClass: 'bg-sa-600 hover:bg-sa-700 text-white'
          }
        ]}
      >
        <div className="space-y-4">
          {createModal.type === 'serviceGroup' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المجموعة باللغة العربية
                  </label>
                  <TextInput
                    value={newServiceGroup.nameAr}
                    onChange={(e) => setNewServiceGroup({ ...newServiceGroup, nameAr: e.target.value })}
                    placeholder="أدخل اسم المجموعة باللغة العربية"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المجموعة باللغة الإنجليزية
                  </label>
                  <TextInput
                    value={newServiceGroup.nameEn}
                    onChange={(e) => setNewServiceGroup({ ...newServiceGroup, nameEn: e.target.value })}
                    placeholder="Enter group name in English"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <Switch
                  checked={newServiceGroup.isActive}
                  onChange={(e) => setNewServiceGroup({ ...newServiceGroup, isActive: e.target.checked })}
                  label="تفعيل المجموعة"
                />
              </div>
            </>
          )}

          {createModal.type === 'services' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الخدمة باللغة العربية
                  </label>
                  <TextInput
                    value={newService.nameAr}
                    onChange={(e) => setNewService({ ...newService, nameAr: e.target.value })}
                    placeholder="أدخل اسم الخدمة باللغة العربية"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الخدمة باللغة الإنجليزية
                  </label>
                  <TextInput
                    value={newService.nameEn}
                    onChange={(e) => setNewService({ ...newService, nameEn: e.target.value })}
                    placeholder="Enter service name in English"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المجموعة
                </label>
                <select
                  value={newService.group}
                  onChange={(e) => setNewService({ ...newService, group: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sa-500 focus:outline-none focus:ring-1 focus:ring-sa-500"
                >
                  <option value="">اختر المجموعة</option>
                  {serviceGroups.map((group) => (
                    <option key={group.id} value={group.arabic_name}>
                      {group.arabic_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رفع المرفقات
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-sa-600 hover:text-sa-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sa-500"
                      >
                        <span>اختيار الملف</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png"
                        />
                      </label>
                      <p className="pr-1">أو اسحب وأفلت</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Maximum file size allowed is 5MB, supported file formats include .jpg and .png
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Switch
                  checked={newService.status === 'فعال'}
                  onChange={(e) => setNewService({ ...newService, status: e.target.checked ? 'فعال' : 'غير فعال' })}
                  label="تفعيل الخدمة"
                />
              </div>
            </>
          )}

          {createModal.type === 'subServices' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الخدمة الفرعية باللغة العربية
                  </label>
                  <TextInput
                    value={newSubService.nameAr}
                    onChange={(e) => setNewSubService({ ...newSubService, nameAr: e.target.value })}
                    placeholder="أدخل اسم الخدمة الفرعية باللغة العربية"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم الخدمة الفرعية باللغة الإنجليزية
                  </label>
                  <TextInput
                    value={newSubService.nameEn}
                    onChange={(e) => setNewSubService({ ...newSubService, nameEn: e.target.value })}
                    placeholder="Enter sub-service name in English"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  الخدمة
                </label>
                <select
                  value={newSubService.service}
                  onChange={(e) => setNewSubService({ ...newSubService, service: e.target.value })}
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-sa-500 focus:outline-none focus:ring-1 focus:ring-sa-500"
                >
                  <option value="">اختر الخدمة</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.nameAr}>
                      {service.nameAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رفع المرفقات
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-sa-600 hover:text-sa-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sa-500"
                      >
                        <span>اختيار الملف</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".jpg,.jpeg,.png"
                        />
                      </label>
                      <p className="pr-1">أو اسحب وأفلت</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Maximum file size allowed is 5MB, supported file formats include .jpg and .png
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Switch
                  checked={newSubService.status === 'فعال'}
                  onChange={(e) => setNewSubService({ ...newSubService, status: e.target.checked ? 'فعال' : 'غير فعال' })}
                  label="تفعيل الخدمة الفرعية"
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}