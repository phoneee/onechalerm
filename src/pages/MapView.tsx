import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { motion } from 'framer-motion'
import { disappearanceCases } from '@/data/timeline-data'
import { getReferencesByDisappearanceCase } from '@/data/cross-references'
import { getArticleById } from '@/data/articles'
import ArticleView from '@/components/ArticleView'
import { getImagesByPerson, realImages } from '@/data/real-images'
import type { NavigationState } from '@/App'

// You'll need to add your Mapbox token here
mapboxgl.accessToken = 'pk.eyJ1IjoicGhvbmVlZWlpIiwiYSI6ImNqc3cwcWkyeDBhNHQ0M29kOHFqaWNobmkifQ.pHS6CrjZkbo6DZuY55tdKw'

interface MapViewProps {
  navigationState?: NavigationState
}

const MapView = ({ navigationState }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [mapError, setMapError] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const popupsRef = useRef<mapboxgl.Popup[]>([])

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    try {
      // Initialize map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [102.5, 16.5], // Center on Southeast Asia
        zoom: 5,
        minZoom: 4, // Limit minimum zoom
        maxZoom: 8, // Limit maximum zoom to prevent going too far
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // Wait for map to load
      map.current.on('load', () => {
        if (!map.current) return
        
        // Handle navigation from search
        if (navigationState?.coordinates) {
          map.current.flyTo({
            center: navigationState.coordinates,
            zoom: 7,
            duration: 2000
          })
        }

        // Add source for disappearance locations
        map.current.addSource('disappearances', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: disappearanceCases.map(person => ({
              type: 'Feature',
              properties: {
                id: person.id,
                name: person.name,
                nameEn: person.nameEn,
                date: person.date,
                location: person.location,
                country: person.country,
                status: person.status,
                age: person.age,
                background: person.background,
                lastSeen: person.lastSeen,
              },
              geometry: {
                type: 'Point',
                coordinates: person.coordinates,
              },
            })),
          },
        })

        // Add circles for each disappearance
        map.current.addLayer({
          id: 'disappearance-circles',
          type: 'circle',
          source: 'disappearances',
          paint: {
            'circle-radius': [
              'case',
              ['==', ['get', 'status'], 'found_dead'],
              12,
              10
            ],
            'circle-color': [
              'case',
              ['==', ['get', 'status'], 'found_dead'],
              '#ef4444',
              '#f59e0b'
            ],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 2,
            'circle-opacity': 0.8,
          },
        })

        // Add labels
        map.current.addLayer({
          id: 'disappearance-labels',
          type: 'symbol',
          source: 'disappearances',
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
            'text-size': 12,
            'text-offset': [0, 1.5],
            'text-anchor': 'top',
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': '#1a1b1e',
            'text-halo-width': 2,
          },
        })

        // Create custom markers with popups for each person
        disappearanceCases.forEach(person => {
          const refs = getReferencesByDisappearanceCase(person.id)
          const articleIds = refs.flatMap(r => r.articleIds || [])
          const uniqueArticleIds = [...new Set(articleIds)]
          const personImages = getImagesByPerson(person.id)
          const primaryImage = personImages.find(img => img.tags.includes('portrait')) || personImages[0]
          
          // Create custom marker element
          const el = document.createElement('div')
          el.className = 'custom-marker'
          el.innerHTML = `
            <div class="relative cursor-pointer transform transition-transform hover:scale-110">
              <div class="w-12 h-12 rounded-full border-2 ${person.status === 'found_dead' ? 'border-red-500' : 'border-yellow-500'} overflow-hidden shadow-lg">
                ${primaryImage ? 
                  `<img src="${primaryImage.url}" alt="${person.name}" class="w-full h-full object-cover" />` : 
                  `<div class="w-full h-full ${person.status === 'found_dead' ? 'bg-red-500' : 'bg-yellow-500'} flex items-center justify-center text-white font-bold">
                    ${person.name.charAt(0)}
                  </div>`
                }
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${person.status === 'found_dead' ? 'bg-red-600' : 'bg-yellow-600'} border-2 border-white"></div>
            </div>
          `
          
          // Create popup content
          const popupContent = `
            <div class="p-4 max-w-sm">
              <div class="flex items-start gap-3 mb-3">
                ${primaryImage ? 
                  `<img src="${primaryImage.url}" alt="${person.name}" class="w-16 h-16 rounded-full object-cover" />` : 
                  `<div class="w-16 h-16 rounded-full ${person.status === 'found_dead' ? 'bg-red-500' : 'bg-yellow-500'} flex items-center justify-center text-white font-bold text-xl">
                    ${person.name.charAt(0)}
                  </div>`
                }
                <div class="flex-1">
                  <h3 class="font-bold text-lg">${person.name}</h3>
                  <p class="text-sm opacity-75">${person.nameEn}</p>
                  <div class="badge ${person.status === 'found_dead' ? 'badge-error' : 'badge-warning'} badge-sm mt-1">
                    ${person.status === 'missing' ? 'สูญหาย' : 'พบศพ'}
                  </div>
                </div>
              </div>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="opacity-75">วันที่หายตัว:</span>
                  <span>${person.date}</span>
                </div>
                <div class="flex justify-between">
                  <span class="opacity-75">สถานที่:</span>
                  <span>${person.location}</span>
                </div>
                <div class="flex justify-between">
                  <span class="opacity-75">อายุ:</span>
                  <span>${person.age} ปี</span>
                </div>
              </div>
              <button class="btn btn-primary btn-sm w-full mt-3" onclick="window.dispatchEvent(new CustomEvent('selectCase', { detail: '${person.id}' }))">
                ดูรายละเอียด
              </button>
            </div>
          `
          
          // Create popup
          const popup = new mapboxgl.Popup({
            offset: 25,
            className: 'mapbox-popup'
          }).setHTML(popupContent)
          
          // Create marker
          const marker = new mapboxgl.Marker(el)
            .setLngLat(person.coordinates)
            .setPopup(popup)
            .addTo(map.current!)
          
          markersRef.current.push(marker)
          popupsRef.current.push(popup)
        })
        
        // Add click event
        map.current.on('click', 'disappearance-circles', (e) => {
          if (!e.features || !e.features[0]) return
          const properties = e.features[0].properties
          if (properties) {
            setSelectedCase(properties.id)
          }
        })

        // Change cursor on hover
        map.current.on('mouseenter', 'disappearance-circles', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer'
          }
        })

        map.current.on('mouseleave', 'disappearance-circles', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = ''
          }
        })

        // Add Mekong River highlight with more accurate path
        map.current.addLayer({
          id: 'mekong-river',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: { name: 'Mekong River' },
                geometry: {
                  type: 'LineString',
                  coordinates: [
                    // Upper Mekong in Laos
                    [102.14, 22.0],
                    [102.18, 21.5],
                    [102.6, 20.5],
                    [102.22, 20.0],
                    [102.6, 19.5],
                    [102.33, 19.0],
                    [102.6, 18.5],
                    [103.2, 18.3],
                    [103.8, 18.0],
                    [104.2, 17.8],
                    [104.7833, 17.4167], // Nakhon Phanom - where bodies were found
                    [105.0, 17.0],
                    [105.2, 16.5],
                    [105.3, 16.0],
                    [105.5, 15.5],
                    [105.6, 15.0],
                    [105.3, 14.5],
                    [105.2, 14.0],
                    [105.0, 13.5],
                    [104.95, 13.0],
                    [104.9, 12.5],
                    [104.9282, 11.5564], // Phnom Penh - Wanchalearm location
                    [105.0, 11.0],
                    [105.3, 10.5],
                    [105.8, 10.2],
                    [106.2, 10.0] // Mekong Delta
                  ]
                }
              }]
            }
          },
          paint: {
            'line-color': '#60a5fa',
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4, 4,
              6, 6,
              8, 8
            ],
            'line-opacity': 0.7,
            'line-blur': 0.5
          }
        })

        // Add glow effect for Mekong River
        map.current.addLayer({
          id: 'mekong-river-glow',
          type: 'line',
          source: 'mekong-river',
          paint: {
            'line-color': '#3b82f6',
            'line-width': [
              'interpolate',
              ['linear'],
              ['zoom'],
              4, 8,
              6, 12,
              8, 16
            ],
            'line-opacity': 0.3,
            'line-blur': 3
          }
        }, 'mekong-river')

        // Add river label
        map.current.addLayer({
          id: 'mekong-label',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: { name: 'แม่น้ำโขง' },
                geometry: {
                  type: 'Point',
                  coordinates: [104.7833, 17.4167]
                }
              }]
            }
          },
          layout: {
            'text-field': ['get', 'name'],
            'text-font': ['DIN Pro Medium', 'Arial Unicode MS Regular'],
            'text-size': 14,
            'text-transform': 'uppercase',
            'text-letter-spacing': 0.2,
          },
          paint: {
            'text-color': '#60a5fa',
            'text-halo-color': '#1e293b',
            'text-halo-width': 2,
          }
        })

        // Add country borders
        map.current.addLayer({
          id: 'country-borders',
          type: 'line',
          source: {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-streets-v8',
          },
          'source-layer': 'admin',
          filter: ['==', 'admin_level', 0],
          paint: {
            'line-color': '#4b5563',
            'line-width': 1,
            'line-opacity': 0.5,
          },
        })
      })

      map.current.on('error', () => {
        setMapError(true)
      })
    } catch (error) {
      setMapError(true)
    }

    // Listen for custom select case event
    const handleSelectCase = (e: CustomEvent) => {
      setSelectedCase(e.detail)
    }
    window.addEventListener('selectCase', handleSelectCase as EventListener)
    
    // Cleanup
    return () => {
      window.removeEventListener('selectCase', handleSelectCase as EventListener)
      markersRef.current.forEach(marker => marker.remove())
      popupsRef.current.forEach(popup => popup.remove())
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [navigationState?.coordinates])

  const selectedCaseData = selectedCase 
    ? disappearanceCases.find(c => c.id === selectedCase)
    : null

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
            ภูมิศาสตร์แห่ง<span className="text-primary">ความหวาดกลัว</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            แผนที่แสดงจุดที่นักเคลื่อนไหวทั้ง 9 คนหายตัวในประเทศเพื่อนบ้าน
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="card bg-base-200 shadow-xl overflow-hidden">
            <div 
              ref={mapContainer} 
              className="w-full h-[600px]"
            />
            
            {mapError && (
              <div className="absolute inset-0 flex items-center justify-center bg-base-300">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🗺️</div>
                  <h3 className="text-xl font-bold mb-2">ไม่สามารถโหลดแผนที่ได้</h3>
                  <p className="text-sm opacity-60">กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <div className="badge badge-lg badge-warning gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              สูญหาย
            </div>
            <div className="badge badge-lg badge-error gap-2">
              <div className="w-3 h-3 rounded-full bg-error" />
              พบศพ
            </div>
            <div className="badge badge-lg badge-info gap-2">
              <div className="w-3 h-3 rounded bg-blue-500" />
              แม่น้ำโขง
            </div>
          </div>
          <p className="text-center text-sm opacity-60">
            <span className="text-error">⚠️</span> 2 ใน 9 คนถูกพบเป็นศพในแม่น้ำโขง
          </p>
        </motion.div>

        {/* Selected Case Info */}
        {selectedCaseData && (() => {
          const personImages = getImagesByPerson(selectedCaseData.id)
          const primaryImage = personImages.find(img => img.tags.includes('portrait')) || personImages[0]
          
          return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
              {primaryImage && (
                <figure className="relative h-64">
                  <img 
                    src={primaryImage.url} 
                    alt={selectedCaseData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent" />
                  {primaryImage.credit && (
                    <div className="absolute bottom-2 right-2 text-xs opacity-50">
                      © {primaryImage.credit}
                    </div>
                  )}
                </figure>
              )}
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-2xl">{selectedCaseData.name}</h3>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-sm opacity-60 mb-4">{selectedCaseData.nameEn}</p>
                
                <div className="divider"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm opacity-60">วันที่หายตัว</p>
                    <p className="font-medium">{selectedCaseData.date}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60">สถานที่</p>
                    <p className="font-medium">{selectedCaseData.location}, {selectedCaseData.country}</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60">อายุ</p>
                    <p className="font-medium">{selectedCaseData.age} ปี</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-60">สถานะ</p>
                    <div className={`badge ${selectedCaseData.status === 'missing' ? 'badge-warning' : 'badge-error'}`}>
                      {selectedCaseData.status === 'missing' ? 'สูญหาย' : 'พบศพ'}
                    </div>
                  </div>
                </div>
                
                <div className="divider"></div>
                
                <div>
                  <p className="text-sm opacity-60 mb-2">ภูมิหลัง</p>
                  <p className="text-sm">{selectedCaseData.background}</p>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm opacity-60 mb-2">ครั้งสุดท้ายที่พบเห็น</p>
                  <p className="text-sm">{selectedCaseData.lastSeen}</p>
                </div>
                
                {/* Related Articles */}
                {(() => {
                  const refs = selectedCase ? getReferencesByDisappearanceCase(selectedCase) : []
                  const articleIds = refs.flatMap(r => r.articleIds || [])
                  const uniqueArticleIds = [...new Set(articleIds)]
                  
                  if (uniqueArticleIds.length > 0) {
                    return (
                      <div className="mt-4 pt-4 border-t border-base-300">
                        <p className="text-sm font-medium mb-2">บทความที่เกี่ยวข้อง:</p>
                        <div className="flex flex-col gap-2">
                          {uniqueArticleIds.map(articleId => {
                            const article = getArticleById(articleId)
                            if (!article) return null
                            return (
                              <button
                                key={articleId}
                                onClick={() => setSelectedArticle(articleId)}
                                className="btn btn-sm btn-ghost justify-start"
                              >
                                📝 {article.title}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  }
                  return null
                })()}
              </div>
            </div>
          </motion.div>
          )
        })()}

        {/* Stats by Country */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-display font-bold text-center mb-8">
            สถิติการหายตัวแยกตามประเทศ
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">🇱🇦</div>
                <h4 className="card-title justify-center">ลาว</h4>
                <div className="stat-value text-primary">5</div>
                <div className="stat-desc">คนหายตัว</div>
                <div className="badge badge-error badge-sm mt-2">2 พบศพในแม่น้ำโขง</div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">🇻🇳</div>
                <h4 className="card-title justify-center">เวียดนาม</h4>
                <div className="stat-value text-primary">3</div>
                <div className="stat-desc">คนหายตัว</div>
                <div className="badge badge-warning badge-sm mt-2">ทั้งหมดยังสูญหาย</div>
              </div>
            </div>
            
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body text-center">
                <div className="text-5xl mb-4">🇰🇭</div>
                <h4 className="card-title justify-center">กัมพูชา</h4>
                <div className="stat-value text-primary">1</div>
                <div className="stat-desc">คนหายตัว</div>
                <div className="badge badge-warning badge-sm mt-2">วันเฉลิม</div>
              </div>
            </div>
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

export default MapView