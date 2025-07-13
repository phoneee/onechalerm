import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import { timelineEvents, disappearanceCases } from '@/data/timeline-data'
import { getReferencesByTimelineEvent } from '@/data/cross-references'
import { getArticleById } from '@/data/articles'
import ArticleView from '@/components/ArticleView'
import ShareCard from '@/components/common/ShareCard'
import { getImagesByPerson } from '@/data/real-images'
import type { NavigationState } from '@/App'

interface TimelineViewProps {
  navigationState?: NavigationState
}

const TimelineView = ({ navigationState }: TimelineViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  
  // Handle navigation from search
  useEffect(() => {
    if (navigationState?.targetId && navigationState.targetType === 'timeline') {
      const element = document.getElementById(`timeline-${navigationState.targetId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        // Highlight the element
        element.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-primary', 'ring-offset-2')
        }, 3000)
      }
    } else if (navigationState?.targetId && navigationState.targetType === 'person') {
      const element = document.getElementById(`person-${navigationState.targetId}`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [navigationState])

  const getEventColor = (type: string) => {
    switch (type) {
      case 'political': return 'badge-info'
      case 'personal': return 'badge-success'
      case 'disappearance': return 'badge-error'
      case 'investigation': return 'badge-warning'
      case 'legal': return 'badge-secondary'
      default: return 'badge'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'political': return '🏛️'
      case 'personal': return '👤'
      case 'disappearance': return '🚨'
      case 'investigation': return '🔍'
      case 'legal': return '⚖️'
      default: return '📌'
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ไทม์ไลน์: <span className="text-primary">9 ชีวิตที่หายไปในเงามืด</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            ติดตามเหตุการณ์สำคัญตั้งแต่รัฐประหาร 2557 จนถึงการหายตัวของนักเคลื่อนไหว 9 คน
          </p>
        </motion.div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="stat bg-base-200 rounded-box shadow-lg">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div className="stat-title">นักเคลื่อนไหวที่หายตัว</div>
              <div className="stat-value text-primary">9</div>
              <div className="stat-desc">ตั้งแต่ปี 2557</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stat bg-base-200 rounded-box shadow-lg">
              <div className="stat-figure text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="stat-title">ประเทศที่เกิดเหตุ</div>
              <div className="stat-value text-warning">3</div>
              <div className="stat-desc">ลาว, เวียดนาม, กัมพูชา</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="stat bg-base-200 rounded-box shadow-lg">
              <div className="stat-figure text-error">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
              </div>
              <div className="stat-title">พบศพแล้ว</div>
              <div className="stat-value text-error">2</div>
              <div className="stat-desc">ในแม่น้ำโขง</div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {timelineEvents.map((event, index) => (
              <motion.li
                key={event.id}
                id={`timeline-${event.id}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {index !== 0 && <hr className={event.isImportant ? 'bg-primary' : ''} />}
                <div className="timeline-middle">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    event.isImportant ? 'bg-primary text-primary-content' : 'bg-base-300'
                  }`}>
                    {getEventIcon(event.type)}
                  </div>
                </div>
                <div className={`${index % 2 === 0 ? 'timeline-start md:text-end' : 'timeline-end'} mb-10`}>
                  <div className={`card bg-base-200 shadow-xl ${
                    event.isImportant ? 'border-2 border-primary' : ''
                  }`}>
                    <div className="card-body">
                      <div className={`flex items-center gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        <div className={`badge ${getEventColor(event.type)}`}>
                          {event.type}
                        </div>
                        <time className="text-sm opacity-60">
                          {format(new Date(event.date), 'd MMMM yyyy', { locale: th })}
                          {event.time && ` • ${event.time} น.`}
                        </time>
                      </div>
                      
                      <h3 className="card-title text-lg">{event.title}</h3>
                      <p className="text-sm opacity-80">{event.description}</p>
                      
                      {event.location && (
                        <p className="text-xs opacity-60 mt-2">📍 {event.location}</p>
                      )}
                      
                      {event.relatedPeople && (
                        <div className="card-actions justify-start mt-2">
                          {event.relatedPeople.map(person => (
                            <span key={person} className="badge badge-sm badge-outline">
                              {person}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Related Articles */}
                      {(() => {
                        const refs = getReferencesByTimelineEvent(event.id)
                        const articleIds = refs.flatMap(r => r.articleIds || [])
                        const uniqueArticleIds = [...new Set(articleIds)]
                        
                        if (uniqueArticleIds.length === 0) return null
                        
                        return (
                          <div className="mt-4 pt-4 border-t border-base-300">
                            <p className="text-xs opacity-60 mb-2">บทความที่เกี่ยวข้อง:</p>
                            <div className="flex flex-wrap gap-2">
                              {uniqueArticleIds.map(articleId => {
                                const article = getArticleById(articleId)
                                if (!article) return null
                                return (
                                  <button
                                    key={articleId}
                                    onClick={() => setSelectedArticle(articleId)}
                                    className="btn btn-xs btn-ghost"
                                  >
                                    📝 {article.title}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })()}
                    </div>
                  </div>
                </div>
                {index !== timelineEvents.length - 1 && <hr className={event.isImportant ? 'bg-primary' : ''} />}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Disappearance Cases Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-display font-bold text-center mb-12">
            รายชื่อผู้หายตัวทั้งหมด
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disappearanceCases.map(person => {
              const personImages = getImagesByPerson(person.id)
              const primaryImage = personImages.find(img => img.tags.includes('portrait'))
              
              return (
                <motion.div
                  key={person.id}
                  id={`person-${person.id}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                <div className={`card bg-base-200 shadow-xl ${
                  person.status === 'found_dead' ? 'border-2 border-error' : ''
                }`}>
                  <div className="card-body">
                    <h4 className="card-title">{person.name}</h4>
                    <p className="text-sm opacity-60">{person.nameEn}</p>
                    
                    <div className="divider my-2"></div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="opacity-60">วันที่หายตัว:</span>
                        <span>{format(new Date(person.date), 'd MMMM yyyy', { locale: th })}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">สถานที่:</span>
                        <span>{person.location}, {person.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">อายุ:</span>
                        <span>{person.age} ปี</span>
                      </div>
                    </div>
                    
                    <div className="card-actions justify-end mt-4">
                      <div className={`badge ${
                        person.status === 'missing' ? 'badge-warning' : 'badge-error'
                      }`}>
                        {person.status === 'missing' ? 'สูญหาย' : 'พบศพ'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
      
      {/* Article Modal */}
      {selectedArticle && (() => {
        const article = getArticleById(selectedArticle)
        if (!article) return null
        return (
          <ArticleView
            article={article}
            onClose={() => setSelectedArticle(null)}
          />
        )
      })()}
    </div>
  )
}

export default TimelineView