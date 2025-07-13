import { useState } from 'react'
import UnifiedSearch from './UnifiedSearch'
import { motion } from 'framer-motion'

type ViewType = 'overview' | 'cases' | 'timeline' | 'map' | 'documents'

interface NavigationProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
  onNavigate?: (view: ViewType, state?: any) => void
}

const Navigation = ({ currentView, onViewChange, onNavigate }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems: { id: ViewType; label: string; description: string; icon: string }[] = [
    { id: 'overview', label: 'ภาพรวม', description: 'สถิติและข้อมูล', icon: '📊' },
    { id: 'cases', label: 'รายละเอียด 9 กรณี', description: 'ข้อมูลผู้สูญหาย', icon: '👥' },
    { id: 'timeline', label: 'ลำดับเหตุการณ์', description: 'เหตุการณ์ 2559-2563', icon: '⏰' },
    { id: 'map', label: 'แผนที่', description: 'ตำแหน่งที่เกิดเหตุ', icon: '🗺️' },
    { id: 'documents', label: 'เอกสาร/หลักฐาน', description: 'รายงานและแหล่งข้อมูล', icon: '📄' },
  ]

  // Show progress indicator when scrolling
  const [scrollProgress, setScrollProgress] = useState(0)
  
  // Track scroll progress
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(progress)
    })
  }

  return (
    <div className="navbar bg-base-200 border-b border-base-300 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 h-0.5 bg-primary"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="navbar-start">
        <div className="dropdown">
          <label 
            tabIndex={0} 
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          {isMenuOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-200 rounded-box w-72">
              {navItems.map(item => (
                <li key={item.id}>
                  <a 
                    onClick={() => {
                      onViewChange(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={currentView === item.id ? 'active' : ''}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs opacity-60">{item.description}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl font-display">
          <span className="text-primary">Onechalerm</span>
          <span className="divider divider-horizontal mx-0"></span>
          <span className="text-sm opacity-70">การบังคับบุคคลให้สูญหาย</span>
        </a>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navItems.map(item => (
            <li key={item.id} className="tooltip tooltip-bottom" data-tip={item.description}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`btn btn-sm ${currentView === item.id ? 'btn-primary' : 'btn-ghost'}`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        <UnifiedSearch 
          onResultClick={(result) => {
            // Handle search result clicks
            if (result.type === 'timeline' || result.type === 'person') {
              if (onNavigate) {
                onNavigate('timeline', { targetId: result.id, targetType: result.type })
              } else {
                onViewChange('timeline')
              }
            } else if (result.type === 'article') {
              if (onNavigate) {
                onNavigate('dashboard', { targetId: result.id, targetType: result.type })
              } else {
                onViewChange('dashboard')
              }
            } else if (result.type === 'location') {
              const coords = result.id.replace('location-', '').split('-').map(Number)
              if (onNavigate) {
                onNavigate('map', { 
                  coordinates: [coords[1], coords[0]] as [number, number],
                  targetType: result.type 
                })
              } else {
                onViewChange('map')
              }
            }
          }}
        />
        
        {/* Share Button */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9 9 0 10-13.432 0m13.432 0A9 9 0 0112 21a9 9 0 01-3.716-7.976" />
            </svg>
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-200 rounded-box w-52">
            <li><a onClick={() => navigator.share({ title: 'Onechalerm', url: window.location.href })}>แชร์</a></li>
            <li><a onClick={() => navigator.clipboard.writeText(window.location.href)}>คัดลอกลิงก์</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation