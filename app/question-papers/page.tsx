// app/question-papers/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

const papersData = [
  {
    id: 1,
    title: 'Data Structures Question Paper - Dec 2023',
    subject: 'Data Structures',
    semester: 3,
    department: 'Computer Science',
    year: 2023,
    month: 'December',
    size: '1.2 MB',
    downloads: 1567,
    solutions: true
  },
  {
    id: 2,
    title: 'Operating Systems Question Paper - June 2023',
    subject: 'Operating Systems',
    semester: 4,
    department: 'Computer Science',
    year: 2023,
    month: 'June',
    size: '1.1 MB',
    downloads: 1342,
    solutions: true
  },
  {
    id: 3,
    title: 'DBMS Question Paper - Dec 2023',
    subject: 'DBMS',
    semester: 3,
    department: 'Computer Science',
    year: 2023,
    month: 'December',
    size: '1.3 MB',
    downloads: 1423,
    solutions: false
  },
  {
    id: 4,
    title: 'Computer Networks Question Paper - June 2023',
    subject: 'Computer Networks',
    semester: 5,
    department: 'Computer Science',
    year: 2023,
    month: 'June',
    size: '1.4 MB',
    downloads: 987,
    solutions: true
  },
  {
    id: 5,
    title: 'Software Engineering Question Paper - Dec 2023',
    subject: 'Software Engineering',
    semester: 4,
    department: 'Computer Science',
    year: 2023,
    month: 'December',
    size: '1.0 MB',
    downloads: 876,
    solutions: false
  },
  {
    id: 6,
    title: 'Digital Electronics Question Paper - June 2023',
    subject: 'Digital Electronics',
    semester: 2,
    department: 'ECE',
    year: 2023,
    month: 'June',
    size: '1.2 MB',
    downloads: 765,
    solutions: true
  }
]

export default function QuestionPapersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  const filteredPapers = papersData.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = !selectedYear || paper.year === parseInt(selectedYear)
    const matchesSemester = !selectedSemester || paper.semester === parseInt(selectedSemester)
    
    return matchesSearch && matchesYear && matchesSemester
  })

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
              <Link href="/question-papers" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
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
            Question <span className="text-blue-600">Papers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access previous year question papers with solutions
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search question papers..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Year Filter */}
            <div>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
                        {paper.title}
                      </h3>
                      {paper.solutions && (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          Solutions Available
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {paper.subject}
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        Semester {paper.semester}
                      </span>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                        {paper.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500">
                      <span>📅 {paper.month} {paper.year}</span>
                      <span>💾 {paper.size}</span>
                      <span>⬇️ {paper.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg">
                      Download
                    </button>
                    {paper.solutions && (
                      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-semibold hover:scale-105 shadow-lg">
                        Solutions
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No question papers found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors font-semibold">
            Load More Papers
          </button>
        </div>
      </div>
    </div>
  )
}