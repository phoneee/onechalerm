import { useState, useEffect } from 'react'
import { realImages, getFallbackImage } from '@/data/real-images'

interface ImageWithFallbackProps {
  imageId?: string
  src?: string
  alt: string
  className?: string
  fallbackType?: 'portrait' | 'location' | 'document' | 'protest'
}

const ImageWithFallback = ({ 
  imageId, 
  src, 
  alt, 
  className = '', 
  fallbackType = 'portrait' 
}: ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorCount, setErrorCount] = useState(0)

  useEffect(() => {
    // Reset state when imageId or src changes
    setIsLoading(true)
    setErrorCount(0)

    if (imageId) {
      // Find image by ID
      const imageData = realImages.find(img => img.id === imageId)
      if (imageData) {
        setImageSrc(imageData.url)
      } else {
        setImageSrc(getFallbackImage(fallbackType))
        setIsLoading(false)
      }
    } else if (src) {
      setImageSrc(src)
    } else {
      setImageSrc(getFallbackImage(fallbackType))
      setIsLoading(false)
    }
  }, [imageId, src, fallbackType])

  const handleError = () => {
    if (imageId) {
      const imageData = realImages.find(img => img.id === imageId)
      if (imageData && 'backupUrls' in imageData && imageData.backupUrls) {
        // Try backup URLs
        if (errorCount < imageData.backupUrls.length) {
          setImageSrc(imageData.backupUrls[errorCount])
          setErrorCount(errorCount + 1)
          return
        }
      }
    }
    
    // All URLs failed, use fallback
    setImageSrc(getFallbackImage(fallbackType))
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-base-300 animate-pulse">
          <div className="loading loading-spinner loading-sm"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  )
}

export default ImageWithFallback