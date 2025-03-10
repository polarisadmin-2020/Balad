"use client";

import React, { useState } from 'react';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Helper function to format date - moved to the top level
const formatDate = (date) => {
  if (!date) return '';
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// Since we don't have the actual DatePicker component implementation,
// we'll create a simplified version for demonstration purposes
const MonthNavigator = ({ currentMonth, onChange, showArrows = true }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    onChange(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    onChange(nextMonth);
  };
  
  return (
    <div className="flex items-center justify-between mb-4">
      {showArrows && (
        <button 
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-muted"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      <div className="font-medium">
        {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </div>
      {showArrows && (
        <button 
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-muted"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

const DateCell = ({ 
  date, 
  isCurrentMonth, 
  isSelected, 
  isToday, 
  midRange = false,
  onSelect, 
  isFirstRangeChild = false,
  isLastRangeChild = false
}) => {
  const handleClick = () => {
    onSelect(date);
  };
  
  return (
    <div 
      className={`
        h-9 w-9 flex items-center justify-center rounded-md cursor-pointer
        ${!isCurrentMonth ? 'text-muted-foreground opacity-50' : ''}
        ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}
        ${isToday && !isSelected ? 'border border-primary text-primary' : ''}
        ${midRange ? 'bg-primary/20' : ''}
        ${isFirstRangeChild ? 'rounded-r-none' : ''}
        ${isLastRangeChild ? 'rounded-l-none' : ''}
      `}
      onClick={handleClick}
    >
      {date.getDate()}
    </div>
  );
};

// Helper functions for date handling
const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const days = [];
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }
  
  return days;
};

const getDaysFromPreviousMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const days = [];
  if (dayOfWeek > 0) {
    const prevMonth = new Date(year, month - 1, 1);
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    for (let i = lastDayOfPrevMonth - dayOfWeek + 1; i <= lastDayOfPrevMonth; i++) {
      days.push(new Date(year, month - 1, i));
    }
  }
  
  return days;
};

const getDaysFromNextMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0);
  const dayOfWeek = lastDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  const days = [];
  if (dayOfWeek < 6) {
    const daysToAdd = 6 - dayOfWeek;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push(new Date(year, month + 1, i));
    }
  }
  
  return days;
};

const compareDatesWithoutTime = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isDateInRange = (date, startDate, endDate) => {
  if (!startDate || !endDate) return false;
  
  const time = date.getTime();
  return time > startDate.getTime() && time < endDate.getTime();
};

const defaultStaticRanges = [
  {
    label: 'Today',
    range: () => ({
      startDate: new Date(),
      endDate: new Date()
    })
  },
  {
    label: 'Yesterday',
    range: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        startDate: yesterday,
        endDate: yesterday
      };
    }
  },
  {
    label: 'This Week',
    range: () => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      
      return {
        startDate: startOfWeek,
        endDate: today
      };
    }
  },
  {
    label: 'Last 7 Days',
    range: () => {
      const today = new Date();
      const last7Days = new Date(today);
      last7Days.setDate(today.getDate() - 6);
      
      return {
        startDate: last7Days,
        endDate: today
      };
    }
  },
  {
    label: 'This Month',
    range: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      
      return {
        startDate: startOfMonth,
        endDate: today
      };
    }
  },
  {
    label: 'Last Month',
    range: () => {
      const today = new Date();
      const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      
      return {
        startDate: startOfLastMonth,
        endDate: endOfLastMonth
      };
    }
  }
];

const DatePicker = ({ 
  initialDate = new Date(),
  range = false,
  dualMonthView = false,
  inputField = false,
  submitButton = false,
  qickOptions = false,
  value,
  onChange,
  onSubmit,
  onCancel
}) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const [nextMonth, setNextMonth] = useState(() => {
    const next = new Date(initialDate);
    next.setMonth(next.getMonth() + 1);
    return next;
  });
  
  const [selectedDate, setSelectedDate] = useState(value || initialDate);
  const [dateRange, setDateRange] = useState({
    startDate: value?.startDate || null,
    endDate: value?.endDate || null
  });
  
  // Initialize input value using the formatDate function that's now defined at the top level
  const [inputValue, setInputValue] = useState(() => {
    if (range) {
      const start = dateRange.startDate ? formatDate(dateRange.startDate) : '';
      const end = dateRange.endDate ? formatDate(dateRange.endDate) : '';
      return start && end ? `${start} - ${end}` : '';
    } else {
      return selectedDate ? formatDate(selectedDate) : '';
    }
  });
  
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    if (dualMonthView) {
      const nextNewMonth = new Date(newMonth);
      nextNewMonth.setMonth(nextNewMonth.getMonth() + 1);
      setNextMonth(nextNewMonth);
    }
  };
  
  const handleNextMonthChange = (newMonth) => {
    setNextMonth(newMonth);
  };
  
  const handleDateSelect = (date) => {
    if (range) {
      if (!dateRange.startDate || (dateRange.startDate && dateRange.endDate)) {
        // Start a new range
        setDateRange({
          startDate: date,
          endDate: null
        });
      } else {
        // Complete the range
        if (date < dateRange.startDate) {
          setDateRange({
            startDate: date,
            endDate: dateRange.startDate
          });
        } else {
          setDateRange({
            startDate: dateRange.startDate,
            endDate: date
          });
        }
      }
    } else {
      setSelectedDate(date);
      if (onChange) onChange(date);
    }
    
    // Update input value
    if (!range) {
      setInputValue(formatDate(date));
    } else if (dateRange.startDate && date >= dateRange.startDate) {
      setInputValue(`${formatDate(dateRange.startDate)} - ${formatDate(date)}`);
    } else {
      setInputValue(formatDate(date));
    }
  };
  
  const handleRangeSelect = (rangeObj) => {
    setDateRange(rangeObj);
    setInputValue(`${formatDate(rangeObj.startDate)} - ${formatDate(rangeObj.endDate)}`);
    
    // Update current month to show the start date
    setCurrentMonth(new Date(rangeObj.startDate));
    if (dualMonthView) {
      const nextNewMonth = new Date(rangeObj.startDate);
      nextNewMonth.setMonth(nextNewMonth.getMonth() + 1);
      setNextMonth(nextNewMonth);
    }
    
    if (onChange) onChange(rangeObj);
  };
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = () => {
    if (onSubmit) {
      if (range) {
        onSubmit(dateRange);
      } else {
        onSubmit(selectedDate);
      }
    }
  };
  
  const handleCancel = () => {
    if (onCancel) onCancel();
  };
  
  const renderCalendar = (month) => {
    const prevMonthDays = getDaysFromPreviousMonth(month);
    const currentMonthDays = getMonthDays(month);
    const nextMonthDays = getDaysFromNextMonth(month);
    
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
    
    const today = new Date();
    
    return (
      <div>
        <MonthNavigator 
          currentMonth={month} 
          onChange={month === currentMonth ? handleMonthChange : handleNextMonthChange} 
        />
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, index) => (
            <div key={index} className="h-9 flex items-center justify-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {allDays.map((date, index) => {
            const isCurrentMonthDay = date.getMonth() === month.getMonth();
            const isSelectedDay = range 
              ? compareDatesWithoutTime(date, dateRange.startDate) || compareDatesWithoutTime(date, dateRange.endDate)
              : compareDatesWithoutTime(date, selectedDate);
            const isTodayDay = compareDatesWithoutTime(date, today);
            const isInRange = range && dateRange.startDate && dateRange.endDate 
              ? isDateInRange(date, dateRange.startDate, dateRange.endDate)
              : false;
            const isFirstInRange = range && dateRange.startDate && compareDatesWithoutTime(date, dateRange.startDate);
            const isLastInRange = range && dateRange.endDate && compareDatesWithoutTime(date, dateRange.endDate);
            
            return (
              <DateCell 
                key={index}
                date={date}
                isCurrentMonth={isCurrentMonthDay}
                isSelected={isSelectedDay}
                isToday={isTodayDay}
                midRange={isInRange}
                isFirstRangeChild={isFirstInRange}
                isLastRangeChild={isLastInRange}
                onSelect={handleDateSelect}
              />
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-background border rounded-lg shadow-md p-4">
      {inputField && (
        <div className="mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder={range ? "MM/DD/YYYY - MM/DD/YYYY" : "MM/DD/YYYY"}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      )}
      
      <div className={`${dualMonthView ? 'grid grid-cols-2 gap-4' : ''}`}>
        {renderCalendar(currentMonth)}
        {dualMonthView && renderCalendar(nextMonth)}
      </div>
      
      {qickOptions && range && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Quick Select</h4>
          <div className="grid grid-cols-2 gap-2">
            {defaultStaticRanges.map((rangeOption, index) => (
              <button
                key={index}
                className="text-sm px-3 py-1.5 border rounded-md hover:bg-muted text-left"
                onClick={() => handleRangeSelect(rangeOption.range())}
              >
                {rangeOption.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {submitButton && (
        <div className="mt-4 border-t pt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 border rounded-md hover:bg-muted"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={handleSubmit}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default function DatePickerExamplePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7))
  });
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8">
          <Link href="/examples" className="text-primary hover:underline flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Examples
          </Link>
          <h1 className="text-4xl font-bold mt-4 mb-2">DatePicker Component</h1>
          <p className="text-muted-foreground mb-8">
            DatePickers allow users to select dates or date ranges from a calendar interface.
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic DatePicker */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Basic DatePicker</h2>
            <div className="max-w-sm">
              <DatePicker 
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </section>

          {/* Date Range Picker */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Date Range Picker</h2>
            <div className="max-w-sm">
              <DatePicker 
                range={true}
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
          </section>

          {/* Dual Month View */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Dual Month View</h2>
            <div className="max-w-xl">
              <DatePicker 
                dualMonthView={true}
                range={true}
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
          </section>

          {/* With Input Field */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Input Field</h2>
            <div className="max-w-sm">
              <DatePicker 
                inputField={true}
                value={selectedDate}
                onChange={setSelectedDate}
              />
            </div>
          </section>

          {/* With Quick Options */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Quick Options</h2>
            <div className="max-w-sm">
              <DatePicker 
                range={true}
                qickOptions={true}
                value={dateRange}
                onChange={setDateRange}
              />
            </div>
          </section>

          {/* With Submit Button */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">With Submit Button</h2>
            <div className="max-w-sm">
              <DatePicker 
                submitButton={true}
                value={selectedDate}
                onChange={setSelectedDate}
                onSubmit={(date) => alert(`Selected date: ${date.toLocaleDateString()}`)}
                onCancel={() => alert('Cancelled')}
              />
            </div>
          </section>

          {/* Full Featured */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Full Featured DatePicker</h2>
            <div className="max-w-xl">
              <DatePicker 
                range={true}
                dualMonthView={true}
                inputField={true}
                submitButton={true}
                qickOptions={true}
                value={dateRange}
                onChange={setDateRange}
                onSubmit={(range) => alert(`Selected range: ${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`)}
                onCancel={() => alert('Cancelled')}
              />
            </div>
          </section>

          {/* Usage Example */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Usage Example: Event Scheduling</h2>
            <div className="bg-card border rounded-lg p-6 max-w-xl">
              <h3 className="text-xl font-medium mb-4">Schedule an Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Event Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter event title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Event Date</label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input 
                        type="text" 
                        className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Select date"
                        value={selectedDate.toLocaleDateString()}
                        readOnly
                      />
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <DatePicker 
                      value={selectedDate}
                      onChange={setSelectedDate}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Schedule Event
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}