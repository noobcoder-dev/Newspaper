import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(8); // September
  const [currentYear, setCurrentYear] = useState(2024);

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const weeks = Math.ceil((firstDay + daysInMonth) / 7);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1))} aria-label="Previous month">
          <FaChevronLeft />
        </button>
        <span>{months[currentMonth]} {currentYear}</span>
        <button onClick={() => setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1))} aria-label="Next month">
          <FaChevronRight />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const day = index - firstDay + 1;
          return (
            <div key={index} className={`text-center p-1 ${day > 0 && day <= daysInMonth ? 'bg-gray-100' : ''}`}>
              {day > 0 && day <= daysInMonth ? day : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
