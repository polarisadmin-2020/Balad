"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Filter, Plus, MoreHorizontal, X, ChevronDown, User, ShoppingCart, Search as SearchIcon, Bell, Home, Package, Settings, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import TextInput from '@monorepo/shared-ui/src/components/TextInput/TextInput';
import Modal from '@monorepo/shared-ui/src/components/Modal/Modal';
import Switch from '@monorepo/shared-ui/src/components/Switch/Switch';
import FileUpload from '@monorepo/shared-ui/src/components/FileUpload/FileUpload';
import { colors } from '@monorepo/shared-ui/src/styles/colors';
import { useLanguage } from '../../../hooks/useLanguage';
import { useTranslation } from '../../../hooks/useTranslation';
import './styles/index.css';

interface LocationItem {
  id: string;
  nameAr: string;
  nameEn: string;
  children?: LocationItem[];
  level: number;
  expanded?: boolean;
}

export default function ServiceDesignPage() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  
  const [collapsed, setCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState('home');
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fields, setFields] = useState<Array<{
    id: string;
    arName: string;
    enName: string;
    type: string;
    icon: string | null;
    required?: boolean;
    editable?: boolean;
  }>>([]);
  const [fieldFormData, setFieldFormData] = useState({
    nameAr: '',
    nameEn: '',
    required: false,
    editable: false
  });
  const [serviceGroups, setServiceGroups] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
              },
              {
                id: 'transfer',
                nameAr: 'نقل ملكية رخصة',
                nameEn: 'Transfer License',
                level: 2
              }
            ]
          },
          {
            id: 'building',
            nameAr: 'رخص البناء',
            nameEn: 'Building Permits',
            level: 1,
            children: [
              {
                id: 'issue_building',
                nameAr: 'إصدار رخصة بناء',
                nameEn: 'Issue Building Permit',
                level: 2
              },
              {
                id: 'renew_building',
                nameAr: 'تجديد رخصة بناء',
                nameEn: 'Renew Building Permit',
                level: 2
              }
            ]
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

  const handleSaveField = () => {
    const newField = {
      id: Math.random().toString(36).substring(7),
      arName: fieldFormData.nameAr,
      enName: fieldFormData.nameEn,
      type: selectedFieldType || 'text',
      icon: null,
      required: fieldFormData.required,
      editable: fieldFormData.editable
    };

    setFields(prevFields => [...prevFields, newField]);
    
    setSelectedFieldType(null);
    setFieldFormData({
      nameAr: '',
      nameEn: '',
      required: false,
      editable: false
    });
  };

  const handleLocationClick = (item: LocationItem) => {
    setActiveLocation(item.id);
    setSelectedLevel(item.level);
    setShowFieldTypes(true);
    
    if (item.children?.length) {
      const newExpandedItems = new Set(expandedItems);
      if (newExpandedItems.has(item.id)) {
        newExpandedItems.delete(item.id);
      } else {
        newExpandedItems.add(item.id);
      }
      setExpandedItems(newExpandedItems);
    }
  };

  const renderLocationItem = (item: LocationItem, parentExpanded: boolean = true) => {
    const isActive = activeLocation === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const shouldShow = parentExpanded;
    
    if (!shouldShow) return null;

    return (
      <React.Fragment key={item.id}>
        <div 
          className={`location-item ${isActive ? 'active' : ''}`}
          style={{ 
            paddingInlineStart: `${item.level * 1.5}rem`,
            backgroundColor: isActive ? colors.sa[700] : 'transparent',
            borderRadius: isActive ? '0.375rem' : '0',
            marginInline: '0.5rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
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
            {item.children.map(child => renderLocationItem(child, isExpanded))}
          </div>
        )}
      </React.Fragment>
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
            {t('fieldsTab')}
          </a>
          <a 
            href="#" 
            className={activeTab === 'templates' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('templates');
            }}
          >
            {t('templatesTab')}
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
          {selectedFieldType && (
            <Card className="field-creation-card mb-6">
              <div className="field-card-header">
                <div className="field-card-title">
                  <h3 className="text-lg font-medium">{t(selectedFieldType)}</h3>
                </div>
                <button 
                  onClick={() => setSelectedFieldType(null)}
                  className="text-black hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="field-card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500 pl-1">*</span>
                      {t('fieldNameAr')}
                    </label>
                    <input
                      type="text"
                      value={fieldFormData.nameAr}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, nameAr: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sa-500 placeholder-gray-400"
                      placeholder="الاسم الأول"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <span className="text-red-500 pl-1">*</span>
                      {t('fieldNameEn')}
                    </label>
                    <input
                      type="text"
                      value={fieldFormData.nameEn}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, nameEn: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-sa-500 placeholder-gray-400"
                      placeholder="First name"
                      dir="ltr"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={fieldFormData.required}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, required: e.target.checked })}
                      className="rounded text-sa-600 h-5 w-5 border border-gray-400 focus:ring-sa-500 mr-2 peer peer-checked:bg-green-500"
                    />
                    <span className="text-sm text-gray-700 ml-2">
                      {t('required')}
                    </span>
                  </label>
                  <label className="flex items-center group">
                    <input
                      type="checkbox"
                      checked={fieldFormData.editable}
                      onChange={(e) => setFieldFormData({ ...fieldFormData, editable: e.target.checked })}
                      className="rounded border-gray-300 h-5 w-5 text-sa-600 focus:ring-sa-500 m-3 peer bg-red"
                    />
                    <span className="text-sm text-gray-700">{t('editable')}</span>
                  </label>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFieldType(null)}
                  >
                    {t('cancel')}
                  </Button>
                  <Button
                    onClick={handleSaveField}
                    style={{ backgroundColor: colors.sa[600], color: colors.gray[100] }}
                  >
                    {t('addField')}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {fields.length > 0 && (
            <div className="space-y-4">
              {fields.map((field) => (
                <Card 
                  key={field.id}
                  className="overflow-hidden"
                  variant="outlined"
                >
                  <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-700">{field.arName}</span>
                          <span className="text-sm text-gray-600">{field.enName}</span>
                        </div>
                      </div>
                      <div className="bg-green-50 px-3 py-1 rounded-full">
                        <span className="text-xs font-medium text-green-700">{field.type}</span>
                      </div>
                    </div>

                    {/* Field Properties */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Required</span>
                        <span>{field.required ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Editable</span>
                        <span>{field.editable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end pt-2 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFields(prevFields => prevFields.filter(f => f.id !== field.id));
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="sidebar right-sidebar">
          
          {activeLocation ? (
            <>
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

              <div className="category-section">
                <div className="category-title">
                  <div className="category-title-text">{t('textFields')}</div>
                </div>
                <div className="category-items">
                  <div className="category-item" onClick={() => setSelectedFieldType('textField')}>{t('textField')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('emailField')}>{t('emailField')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('numberField')}>{t('numberField')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('phoneField')}>{t('phoneField')}</div>
                </div>
              </div>
              
              <div className="category-section">
                <div className="category-title">
                  <div className="category-title-text">{t('choiceFields')}</div>
                </div>
                <div className="category-items">
                  <div className="category-item" onClick={() => setSelectedFieldType('multipleChoice')}>{t('multipleChoice')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('radioButton')}>{t('radioButton')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('dropdown')}>{t('dropdown')}</div>
                </div>
              </div>
              
              <div className="category-section">
                <div className="category-title">
                  <div className="category-title-text">{t('fileFields')}</div>
                </div>
                <div className="category-items">
                  <div className="category-item" onClick={() => setSelectedFieldType('fileUpload')}>{t('fileUpload')}</div>
                  <div className="category-item" onClick={() => setSelectedFieldType('imageUpload')}>{t('imageUpload')}</div>
                </div>
              </div>
              
              <div className="category-section">
                <div className="category-title">
                  <div className="category-title-text">{t('locationFields')}</div>
                </div>
                <div className="category-items">
                  <div className="category-item" onClick={() => setSelectedFieldType('locationField')}>{t('locationField')}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-white/70">
              <div className="bg-white/10 rounded-lg p-4">
                <p>{t('selectSubservice')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}