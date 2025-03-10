// Field types categorized by group
export const fieldCategories = {
  input: [
    { id: 'text', nameAr: 'حقل نص', nameEn: 'Text Field' },
    { id: 'email', nameAr: 'بريد إلكتروني', nameEn: 'Email' },
    { id: 'password', nameAr: 'كلمة مرور', nameEn: 'Password' },
    { id: 'number', nameAr: 'رقم', nameEn: 'Number' },
    { id: 'phone', nameAr: 'رقم هاتف', nameEn: 'Phone Number' },
    { id: 'textarea', nameAr: 'منطقة نص', nameEn: 'Text Area' },
  ],
  choice: [
    { id: 'checkbox', nameAr: 'إختيار متعدد', nameEn: 'Checkbox' },
    { id: 'radio', nameAr: 'زر إختيار', nameEn: 'Radio Button' },
    { id: 'select', nameAr: 'إختيار من قائمة', nameEn: 'Select' },
  ],
  file: [
    { id: 'file', nameAr: 'تحميل ملف', nameEn: 'File Upload' },
    { id: 'image', nameAr: 'تحميل صورة', nameEn: 'Image Upload' },
  ],
  location: [
    { id: 'location', nameAr: 'تحديد الموقع الجغرافي', nameEn: 'Geographic Location' },
  ]
};

// Location options for the right sidebar
export const locationOptions = [
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
];

// Sample fields for display
export const sampleFields = [
  { id: 'firstName', nameAr: 'الاسم الأول', nameEn: 'First Name', type: 'text' },
  { id: 'lastName', nameAr: 'الاسم الرباعي', nameEn: 'Full Name', type: 'text' },
  { id: 'email', nameAr: 'البريد الإلكتروني', nameEn: 'Email', type: 'email' },
  { id: 'phone', nameAr: 'رقم الهاتف', nameEn: 'Mobile Number', type: 'tel' },
  { id: 'idNumber', nameAr: 'الرقم الوطني', nameEn: 'ID Number', type: 'number' },
  { id: 'date', nameAr: 'الموعد', nameEn: 'Date', type: 'date' },
];