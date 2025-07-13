// Placeholder images for development
// In production, these should be replaced with actual images

export const placeholderImages = {
  // Portraits
  'wanchalearm-portrait': 'https://via.placeholder.com/400x500/1a1b1e/ef4444?text=Wanchalearm',
  'chatchart-wanchalearm': 'https://via.placeholder.com/600x400/1a1b1e/3b82f6?text=Political+Work',
  'sitanun-portrait': 'https://via.placeholder.com/400x500/1a1b1e/10b981?text=Sitanun',
  
  // Locations
  'mekong-gardens': 'https://via.placeholder.com/800x600/1a1b1e/f59e0b?text=Mekong+Gardens',
  'cctv-footage': 'https://via.placeholder.com/800x600/374151/9ca3af?text=CCTV+Footage',
  'mekong-river': 'https://via.placeholder.com/800x600/1a1b1e/06b6d4?text=Mekong+River',
  
  // Documents
  'court-submission': 'https://via.placeholder.com/600x800/1a1b1e/8b5cf6?text=Court+Documents',
  'protest-blocked': 'https://via.placeholder.com/800x600/1a1b1e/ef4444?text=Protest+Blocked',
  
  // Infographics
  'disappearance-map': 'https://via.placeholder.com/1200x800/1a1b1e/f59e0b?text=Disappearance+Map',
  'bureaucratic-maze': 'https://via.placeholder.com/1000x800/1a1b1e/3b82f6?text=Bureaucratic+Maze',
  'timeline-denial': 'https://via.placeholder.com/1200x600/1a1b1e/ef4444?text=Timeline+of+Denial',
}

export const getPlaceholderImage = (id: string): string => {
  return placeholderImages[id as keyof typeof placeholderImages] || 
    'https://via.placeholder.com/600x400/1a1b1e/9ca3af?text=No+Image'
}