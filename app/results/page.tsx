// app/results/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ResultsPage() {
  const [usn, setUsn] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!usn.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setResults({
        usn: usn.toUpperCase(),
        name: 'John Doe',
        semester: 4,
        department: 'Computer Science',
        sgpa: 8.75,
        cgpa: 8.92,
        subjects: [
          { name: 'Data Structures', grade: 'A', credits: 4 },
          { name: 'Operating Systems', grade: 'A', credits: 4 },
          { name: 'DBMS', grade: 'B+', credits: 4 },
          { name: 'Computer Networks', grade: 'A', credits: 3 },
          { name: 'Software Engineering', grade: 'A', credits: 3 }
        ]
      })
      setLoading(false)
    }, 1500)
  }

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
              <Link href="/results" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
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
            Check Your <span className="text-blue-600">Results</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your USN to check your semester results
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <label htmlFor="usn" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Your USN
              </label>
              <input
                type="text"
                id="usn"
                placeholder="e.g., 1VT20CS001"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg font-mono"
                value={usn}
                onChange={(e) => setUsn(e.target.value.toUpperCase())}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Fetching Results...' : 'Check Results'}
            </button>
          </form>

          {/* Results Display */}
          {results && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Result Details</h2>
                <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
                  <div>
                    <span className="text-gray-600">USN:</span>
                    <span className="font-semibold ml-2">{results.usn}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold ml-2">{results.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Semester:</span>
                    <span className="font-semibold ml-2">{results.semester}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Department:</span>
                    <span className="font-semibold ml-2">{results.department}</span>
                  </div>
                </div>
              </div>

              {/* Grades */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Grades</h3>
                <div className="space-y-3">
                  {results.subjects.map((subject, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-700">{subject.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-gray-600">{subject.credits} Credits</span>
                        <span className={`px-3 py-1 rounded-full font-semibold ${
                          subject.grade === 'A' ? 'bg-green-100 text-green-700' :
                          subject.grade === 'B+' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {subject.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{results.sgpa}</div>
                  <div className="text-sm text-gray-600">SGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{results.cgpa}</div>
                  <div className="text-sm text-gray-600">CGPA</div>
                </div>
              </div>

              <div className="text-center mt-6">
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Download Result PDF
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 rounded-2xl p-6 mt-8">
            <h3 className="font-semibold text-blue-900 mb-3">How to check results?</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li>• Enter your VTU USN (University Seat Number)</li>
              <li>• Click "Check Results" to fetch your results</li>
              <li>• View and download your result PDF</li>
              <li>• Contact your college for any discrepancies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}