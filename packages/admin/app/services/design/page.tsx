"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Search, X, ChevronRight, Copy, Trash, Edit, Hash, Calendar, Phone, Mail, User, FileText, CheckSquare, MapPin, Circle, ChevronDown, File, Image, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Card from '@monorepo/shared-ui/src/components/Card/Card';
import Button from '@monorepo/shared-ui/src/components/Button/Button';
import Checkbox from '@monorepo/shared-ui/src/components/Checkbox/Checkbox';
import TextInput from '@monorepo/shared-ui/src/components/TextInput';
import { colors } from '@monorepo/shared-ui/src/styles/colors';
import { useTranslation } from '../../../hooks/useTranslation';
import './styles/index.css';

// Items per page for pagination
const ITEMS_PER_PAGE = 6;

export default function ServiceDesignPage() {
  const router = useRouter();
  const { t, language, isLoading: translationsLoading } = useTranslation();
  const [activeTab, setActiveTab] = useState('fields'); // 'fields' or 'templates'
  const [selectedCategory, setSelectedCategory] = useState('input');
  const [showContent, setShowContent] = useState(true); // Control content visibility
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginatedFields, setPaginatedFields] = useState([]);
  
  // Tab-specific pagination state
  const [fieldsTabPage, setFieldsTabPage] = useState(1);
  const [templatesTabPage, setTemplatesTabPage] = useState(1);
  
  // Field types categorized
  const fieldCategories = useMemo(() => ({
    input: [
      { id: 'text', nameAr: 'حقل نص', nameEn: 'Text Field', icon: <FileText className="h-4 w-4" /> },
      { id: 'email', nameAr: 'بريد إلكتروني', nameEn: 'Email', icon: <Mail className="h-4 w-4" /> },
      { id: 'password', nameAr: 'كلمة مرور', nameEn: 'Password', icon: <Lock className="h-4 w-4" /> },
      { id: 'number', nameAr: 'رقم', nameEn: 'Number', icon: <Hash className="h-4 w-4" /> },
      { id: 'phone', nameAr: 'رقم هاتف', nameEn: 'Phone Number', icon: <Phone className="h-4 w-4" /> },
      { id: 'textarea', nameAr: 'منطقة نص', nameEn: 'Text Area', icon: <FileText className="h-4 w-4" /> },
    ],
    choice: [
      { id: 'checkbox', nameAr: 'إختيار متعدد', nameEn: 'Checkbox', icon: <CheckSquare className="h-4 w-4" /> },
      { id: 'radio', nameAr: 'زر إختيار', nameEn: 'Radio Button', icon: <Circle className="h-4 w-4" /> },
      { id: 'select', nameAr: 'إختيار من قائمة', nameEn: 'Select', icon: <ChevronDown className="h-4 w-4" /> },
    ],
    file: [
      { id: 'file', nameAr: 'تحميل ملف', nameEn: 'File Upload', icon: <File className="h-4 w-4" /> },
      { id: 'image', nameAr: 'تحميل صورة', nameEn: 'Image Upload', icon: <Image className="h-4 w-4" /> },
    ],
    location: [
      { id: 'location', nameAr: 'تحديد الموقع الجغرافي', nameEn: 'Geographic Location', icon: <MapPin className="h-4 w-4" /> },
    ]
  }), []);

  // Location options for the right sidebar
  const locationOptions = useMemo(() => [
    { id: 'shared', nameAr: 'حقول مشتركة', nameEn: 'Shared Fields', active: true, nested: 0 },
    { id: 'individual', nameAr: 'خدمات الأفراد', nameEn: 'Individual Services', active: false, nested: 0 },
    { id: 'commercial', nameAr: 'الرخص التجارية', nameEn: 'Commercial Licenses', active: false, nested: 1 },
    { id: 'building', nameAr: 'رخص البناء', nameEn: 'Building Permits', active: false, nested: 1 },
    { id: 'issue', nameAr: 'إصدار رخصة', nameEn: 'Issue License', active: false, nested: 2 },
    { id: 'cancel', nameAr: 'إلغاء رخصة', nameEn: 'Cancel License', active: false, nested: 2 },
    { id: 'renew', nameAr: 'تجديد رخصة', nameEn: 'Renew License', active: false, nested: 2 },
    { id: 'transfer', nameAr: 'نقل ملكية رخصة', nameEn: 'Transfer License', active: false, nested: 2 },
    { id: 'business', nameAr: 'خدمات الأعمال', nameEn: 'Business Services', active: false, nested: 0 },
    { id: 'government', nameAr: 'خدمات الحكومات', nameEn: 'Government Services', active: false, nested: 0 },
  ], []);

  // Sample fields for display
  const fieldsData = useMemo(() => [
    { id: 'firstName', nameAr: 'الاسم الأول', nameEn: 'First Name', type: 'text', icon: <User className="h-4 w-4" /> },
    { id: 'lastName', nameAr: 'الاسم الرباعي', nameEn: 'Full Name', type: 'text', icon: <User className="h-4 w-4" /> },
    { id: 'email', nameAr: 'البريد الإلكتروني', nameEn: 'Email', type: 'email', icon: <Mail className="h-4 w-4" /> },
    { id: 'phone', nameAr: 'رقم الهاتف', nameEn: 'Mobile Number', type: 'tel', icon: <Phone className="h-4 w-4" /> },
    { id: 'idNumber', nameAr: 'الرقم الوطني', nameEn: 'ID Number', type: 'number', icon: <Hash className="h-4 w-4" /> },
    { id: 'date', nameAr: 'الموعد', nameEn: 'Date', type: 'date', icon: <Calendar className="h-4 w-4" /> },
    { id: 'address', nameAr: 'العنوان', nameEn: 'Address', type: 'text', icon: <MapPin className="h-4 w-4" /> },
    { id: 'city', nameAr: 'المدينة', nameEn: 'City', type: 'text', icon: <MapPin className="h-4 w-4" /> },
    { id: 'country', nameAr: 'الدولة', nameEn: 'Country', type: 'text', icon: <MapPin className="h-4 w-4" /> },
    { id: 'postalCode', nameAr: 'الرمز البريدي', nameEn: 'Postal Code', type: 'text', icon: <MapPin className="h-4 w-4" /> },
    { id: 'notes', nameAr: 'ملاحظات', nameEn: 'Notes', type: 'textarea', icon: <FileText className="h-4 w-4" /> },
    { id: 'gender', nameAr: 'الجنس', nameEn: 'Gender', type: 'select', icon: <User className="h-4 w-4" /> },
  ], []);

  // Sample templates for display
  const templatesData = useMemo(() => [
    { id: 'userProfile', nameAr: 'الملف الشخصي', nameEn: 'User Profile', type: 'form', icon: <User className="h-4 w-4" /> },
    { id: 'contactForm', nameAr: 'نموذج الاتصال', nameEn: 'Contact Form', type: 'form', icon: <Mail className="h-4 w-4" /> },
    { id: 'registration', nameAr: 'التسجيل', nameEn: 'Registration', type: 'form', icon: <FileText className="h-4 w-4" /> },
    { id: 'feedback', nameAr: 'التعليقات', nameEn: 'Feedback', type: 'form', icon: <FileText className="h-4 w-4" /> },
    { id: 'survey', nameAr: 'استطلاع', nameEn: 'Survey', type: 'form', icon: <FileText className="h-4 w-4" /> },
    { id: 'application', nameAr: 'طلب', nameEn: 'Application', type: 'form', icon: <FileText className="h-4 w-4" /> },
    { id: 'complaint', nameAr: 'شكوى', nameEn: 'Complaint', type: 'form', icon: <FileText className="h-4 w-4" /> },
    { id: 'suggestion', nameAr: 'اقتراح', nameEn: 'Suggestion', type: 'form', icon: <FileText className="h-4 w-4" /> },
  ], []);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' or 'edit'
  const [fieldData, setFieldData] = useState({
    nameAr: '',
    nameEn: '',
    required: false,
    editable: true
  });

  // Handle tab change
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    
    // Save current page for the active tab
    if (activeTab === 'fields') {
      setFieldsTabPage(currentPage);
    } else {
      setTemplatesTabPage(currentPage);
    }
    
    // Set the new active tab
    setActiveTab(tab);
    
    // Restore the page for the new tab
    if (tab === 'fields') {
      setCurrentPage(fieldsTabPage);
    } else {
      setCurrentPage(templatesTabPage);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    router.back();
  };

  // Update paginated data when tab or page changes
  useEffect(() => {
    const data = activeTab === 'fields' ? fieldsData : templatesData;
    const totalItems = data.length;
    const calculatedTotalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    setTotalPages(calculatedTotalPages);
    
    // Ensure current page is valid
    const validCurrentPage = Math.min(currentPage, calculatedTotalPages || 1);
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    // Calculate paginated items
    const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedFields(data.slice(startIndex, endIndex));
    
  }, [activeTab, currentPage, fieldsData, templatesData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // Update tab-specific page
    if (activeTab === 'fields') {
      setFieldsTabPage(page);
    } else {
      setTemplatesTabPage(page);
    }
  };

  const handleEditField = (field) => {
    setModalType('edit');
    setFieldData({
      nameAr: field.nameAr,
      nameEn: field.nameEn,
      required: false,
      editable: true
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveField = () => {
    // Save field logic would go here
    setShowModal(false);
  };

  const getName = (item) => {
    return language === 'ar' ? item.nameAr : item.nameEn;
  };

  // Custom pagination component
  const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    // Add first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }
    
    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }
    
    return (
      <div className="pagination-container">
        <button 
          className="pagination-button" 
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          {language === 'ar' ? '›' : '‹'}
        </button>
        
        {pages.map((page, index) => (
          <div 
            key={index}
            className={`pagination-number ${page === currentPage ? 'active' : ''}`}
            onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          >
            {page}
          </div>
        ))}
        
        <button 
          className="pagination-button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          {language === 'ar' ? '‹' : '›'}
        </button>
      </div>
    );
  };

  // Custom styles for the tabs component
  const tabsStyle = {
    display: 'flex',
    width: '100%',
    height: '56px',
    padding: '0px 32px 0px 72px',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexShrink: 0,
    background: '#092A1E'
  };

  return (
    <div className="service-design-container" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header with tabs */}
      <div className="tabs-container" style={tabsStyle}>
        <div className="back-button-container">
          <Button 
            variant="outline" 
            className="color-black bg-white hover:bg-gray-200" 
            onClick={handleBackClick}
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </Button>
        </div>
        
        <div className="custom-tabs">
          <a 
            href="#" 
            className={activeTab === 'fields' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('fields');
            }}
          >
            {t('fieldsTab')}
          </a>
          <a 
            href="#" 
            className={activeTab === 'templates' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleTabChange('templates');
            }}
          >
            {t('templatesTab')}
          </a>
        </div>
      </div>

      {/* Three-column layout */}
      <div className="content-container">
        {/* Left Sidebar - Field Creation Location */}
        <div className="sidebar left-sidebar">
          <div className="sidebar-title">
            <div className="sidebar-title-text">{t('fieldCreationLocation')}</div>
          </div>
          <div className="location-items">
            {locationOptions.map((option) => (
              option.nested === 0 ? (
                <div 
                  key={option.id} 
                  className={option.active ? 'location-item active' : 'location-item'}
                  style={{ paddingRight: 0 }}
                >
                  <div className="location-item-title">
                    <div className="location-item-text">
                      {getName(option)}
                    </div>
                  </div>
                  {option.active && <div className="location-item-indicator"></div>}
                </div>
              ) : (
                <div className="nested-location-items" key={option.id}>
                  <div 
                    className={option.active ? 'location-item active' : 'location-item'}
                    style={{ paddingRight: `${option.nested * 1}rem` }}
                  >
                    <div className="location-item-title">
                      <div className="location-item-text">
                        {getName(option)}
                      </div>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
          {translationsLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>جاري التحميل...</p>
            </div>
          ) : showContent ? (
            <>
              {/* Field grid - Only shown when showContent is true */}
              <div className="fields-grid">
                {paginatedFields.map(field => (
                  <Card key={field.id} className="field-card">
                    <div className="field-card-header">
                      <div className="field-card-title">
                        <div className="field-card-title-icon">
                          {field.icon}
                        </div>
                        <div className="field-card-title-text">
                          {getName(field)}
                        </div>
                      </div>
                      <div className="field-card-actions">
                        <button className="field-card-action-button">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="field-card-action-button" onClick={() => handleEditField(field)}>
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="field-card-action-button">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="field-card-body">
                      <input 
                        type={field.type} 
                        placeholder={getName(field)}
                        className="styled-input"
                      />
                      {field.type === 'date' && (
                        <Button variant="outline" className="mt-2 w-full text-sm">
                          {t('selectToday')}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="pagination-wrapper">
                {totalPages > 1 && (
                  <CustomPagination 
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </>
          ) : (
            // Empty state when showContent is false
            <div className="empty-content-container">
              <div className="empty-content-message">
                <p>{activeTab === 'fields' ? t('noFieldsMessage') : t('noTemplatesMessage')}</p>
                <Button 
                  className="mt-4"
                  onClick={() => setShowContent(true)}
                >
                  {activeTab === 'fields' ? t('addField') : t('addTemplate')}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {/* Right Sidebar - Field Types */}
        <div className="sidebar right-sidebar">
          <div className="sidebar-title">
            <div className="sidebar-title-text">{t('fieldTypes')}</div>
          </div>
          
          {/* Search input */}
          <div className="search-container">
            <div className="search-input-field">
              <div className="search-input-container">
                <div className="search-input-text">
                  <div className="search-placeholder">{t('search')}</div>
                </div>
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Field categories */}
          <div className="category-section">
            <div className="category-title">
              <div className="category-title-content">
                <div className="category-title-text">{t('textFields')}</div>
              </div>
            </div>
            <div className="category-items">
              {fieldCategories.input.map(field => (
                <div className="category-item" key={field.id}>
                  <div className="category-item-text">
                    {getName(field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="category-section">
            <div className="category-title">
              <div className="category-title-content">
                <div className="category-title-text">{t('choiceFields')}</div>
              </div>
            </div>
            <div className="category-items">
              {fieldCategories.choice.map(field => (
                <div className="category-item" key={field.id}>
                  <div className="category-item-text">
                    {getName(field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="category-section">
            <div className="category-title">
              <div className="category-title-content">
                <div className="category-title-text">{t('fileFields')}</div>
              </div>
            </div>
            <div className="category-items">
              {fieldCategories.file.map(field => (
                <div className="category-item" key={field.id}>
                  <div className="category-item-text">
                    {getName(field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="category-section">
            <div className="category-title">
              <div className="category-title-content">
                <div className="category-title-text">{t('locationFields')}</div>
              </div>
            </div>
            <div className="category-items">
              {fieldCategories.location.map(field => (
                <div className="category-item" key={field.id}>
                  <div className="category-item-text">
                    {getName(field)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">
                {modalType === 'create' ? t('createField') : t('editField')}
              </div>
              <button className="modal-close-button" onClick={handleCloseModal}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">{t('fieldNameAr')}</label>
                  <input 
                    className="styled-input"
                    value={fieldData.nameAr}
                    onChange={(e) => setFieldData({...fieldData, nameAr: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('fieldNameEn')}</label>
                  <input 
                    className="styled-input"
                    value={fieldData.nameEn}
                    onChange={(e) => setFieldData({...fieldData, nameEn: e.target.value})}
                  />
                </div>
              </div>
              <div className="checkbox-container">
                <div className="styled-checkbox">
                  <input 
                    type="checkbox"
                    checked={fieldData.editable}
                    onChange={() => setFieldData({...fieldData, editable: !fieldData.editable})}
                  />
                  <label>{t('editable')}</label>
                </div>
                <div className="styled-checkbox">
                  <input 
                    type="checkbox"
                    checked={fieldData.required}
                    onChange={() => setFieldData({...fieldData, required: !fieldData.required})}
                  />
                  <label>{t('required')}</label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="outline" onClick={handleCloseModal}>
                {t('cancel')}
              </Button>
              <Button onClick={handleSaveField}>
                {modalType === 'create' ? t('addField') : t('save')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}