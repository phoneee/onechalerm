import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, disappearanceCases } from '@/data/timeline-data'
import { articles } from '@/data/articles'
import { crossReferences } from '@/data/cross-references'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

interface SearchResult {
  type: 'timeline' | 'person' | 'article' | 'location'
  id: string
  title: string
  subtitle?: string
  date?: string
  icon: string
}

interface UnifiedSearchProps {
  onResultClick: (result: SearchResult) => void
}

const UnifiedSearch = ({ onResultClick }: UnifiedSearchProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search function
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const searchResults: SearchResult[] = []

    // Search timeline events
    timelineEvents.forEach(event => {
      if (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.relatedPeople?.some(p => p.toLowerCase().includes(query))
      ) {
        searchResults.push({
          type: 'timeline',
          id: event.id,
          title: event.title,
          subtitle: event.description,
          date: event.date,
          icon: '⏰'
        })
      }
    })

    // Search disappearance cases
    disappearanceCases.forEach(person => {
      if (
        person.name.toLowerCase().includes(query) ||
        person.nameEn.toLowerCase().includes(query) ||
        person.location.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'person',
          id: person.id,
          title: person.name,
          subtitle: `${person.nameEn} - หายตัวที่${person.location}`,
          date: person.date,
          icon: '👤'
        })
      }
    })

    // Search articles
    articles.forEach(article => {
      if (
        article.title.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      ) {
        searchResults.push({
          type: 'article',
          id: article.id,
          title: article.title,
          subtitle: article.subtitle,
          date: article.date,
          icon: '📄'
        })
      }
    })

    // Search locations from cross-references
    const uniqueLocations = new Map<string, typeof crossReferences[0]>()
    crossReferences.forEach(ref => {
      if (ref.locationName?.toLowerCase().includes(query)) {
        uniqueLocations.set(ref.locationName!, ref)
      }
    })

    uniqueLocations.forEach((ref, locationName) => {
      if (ref.coordinates) {
        searchResults.push({
          type: 'location',
          id: `location-${ref.coordinates.join('-')}`,
          title: locationName,
          subtitle: `${ref.coordinates[1]}, ${ref.coordinates[0]}`,
          icon: '📍'
        })
      }
    })

    // Sort by relevance and date
    searchResults.sort((a, b) => {
      // Exact matches first
      const aExact = a.title.toLowerCase() === query
      const bExact = b.title.toLowerCase() === query
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1

      // Then by date (newest first)
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return 0
    })

    setResults(searchResults.slice(0, 10)) // Limit to 10 results
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    performSearch(e.target.value)
  }

  const handleResultClick = (result: SearchResult) => {
    onResultClick(result)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  return (
    <>
      {/* Search Button */}
      <button 
        className="btn btn-ghost btn-sm gap-2"
        onClick={() => setIsOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <kbd className="kbd kbd-sm hidden sm:inline-flex">⌘K</kbd>
      </button>

      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-base-300/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Search Container */}
            <motion.div
              ref={searchRef}
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl"
            >
              <div className="card bg-base-100 shadow-2xl">
                <div className="card-body p-0">
                  {/* Search Input */}
                  <div className="p-4 border-b border-base-300">
                    <div className="flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        placeholder="ค้นหาชื่อ, สถานที่, เหตุการณ์, หรือบทความ..."
                        className="input input-ghost w-full focus:outline-none"
                        autoFocus
                      />
                      <kbd className="kbd kbd-sm">ESC</kbd>
                    </div>
                  </div>

                  {/* Search Results */}
                  {results.length > 0 && (
                    <div className="max-h-96 overflow-y-auto">
                      {results.map((result) => (
                        <button
                          key={`${result.type}-${result.id}`}
                          onClick={() => handleResultClick(result)}
                          className="w-full text-left p-4 hover:bg-base-200 transition-colors border-b border-base-300 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{result.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{result.title}</h4>
                              {result.subtitle && (
                                <p className="text-sm opacity-60 truncate">{result.subtitle}</p>
                              )}
                              {result.date && (
                                <p className="text-xs opacity-40 mt-1">
                                  {format(new Date(result.date), 'd MMMM yyyy', { locale: th })}
                                </p>
                              )}
                            </div>
                            <div className="badge badge-sm">
                              {result.type === 'timeline' && 'เหตุการณ์'}
                              {result.type === 'person' && 'บุคคล'}
                              {result.type === 'article' && 'บทความ'}
                              {result.type === 'location' && 'สถานที่'}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {query && results.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="opacity-60">ไม่พบผลการค้นหาสำหรับ "{query}"</p>
                    </div>
                  )}

                  {/* Quick Actions */}
                  {!query && (
                    <div className="p-4">
                      <p className="text-sm opacity-60 mb-3">การค้นหาด่วน</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            setQuery('วันเฉลิม')
                            performSearch('วันเฉลิม')
                          }}
                          className="btn btn-sm btn-ghost"
                        >
                          วันเฉลิม
                        </button>
                        <button
                          onClick={() => {
                            setQuery('หายตัว')
                            performSearch('หายตัว')
                          }}
                          className="btn btn-sm btn-ghost"
                        >
                          การหายตัว
                        </button>
                        <button
                          onClick={() => {
                            setQuery('แม่น้ำโขง')
                            performSearch('แม่น้ำโขง')
                          }}
                          className="btn btn-sm btn-ghost"
                        >
                          แม่น้ำโขง
                        </button>
                        <button
                          onClick={() => {
                            setQuery('2563')
                            performSearch('2563')
                          }}
                          className="btn btn-sm btn-ghost"
                        >
                          ปี 2563
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default UnifiedSearch