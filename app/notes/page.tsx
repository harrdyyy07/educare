// app/notes/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getNotes } from '@/lib/data'

interface Note {
  id: number
  title: string
  subject: string
  semester: number
  department: string
  uploadDate: string
  size: string
  downloads: number
  rating: number
  tags: string[]
  type: 'notes'
}

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load notes from data storage
    setTimeout(() => {
      const allNotes = getNotes() as Note[]
      setNotes(allNotes)
      setLoading(false)
    }, 500)
  }, [])

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = !selectedSemester || note.semester === parseInt(selectedSemester)
    const matchesDepartment = !selectedDepartment || note.department.includes(selectedDepartment)
    
    return matchesSearch && matchesSemester && matchesDepartment
  })

  // ... rest of your notes page code remains the same, just use filteredNotes instead of mock data

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
              <Link href="/notes" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
                Notes
              </Link>
              <Link href="/question-papers" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Question Papers
              </Link>
              <Link href="/results" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Results
              </Link>
              <Link href="/syllabus" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Syllabus
              </Link>
            </nav>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Admin
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Study <span className="text-blue-600">Notes</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access comprehensive study materials and resources for all semesters and departments
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search notes by subject, topic, or keyword..."
                  className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Semester Filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                <option value="">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-6">
          {filteredNotes.map((note) => (
            <div key={note.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                      {note.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                        {note.subject}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        Semester {note.semester}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                        {note.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                      <span>📅 {note.uploadDate}</span>
                      <span>💾 {note.size}</span>
                      <span>⬇️ {note.downloads} downloads</span>
                      <span>⭐ {note.rating}/5</span>
                    </div>
                  </div>
                  
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center space-x-2 hover:scale-105 shadow-lg">
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No notes found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors font-semibold">
            Load More Notes
          </button>
        </div>
      </div>
    </div>
  )
}