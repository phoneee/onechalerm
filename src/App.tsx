import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/common/Navigation'
import MobileNav from './components/common/MobileNav'
import Hero from './components/common/Hero'
import TimelineView from './pages/TimelineView'
import NetworkView from './pages/NetworkView'
import MapView from './pages/MapView'
import StoryView from './pages/StoryView'
import DashboardView from './pages/DashboardView'
import DocumentsView from './pages/DocumentsView'

type ViewType = 'overview' | 'cases' | 'timeline' | 'map' | 'documents'

export interface NavigationState {
  targetId?: string
  targetType?: 'timeline' | 'person' | 'article' | 'location'
  coordinates?: [number, number]
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('overview')
  const [navigationState, setNavigationState] = useState<NavigationState>({})

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardView navigationState={navigationState} />
      case 'cases':
        return <StoryView />
      case 'timeline':
        return <TimelineView navigationState={navigationState} />
      case 'map':
        return <MapView navigationState={navigationState} />
      case 'documents':
        return <DocumentsView />
      default:
        return <DashboardView navigationState={navigationState} />
    }
  }
  
  // Handle navigation from search or other components
  const handleNavigation = (view: ViewType, state?: NavigationState) => {
    setCurrentView(view)
    if (state) {
      setNavigationState(state)
    }
  }
  
  // Clear navigation state after navigation
  useEffect(() => {
    if (navigationState.targetId) {
      const timer = setTimeout(() => {
        setNavigationState({})
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [navigationState])

  return (
    <div className="min-h-screen bg-base-100 text-base-content" data-theme="dark">
      <Navigation 
        currentView={currentView} 
        onViewChange={(view) => handleNavigation(view)} 
        onNavigate={handleNavigation}
      />
      
      {currentView === 'overview' && <Hero />}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {renderView()}
        </motion.main>
      </AnimatePresence>
      
      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={currentView} onViewChange={handleNavigation} />
    </div>
  )
}

export default App