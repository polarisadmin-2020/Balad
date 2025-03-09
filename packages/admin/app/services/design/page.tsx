"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Plus, MoreHorizontal, X, ChevronDown, User, ShoppingCart, Search as SearchIcon, Bell, Home, Package, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import { colors } from '@monorepo/shared-ui/src/styles/colors';
import { useLanguage } from '../../../hooks/useLanguage';
import './styles/index.css';

interface LocationItem {
  id: string;
  nameAr: string;
  nameEn: string;
  children?: LocationItem[];
  level: number;
  expanded?: boolean;
}

const translations = {
  ar: {
    createFields: 'إنشاء الحقول',
    createTemplates: 'إنشاء النماذج',
    fieldTypes: 'أنواع الحقول',
    fieldCreationLocation: 'مكان إنشاء الحقول',
    search: 'البحث',
    inputFields: 'حقول الإدخال',
    choiceFields: 'حقول الاختيار',
    filesAndImages: 'الملفات والصور',
    geographicLocation: 'الموقع الجغرافي',
    loading: 'جاري التحميل...',
    retry: 'إعادة المحاولة',
    selectSubservice: 'يرجى اختيار خدمة فرعية لعرض أنواع الحقول المتاحة',
    sharedFieldsNote: 'هذه الحقول متاحة لجميع الخدمات',
    availableFieldTypes: 'أنواع الحقول المتاحة',
    textField: 'حقل نص',
    emailField: 'بريد إلكتروني',
    numberField: 'رقم',
    phoneField: 'هاتف',
    multipleChoice: 'اختيار متعدد',
    radioButton: 'زر اختيار',
    dropdown: 'قائمة منسدلة',
    fileUpload: 'تحميل ملف',
    imageUpload: 'تحميل صورة',
    locationField: 'تحديد الموقع',
    fieldNameAr: 'اسم الحقل باللغة العربية',
    fieldNameEn: 'اسم الحقل باللغة الإنجليزية',
    required: 'حقل مطلوب',
    editable: 'إمكانية التعديل',
    save: 'حفظ',
    cancel: 'إلغاء'
  },
  en: {
    createFields: 'Create Fields',
    createTemplates: 'Create Templates',
    fieldTypes: 'Field Types',
    fieldCreationLocation: 'Field Creation Location',
    search: 'Search',
    inputFields: 'Input Fields',
    choiceFields: 'Choice Fields',
    filesAndImages: 'Files & Images',
    geographicLocation: 'Geographic Location',
    loading: 'Loading...',
    retry: 'Retry',
    selectSubservice: 'Please select a subservice to view available field types',
    sharedFieldsNote: 'These fields are available for all services',
    availableFieldTypes: 'Available Field Types',
    textField: 'Text Field',
    emailField: 'Email',
    numberField: 'Number',
    phoneField: 'Phone',
    multipleChoice: 'Multiple Choice',
    radioButton: 'Radio Button',
    dropdown: 'Dropdown',
    fileUpload: 'File Upload',
    imageUpload: 'Image Upload',
    locationField: 'Location Field',
    fieldNameAr: 'Field Name in Arabic',
    fieldNameEn: 'Field Name in English',
    required: 'Required Field',
    editable: 'Editable',
    save: 'Save',
    cancel: 'Cancel'
  }
};

export default function ServiceDesignPage() {
  const { language } = useLanguage();
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('fields');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showFieldTypes, setShowFieldTypes] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedFieldType, setSelectedFieldType] = useState<string | null>(null);
  const [fieldFormData, setFieldFormData] = useState({
    nameAr: '',
    nameEn: '',
    required: false,
    editable: true
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await mockFetchLocations();
      setLocations(response);
      setError(null);
    } catch (err) {
      setError('Failed to load locations');
      console.error('Error fetching locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const mockFetchLocations = async (): Promise<LocationItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        id: 'shared',
        nameAr: 'حقول مشتركة',
        nameEn: 'Shared Fields',
        level: 0
      },
      {
        id: 'individual',
        nameAr: 'خدمات الأفراد',
        nameEn: 'Individual Services',
        level: 0,
        children: [
          {
            id: 'commercial',
            nameAr: 'الرخص التجارية',
            nameEn: 'Commercial Licenses',
            level: 1,
            children: [
              {
                id: 'issue',
                nameAr: 'إصدار رخصة',
                nameEn: 'Issue License',
                level: 2
              },
              {
                id: 'cancel',
                nameAr: 'إلغاء رخصة',
                nameEn: 'Cancel License',
                level: 2
              },
              {
                id: 'renew',
                nameAr: 'تجديد رخصة',
                nameEn: 'Renew License',
                level: 2
              }
            ]
          },
          {
            id: 'building',
            nameAr: 'رخص البناء',
            nameEn: 'Building Permits',
            level: 1
          }
        ]
      },
      {
        id: 'business',
        nameAr: 'خدمات الأعمال',
        nameEn: 'Business Services',
        level: 0
      }
    ];
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleLocationClick = (item: LocationItem) => {
    setActiveLocation(item.id);
    setSelectedLevel(item.level);
    
    setShowFieldTypes(item.id === 'shared' || item.level === 2);
    
    if (item.children?.length) {
      toggleExpanded(item.id);
    }
  };

  const handleFieldTypeClick = (fieldType: string) => {
    setSelectedFieldType(fieldType);
    setFieldFormData({
      nameAr: '',
      nameEn: '',
      required: false,
      editable: true
    });
  };

  const handleSaveField = () => {
    console.log('Saving field:', { type: selectedFieldType, ...fieldFormData });
    setSelectedFieldType(null);
    setFieldFormData({
      nameAr: '',
      nameEn: '',
      required: false,
      editable: true
    });
  };

  const renderLocationItem = (item: LocationItem) => {
    const isActive = activeLocation === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const indentLevel = item.level;
    
    return (
      <React.Fragment key={item.id}>
        <div 
          className={`location-item ${isActive ? 'active' : ''}`}
          style={{ 
            paddingInlineStart: `${indentLevel * 1.5}rem`,
            backgroundColor: isActive ? colors.sa[700] : 'transparent',
            borderRadius: isActive ? '0.375rem' : '0',
            marginInline: '0.5rem',
          }}
          onClick={() => handleLocationClick(item)}
        >
          <div className="location-item-title">
            <div className="location-item-text">
              {language === 'ar' ? item.nameAr : item.nameEn}
            </div>
            {hasChildren && (
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              />
            )}
          </div>
          {isActive && (
            <div className="location-item-indicator"></div>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="nested-location-items">
            {item.children.map(child => renderLocationItem(child))}
          </div>
        )}
      </React.Fragment>
    );
  };

  const t = (key: keyof typeof translations.ar) => {
    return translations[language][key];
  };

  const renderRightSidebar = () => {
    return (
      <div className="sidebar right-sidebar">
        <div className="sidebar-title">
          <div className="sidebar-title-text">
            {activeLocation === 'shared' ? t('sharedFieldsNote') : t('fieldTypes')}
          </div>
        </div>
        
        <div className="search-container">
          <div className="search-input-field">
            <div className="search-input-container">
              <Search className="h-4 w-4" />
              <input 
                type="text"
                placeholder={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none"
              />
            </div>
          </div>
        </div>

        {!showFieldTypes && selectedLevel !== null && selectedLevel < 2 && (
          <div className="p-6 text-center text-white/70">
            <div className="bg-white/10 rounded-lg p-4">
              <p>{t('selectSubservice')}</p>
            </div>
          </div>
        )}
        
        {(showFieldTypes || activeLocation === 'shared') && (
          <>
            <div className="category-section">
              <div className="category-title">
                <div className="category-title-text">{t('inputFields')}</div>
              </div>
              <div className="category-items">
                <div className="category-item" onClick={() => handleFieldTypeClick('textField')}>{t('textField')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('emailField')}>{t('emailField')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('numberField')}>{t('numberField')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('phoneField')}>{t('phoneField')}</div>
              </div>
            </div>
            
            <div className="category-section">
              <div className="category-title">
                <div className="category-title-text">{t('choiceFields')}</div>
              </div>
              <div className="category-items">
                <div className="category-item" onClick={() => handleFieldTypeClick('multipleChoice')}>{t('multipleChoice')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('radioButton')}>{t('radioButton')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('dropdown')}>{t('dropdown')}</div>
              </div>
            </div>
            
            <div className="category-section">
              <div className="category-title">
                <div className="category-title-text">{t('filesAndImages')}</div>
              </div>
              <div className="category-items">
                <div className="category-item" onClick={() => handleFieldTypeClick('fileUpload')}>{t('fileUpload')}</div>
                <div className="category-item" onClick={() => handleFieldTypeClick('imageUpload')}>{t('imageUpload')}</div>
              </div>
            </div>
            
            <div className="category-section">
              <div className="category-title">
                <div className="category-title-text">{t('geographicLocation')}</div>
              </div>
              <div className="category-items">
                <div className="category-item" onClick={() => handleFieldTypeClick('locationField')}>{t('locationField')}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="service-design-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="tabs-container">
        <div className="back-button-container">
          <Button 
            variant="outline" 
            className="color-black bg-white hover:bg-gray-200" 
            onClick={() => window.history.back()}
          >
            {language === 'ar' ? (
              <ChevronRight className="h-5 w-5 text-black" />
            ) : (
              <ArrowLeft className="h-5 w-5 text-black" />
            )}
          </Button>
        </div>
        
        <div className="custom-tabs">
          <a 
            href="#" 
            className={activeTab === 'fields' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('fields');
            }}
          >
            {t('createFields')}
          </a>
          <a 
            href="#" 
            className={activeTab === 'templates' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('templates');
            }}
          >
            {t('createTemplates')}
          </a>
        </div>
      </div>

      <div className="content-container">
        <div className="sidebar left-sidebar">
          <div className="sidebar-title">
            <div className="sidebar-title-text">{t('fieldCreationLocation')}</div>
          </div>
          
          {loading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">{t('loading')}</p>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              <p>{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchLocations}
                className="mt-2"
              >
                {t('retry')}
              </Button>
            </div>
          ) : (
            <div className="location-items">
              {locations.map(item => renderLocationItem(item))}
            </div>
          )}
        </div>

        <div className="main-content">
          {selectedFieldType ? (
            <Card className="field-creation-card">
              <div className="field-card-header">
                <div className="field-card-title">
                  <h3 className="text-lg font-medium">{t(selectedFieldType as keyof typeof translations.ar)}</h3>
                </div>
                <button 
                  onClick={() => setSelectedFieldType(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="field-card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('fieldNameAr')}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fieldFormData.nameAr}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, nameAr: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sa-500"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('fieldNameEn')}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fieldFormData.nameEn}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, nameEn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sa-500"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={fieldFormData.required}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, required: e.target.checked })}
                      className="rounded border-gray-300 text-sa-600 focus:ring-sa-500"
                    />
                    <span className="text-sm text-gray-700">{t('required')}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={fieldFormData.editable}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, editable: e.target.checked })}
                      className="rounded border-gray-300 text-sa-600 focus:ring-sa-500"
                    />
                    <span className="text-sm text-gray-700">{t('editable')}</span>
                  </label>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFieldType(null)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    onClick={handleSaveField}
                    style={{ backgroundColor: colors.sa[600] }}
                  >
                    {t('save')}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="text-center text-gray-500 mt-8">
              <p>{t('selectSubservice')}</p>
            </div>
          )}
        </div>

        {renderRightSidebar()}
      </div>
    </div>
  );
}