// app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getHomePageResources, subscribe } from '../lib/data'

interface Resource {
  id: number
  title: string
  subject: string
  semester: number
  department: string
  uploadDate: string
  size: string
  downloads: number
  rating?: number
  tags?: string[]
  type: 'notes' | 'papers' | 'syllabus'
  year?: number
  month?: string
  solutions?: boolean
}

export default function Home() {
  const [recentResources, setRecentResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResources = () => {
      try {
        const resources = getHomePageResources()
        setRecentResources(resources)
        setLoading(false)
      } catch (error) {
        console.error('Error loading resources:', error)
        setLoading(false)
      }
    }

    loadResources()

    // Subscribe to changes
    const unsubscribe = subscribe(loadResources)

    return () => unsubscribe()
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case 'notes': return '📚'
      case 'papers': return '📝'
      case 'syllabus': return '📖'
      default: return '📄'
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-blue-500'
      case 'papers': return 'bg-green-500'
      case 'syllabus': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getLink = (type: string) => {
    switch (type) {
      case 'notes': return '/notes'
      case 'papers': return '/question-papers'
      case 'syllabus': return '/syllabus'
      default: return '/'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <Link href="/syllabus" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Syllabus
              </Link>
            </nav>

            <Link href="/admin" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your One-Stop <span className="text-blue-600">VTU Resource Hub</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access comprehensive study materials, previous year question papers, results, 
            and syllabus for VTU students all in one place.
          </p>
        </div>
      </section>

      {/* Recently Added Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recently Added Resources</h2>
            <p className="text-xl text-gray-600">Latest resources added by our team</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading resources...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentResources.map((resource) => (
                <div key={`${resource.type}-${resource.id}`} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 ${getColor(resource.type)} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-lg">{getIcon(resource.type)}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                      {resource.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">{resource.subject}</span>
                      <span className="mx-2">•</span>
                      <span>Sem {resource.semester}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>📅 {resource.uploadDate}</span>
                      <span className="mx-2">•</span>
                      <span>⬇️ {resource.downloads}</span>
                    </div>
                  </div>

                  <Link 
                    href={getLink(resource.type)}
                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && recentResources.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources yet</h3>
              <p className="text-gray-500 mb-4">Upload some resources from the admin panel</p>
              <Link href="/admin" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Go to Admin Panel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VTU Sync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}