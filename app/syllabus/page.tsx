// app/syllabus/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

const syllabusData = [
  {
    id: 1,
    course: 'Computer Science and Engineering',
    semester: 3,
    subjects: [
      { code: '18CS31', name: 'Data Structures', credits: 4 },
      { code: '18CS32', name: 'Analog and Digital Electronics', credits: 4 },
      { code: '18CS33', name: 'Computer Organization', credits: 3 },
      { code: '18CS34', name: 'Software Engineering', credits: 3 },
      { code: '18CS35', name: 'Discrete Mathematical Structures', credits: 4 }
    ],
    updated: '2023-24'
  },
  {
    id: 2,
    course: 'Computer Science and Engineering',
    semester: 4,
    subjects: [
      { code: '18CS41', name: 'Analysis and Design of Algorithms', credits: 4 },
      { code: '18CS42', name: 'Operating Systems', credits: 4 },
      { code: '18CS43', name: 'Microcontrollers', credits: 3 },
      { code: '18CS44', name: 'Data Communication', credits: 3 },
      { code: '18CS45', name: 'Object Oriented Programming', credits: 3 }
    ],
    updated: '2023-24'
  },
  {
    id: 3,
    course: 'Electronics and Communication',
    semester: 3,
    subjects: [
      { code: '18EC31', name: 'Network Analysis', credits: 4 },
      { code: '18EC32', name: 'Electronic Instruments', credits: 4 },
      { code: '18EC33', name: 'Analog Electronics', credits: 3 },
      { code: '18EC34', name: 'Digital System Design', credits: 3 },
      { code: '18EC35', name: 'Signals and Systems', credits: 4 }
    ],
    updated: '2023-24'
  },
  {
    id: 4,
    course: 'Mechanical Engineering',
    semester: 3,
    subjects: [
      { code: '18ME31', name: 'Mechanics of Materials', credits: 4 },
      { code: '18ME32', name: 'Basic Thermodynamics', credits: 4 },
      { code: '18ME33', name: 'Material Science', credits: 3 },
      { code: '18ME34', name: 'Manufacturing Process', credits: 3 },
      { code: '18ME35', name: 'Fluid Mechanics', credits: 4 }
    ],
    updated: '2023-24'
  }
]

export default function SyllabusPage() {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  const filteredSyllabus = syllabusData.filter(item => {
    const matchesCourse = !selectedCourse || item.course === selectedCourse
    const matchesSemester = !selectedSemester || item.semester === parseInt(selectedSemester)
    return matchesCourse && matchesSemester
  })

  const courses = [...new Set(syllabusData.map(item => item.course))]
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VTU Sync</h1>
                <p className="text-xs text-gray-500 -mt-1">Resource Hub</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/notes" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Notes
              </Link>
              <Link href="/question-papers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Question Papers
              </Link>
              <Link href="/results" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Results
              </Link>
              <Link href="/syllabus" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Syllabus
              </Link>
            </nav>

            <Link href="/admin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Course <span className="text-blue-600">Syllabus</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access updated curriculum and course structure for all programs
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Course Filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Semester Filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div>
              <button 
                onClick={() => {
                  setSelectedCourse('')
                  setSelectedSemester('')
                }}
                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Syllabus Grid */}
        <div className="grid gap-6">
          {filteredSyllabus.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {item.course} - Semester {item.semester}
                    </h3>
                    <p className="text-gray-600">Updated for {item.updated} academic year</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg">
                    Download Syllabus
                  </button>
                </div>

                {/* Subjects List */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Subjects</h4>
                  <div className="grid gap-3">
                    {item.subjects.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-900">{subject.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({subject.code})</span>
                        </div>
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                          {subject.credits} Credits
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSyllabus.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No syllabus found</h3>
            <p className="text-gray-500">Try adjusting your filter criteria</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-2xl p-6 mt-8">
          <h3 className="font-semibold text-blue-900 mb-3">Syllabus Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800 text-sm">
            <div>
              <ul className="space-y-2">
                <li>• Based on VTU 2018 scheme</li>
                <li>• Updated for 2023-24 academic year</li>
                <li>• Includes all elective subjects</li>
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                <li>• Detailed course objectives</li>
                <li>• Reference materials</li>
                <li>• Examination pattern</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}