"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Filter, Plus, MoreHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import TextInput from '@monorepo/shared-ui/src/components/TextInput/TextInput';
import Modal from '@monorepo/shared-ui/src/components/Modal/Modal';
import Switch from '@monorepo/shared-ui/src/components/Switch/Switch';
import FileUpload from '@monorepo/shared-ui/src/components/FileUpload';
import TableOfContent from '@monorepo/shared-ui/src/components/TableOfContent';
import { colors } from '@monorepo/shared-ui/src/styles/colors';

const columns = [
  { key: 'arName', header: 'الاسم بالعربية', width: '30%' },
  { key: 'enName', header: 'الاسم بالنجليزي', width: '25%' },
  { key: 'status', header: 'الحالة', width: '20%' },
];

interface ServiceGroup {
  id: number;
  arabic_name: string;
  english_name: string;
  is_active: boolean;
}

interface Service {
  id: number;
  arabic_name: string;
  english_name: string;
  group: string;
  is_active: boolean;
}

interface SubService {
  id: number;
  arabic_name: string;
  english_name: string;
  service: string;
  is_active: boolean;
}

export default function ServiceDefinitionPage() {
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [subServices, setSubServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('serviceGroup');

  const [createModal, setCreateModal] = useState({
    show: false,
    type: null
  });

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

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'serviceGroup') {
      fetchServiceGroups();
    } else if (activeTab === 'services') {
      fetchServices();
    } else if (activeTab === 'subServices') {
      fetchSubServices();
    }
  }, [activeTab]);

  const fetchServiceGroups = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/crm/api/v1/services/groups/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setServiceGroups(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching service groups:", err);
      setError("Failed to load service groups. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/crm/api/v1/services/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubServices = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/crm/api/v1/services/subservice/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubServices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Error fetching subservices:", err);
      setError("Failed to load subservices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files: any[]) => {
    setUploadedFiles(files);
  };

const handleCreate = async () => {
  try {
    if (activeTab === 'serviceGroup' ){
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("API URL is not defined!");
    
    const formData = new FormData();
    formData.append('arabic_name', newServiceGroup.nameAr);
    formData.append('english_name', newServiceGroup.nameEn);
    formData.append('is_active', newServiceGroup.isActive);
      

    if (uploadedFiles.length > 0) {
      formData.append('service_image', uploadedFiles[0]);
    }

    const response = await fetch(`${apiUrl}/crm/api/v1/services/groups/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Service group created:', data);

    setCreateModal({ show: false, type: null });
    resetForms();
    await fetchServiceGroups();
    }else if (activeTab === 'services'){
       const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("API URL is not defined!");
    
    const formData = new FormData();
    formData.append('arabic_name', newService.nameAr);
    formData.append('english_name', newService.nameEn);
    formData.append('is_active', newService.isActive);
          formData.append('service_group',newService.group);


    if (uploadedFiles.length > 0) {
      formData.append('service_image', uploadedFiles[0]);
    }

    const response = await fetch(`${apiUrl}/crm/api/v1/services/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('SubService  created:', data);

    setCreateModal({ show: false, type: null });
    resetForms();
    await fetchServices();
    }else{ const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) throw new Error("API URL is not defined!");
    
    const formData = new FormData();
    formData.append('arabic_name', newSubService.nameAr);
    formData.append('english_name', newSubService.nameEn);
    formData.append('is_active', newSubService.isActive);
          formData.append('service_group',newSubService.Number(service));


    if (uploadedFiles.length > 0) {
      formData.append('service_image', uploadedFiles[0]);
    }

    const response = await fetch(`${apiUrl}/crm/api/v1/services/subservice/`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Service  created:', data);

    setCreateModal({ show: false, type: null });
    resetForms();
    await fetchSubServices();
    }
    
    
  } catch (error) {
    console.error(`Error creating :${activeTab}`, error);
    // setError('حدث خطأ أثناء الإضافة. حاول مرة أخرى.');
  }
};
  const resetForms = () => {
    setNewServiceGroup({ nameAr: '', nameEn: '', isActive: true });
    setNewService({ nameAr: '', nameEn: '', group: '', status: 'فعال', attachments: [] });
    setNewSubService({ nameAr: '', nameEn: '', service: '', status: 'فعال', attachments: [] });
    setUploadedFiles([]);
  };

  const getFilteredData = () => {
    if (activeTab === 'serviceGroup') {
      return serviceGroups.filter(group => 
        group.arabic_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        group.english_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'services') {
      return services.filter(service => 
        service.arabic_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        service.english_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.group?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'subServices') {
      return subServices.filter(subService => 
        subService.arabic_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        subService.english_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subService.service?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  };

  const sections = [
    {
      Name: activeTab === 'serviceGroup' ? 'مجموعات الخدمات' : 
            activeTab === 'services' ? 'الخدمات' : 'الخدمات الفرعية',
      Target: activeTab,
      Children: getFilteredData().map(item => ({
        arName: item.arabic_name,
        enName: item.english_name,
        Target: `${activeTab}-${item.id}`,
        status: item.is_active ? 'فعال' : 'غير فعال',
        Children: []
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Card className="m-6">
        <div className="w-[80%] mx-auto">
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

          <Card 
            variant="outlined" 
            className="p-0 overflow-hidden border border-border"
            style={{ backgroundColor: '#F8FAFC' }}
          >
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

            <div className="p-6" dir="rtl">
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

              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-sm text-muted-foreground">جاري التحميل...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              ) : getFilteredData().length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {activeTab === 'serviceGroup' ? 'لا توجد مجموعات خدمات' : 'لا توجد خدمات'}
                </div>
              ) : (
                <TableOfContent
                  sections={sections}
                  columns={columns}
                />
              )}
            </div>
          </Card>
        </div>
      </Card>

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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المرفقات
                </label>
                <FileUpload
                  multiple={true}
                  accept=".jpg,.jpeg,.png,.pdf"
                  getUploadedFile={handleFileUpload}
                  title="قم بإسقاط الملفات هنا"
                  fileTypesText="يمكنك رفع ملفات بصيغة JPG, PNG, PDF"
                  actionName="اختر ملف"
                  maximumFilesSize={5}
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
                  المرفقات
                </label>
                <FileUpload
                  multiple={true}
                  accept=".jpg,.jpeg,.png,.pdf"
                  getUploadedFile={handleFileUpload}
                  title="قم بإسقاط الملفات هنا"
                  fileTypesText="يمكنك رفع ملفات بصيغة JPG, PNG, PDF"
                  actionName="اختر ملف"
                  maximumFilesSize={5}
                />
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
                    <option key={service.id} value={service.arabic_name}>
                      {service.arabic_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المرفقات
                </label>
                <FileUpload
                  multiple={true}
                  accept=".jpg,.jpeg,.png,.pdf"
                  getUploadedFile={handleFileUpload}
                  title="قم بإسقاط الملفات هنا"
                  fileTypesText="يمكنك رفع ملفات بصيغة JPG, PNG, PDF"
                  actionName="اختر ملف"
                  maximumFilesSize={5}
                />
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