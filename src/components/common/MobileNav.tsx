import { motion } from 'framer-motion'

type ViewType = 'timeline' | 'network' | 'map' | 'story' | 'dashboard'

interface MobileNavProps {
  currentView: ViewType
  onViewChange: (view: ViewType) => void
}

const MobileNav = ({ currentView, onViewChange }: MobileNavProps) => {
  const navItems: { id: ViewType; label: string; icon: string }[] = [
    { id: 'story', label: 'เรื่องราว', icon: '📖' },
    { id: 'timeline', label: 'ไทม์ไลน์', icon: '⏰' },
    { id: 'map', label: 'แผนที่', icon: '🗺️' },
    { id: 'network', label: 'เครือข่าย', icon: '🕸️' },
    { id: 'dashboard', label: 'ภาพรวม', icon: '📊' },
  ]

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="btm-nav btm-nav-sm lg:hidden z-50 bg-base-200 border-t border-base-300"
    >
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={currentView === item.id ? 'active' : ''}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="btm-nav-label text-xs">{item.label}</span>
        </button>
      ))}
    </motion.div>
  )
}

export default MobileNav