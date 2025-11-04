
import React, { useState, useCallback } from 'react';
import { Course, Status } from './types';
import { ACADEMIC_ADVISORS } from './constants';
import CourseInputGroup from './components/CourseInputGroup';

const App: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [selectedAdvisor, setSelectedAdvisor] = useState('');
  const [coursesToAdd, setCoursesToAdd] = useState<Course[]>([]);
  const [coursesToDrop, setCoursesToDrop] = useState<Course[]>([]);
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleAddCourse = useCallback((type: 'add' | 'drop') => {
    const newCourse: Course = { id: Date.now(), code: '', name: '', crn: '', section: '' };
    if (type === 'add') {
      setCoursesToAdd(prev => [...prev, newCourse]);
    } else {
      setCoursesToDrop(prev => [...prev, newCourse]);
    }
  }, []);

  const handleRemoveCourse = useCallback((id: number, type: 'add' | 'drop') => {
    if (type === 'add') {
      setCoursesToAdd(prev => prev.filter(course => course.id !== id));
    } else {
      setCoursesToDrop(prev => prev.filter(course => course.id !== id));
    }
  }, []);

  const handleCourseChange = useCallback((id: number, field: 'code' | 'name' | 'crn' | 'section', value: string, type: 'add' | 'drop') => {
    const updater = (courses: Course[]) =>
      courses.map(course => (course.id === id ? { ...course, [field]: value } : course));
      
    if (type === 'add') {
      setCoursesToAdd(updater);
    } else {
      setCoursesToDrop(updater);
    }
  }, []);

  const resetForm = () => {
      setStudentName('');
      setStudentId('');
      setStudentEmail('');
      setStudentPhone('');
      setSelectedAdvisor('');
      setCoursesToAdd([]);
      setCoursesToDrop([]);
      setReason('');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvisor) {
        alert('يرجى اختيار المرشد الأكاديمي');
        return;
    }
    setStatus('submitting');
    console.log({
      studentName,
      studentId,
      studentEmail,
      studentPhone,
      selectedAdvisor,
      coursesToAdd,
      coursesToDrop,
      reason,
    });

    // Simulate API call
    setTimeout(() => {
        // Randomly succeed or fail
        if (Math.random() > 0.1) { 
            setStatus('success');
            resetForm();
        } else {
            setStatus('error');
        }
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">نموذج الحذف والإضافة</h1>
            <p className="text-gray-500 mt-2">يرجى تعبئة الحقول التالية لتقديم طلبك إلى مرشدك الأكاديمي.</p>
          </div>
          
          {status === 'success' && (
            <div className="bg-green-100 border-r-4 border-green-500 text-green-700 p-4 rounded-lg mb-6" role="alert">
              <p className="font-bold">تم إرسال الطلب بنجاح!</p>
              <p>سيقوم مرشدك بمراجعة الطلب والتواصل معك قريباً.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-100 border-r-4 border-red-500 text-red-700 p-4 rounded-lg mb-6" role="alert">
              <p className="font-bold">حدث خطأ!</p>
              <p>لم نتمكن من إرسال طلبك. يرجى المحاولة مرة أخرى.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset className="border border-gray-300 rounded-lg p-4">
              <legend className="text-lg font-semibold px-2 text-gray-700">معلومات الطالب</legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label htmlFor="studentName" className="block text-sm font-medium text-gray-600 mb-1">اسم الطالب</label>
                  <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="ادخل اسمك الكامل"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-600 mb-1">الرقم الجامعي</label>
                  <input
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="ادخل رقمك الجامعي"
                    required
                  />
                </div>
                 <div>
                  <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-600 mb-1">البريد الجامعي</label>
                  <input
                    id="studentEmail"
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="example@kau.edu.sa"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-600 mb-1">رقم الجوال</label>
                  <input
                    id="studentPhone"
                    type="tel"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    placeholder="05xxxxxxxx"
                    required
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="block text-lg font-semibold text-gray-700">المرشد الأكاديمي</legend>
              <div className="mt-2 space-y-2 border border-gray-300 rounded-lg p-4">
                {ACADEMIC_ADVISORS.map(advisor => (
                  <label key={advisor.id} htmlFor={`advisor-${advisor.id}`} className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      id={`advisor-${advisor.id}`}
                      name="academicAdvisor"
                      type="radio"
                      value={advisor.id}
                      checked={selectedAdvisor === advisor.id}
                      onChange={(e) => setSelectedAdvisor(e.target.value)}
                      className="h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                    />
                    <span className="ms-3 text-sm font-medium text-gray-700">{advisor.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <CourseInputGroup
              title="المواد المراد إضافتها"
              courses={coursesToAdd}
              onAdd={() => handleAddCourse('add')}
              onRemove={(id) => handleRemoveCourse(id, 'add')}
              onChange={(id, field, value) => handleCourseChange(id, field, value, 'add')}
              type="add"
            />

            <CourseInputGroup
              title="المواد المراد حذفها"
              courses={coursesToDrop}
              onAdd={() => handleAddCourse('drop')}
              onRemove={(id) => handleRemoveCourse(id, 'drop')}
              onChange={(id, field, value) => handleCourseChange(id, field, value, 'drop')}
              type="drop"
            />
            
            <div>
              <label htmlFor="reason" className="block text-lg font-semibold text-gray-700 mb-2">السبب / ملاحظات</label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                placeholder="اذكر سبب طلبك للحذف والإضافة..."
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="px-8 py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                {status === 'submitting' ? 'جاري الإرسال...' : 'إرسال الطلب'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
