
import React from 'react';
import { Course } from '../types';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface CourseInputGroupProps {
  title: string;
  courses: Course[];
  onAdd: () => void;
  onRemove: (id: number) => void;
  onChange: (id: number, field: 'code' | 'name' | 'crn' | 'section', value: string) => void;
  type: 'add' | 'drop';
}

const CourseInputGroup: React.FC<CourseInputGroupProps> = ({ title, courses, onAdd, onRemove, onChange, type }) => {
  const accentColor = type === 'add' ? 'border-sky-500' : 'border-rose-500';
  
  return (
    <fieldset className={`border ${accentColor} rounded-lg p-4 space-y-4`}>
      <legend className="text-lg font-semibold px-2 text-gray-700">{title}</legend>
      {courses.map((course, index) => (
        <div key={course.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center animate-fade-in">
          <span className="text-gray-500 font-medium hidden md:inline-block text-center">{index + 1}.</span>
          <input
            type="text"
            placeholder="رمز المادة"
            value={course.code}
            onChange={(e) => onChange(course.id, 'code', e.target.value)}
            className="md:col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            required
          />
           <input
            type="text"
            placeholder="الرقم المرجعي"
            value={course.crn}
            onChange={(e) => onChange(course.id, 'crn', e.target.value)}
            className="md:col-span-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            required
          />
           <input
            type="text"
            placeholder="الشعبة"
            value={course.section}
            onChange={(e) => onChange(course.id, 'section', e.target.value)}
            className="md:col-span-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            required
          />
          <input
            type="text"
            placeholder="اسم المادة"
            value={course.name}
            onChange={(e) => onChange(course.id, 'name', e.target.value)}
            className="md:col-span-5 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
            required
          />
          <button
            type="button"
            onClick={() => onRemove(course.id)}
            className="md:col-span-1 p-2 text-rose-500 hover:bg-rose-100 rounded-full transition-colors duration-200 flex justify-center"
            aria-label="Remove course"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-md transition-transform transform hover:scale-105"
      >
        <PlusIcon />
        إضافة مادة
      </button>
    </fieldset>
  );
};

export default CourseInputGroup;