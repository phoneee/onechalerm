import { motion } from 'framer-motion'
import { getImageById, getFallbackImage } from '@/data/real-images'

interface ShareCardProps {
  title: string
  subtitle?: string
  content: string
  imageId?: string
  type: 'article' | 'timeline' | 'person' | 'fact'
  date?: string
  stats?: {
    label: string
    value: string | number
  }[]
}

const ShareCard = ({ title, subtitle, content, imageId, type, date, stats }: ShareCardProps) => {
  const image = imageId ? getImageById(imageId) : null
  const imageUrl = image?.url || getFallbackImage(type)
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: subtitle || content.substring(0, 100),
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href)
      // TODO: Show toast notification
    }
  }
  
  const handleDownload = async () => {
    // Create canvas for social media image
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 630
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    // Background
    ctx.fillStyle = '#1a1a1a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Add gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)')
    gradient.addColorStop(1, 'rgba(239, 68, 68, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Load and draw image if available
    if (imageUrl && !imageUrl.includes('placeholder')) {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = imageUrl
        })
        
        // Draw image with overlay
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } catch (err) {
        console.error('Failed to load image:', err)
      }
    }
    
    // Text content
    ctx.fillStyle = '#ffffff'
    
    // Title
    ctx.font = 'bold 48px sans-serif'
    const titleLines = wrapText(ctx, title, 80, 200, 1040, 60)
    titleLines.forEach((line, i) => {
      ctx.fillText(line, 80, 200 + (i * 60))
    })
    
    // Subtitle
    if (subtitle) {
      ctx.font = '32px sans-serif'
      ctx.fillStyle = '#cccccc'
      ctx.fillText(subtitle, 80, 320)
    }
    
    // Stats
    if (stats && stats.length > 0) {
      ctx.font = 'bold 36px sans-serif'
      stats.forEach((stat, i) => {
        const x = 80 + (i * 300)
        const y = 450
        ctx.fillStyle = '#ef4444'
        ctx.fillText(stat.value.toString(), x, y)
        ctx.fillStyle = '#999999'
        ctx.font = '24px sans-serif'
        ctx.fillText(stat.label, x, y + 35)
        ctx.font = 'bold 36px sans-serif'
      })
    }
    
    // Branding
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 28px sans-serif'
    ctx.fillText('ONECHALERM', 80, 570)
    ctx.font = '20px sans-serif'
    ctx.fillStyle = '#999999'
    ctx.fillText('เส้นทางสู่ความมืด | onechalerm.com', 80, 600)
    
    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `onechalerm-${type}-${Date.now()}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }
  
  // Helper function to wrap text
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''
    
    words.forEach(word => {
      const testLine = currentLine + (currentLine ? ' ' : '') + word
      const metrics = ctx.measureText(testLine)
      
      if (metrics.width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    })
    
    if (currentLine) {
      lines.push(currentLine)
    }
    
    return lines
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-base-200 shadow-xl overflow-hidden"
    >
      {/* Image */}
      <figure className="relative h-48 md:h-64">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <div className="badge badge-primary badge-lg">
            {type === 'article' && 'บทความ'}
            {type === 'timeline' && 'เหตุการณ์'}
            {type === 'person' && 'บุคคล'}
            {type === 'fact' && 'ข้อเท็จจริง'}
          </div>
        </div>
      </figure>
      
      <div className="card-body">
        <h3 className="card-title text-lg md:text-xl">{title}</h3>
        {subtitle && <p className="text-sm opacity-60">{subtitle}</p>}
        
        <p className="text-sm opacity-80 line-clamp-3">{content}</p>
        
        {stats && stats.length > 0 && (
          <div className="flex gap-4 mt-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs opacity-60">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
        
        {date && (
          <div className="text-xs opacity-60 mt-2">
            {new Date(date).toLocaleDateString('th-TH', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        )}
        
        <div className="card-actions justify-end mt-4">
          <button 
            onClick={handleDownload}
            className="btn btn-ghost btn-sm"
            aria-label="Download as image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          <button 
            onClick={handleShare}
            className="btn btn-primary btn-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9 9 0 10-13.432 0m13.432 0A9 9 0 0112 21a9 9 0 01-3.716-7.976" />
            </svg>
            แชร์
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ShareCard