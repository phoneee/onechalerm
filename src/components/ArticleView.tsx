import { motion } from 'framer-motion'
import { Article } from '@/data/articles'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'
import ReactMarkdown from 'react-markdown'

interface ArticleViewProps {
  article: Article
  onClose?: () => void
}

const ArticleView = ({ article, onClose }: ArticleViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-base-100"
    >
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-base-100/80 backdrop-blur border-b border-base-300">
          <div className="container max-w-4xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button
                onClick={onClose}
                className="btn btn-ghost btn-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                กลับ
              </button>
              
              <div className="flex gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="badge badge-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <header className="mb-8">
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {article.title}
              </h1>
              {article.subtitle && (
                <p className="text-xl opacity-80 mb-4">
                  {article.subtitle}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm opacity-60">
                <time>
                  {format(new Date(article.date), 'd MMMM yyyy', { locale: th })}
                </time>
                {article.author && (
                  <>
                    <span>•</span>
                    <span>{article.author}</span>
                  </>
                )}
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-8 mb-4 text-primary">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-6 italic opacity-90">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2">
                      {children}
                    </ol>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            {/* Media Assets */}
            {article.mediaAssets && article.mediaAssets.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">สื่อประกอบ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.mediaAssets.map(asset => (
                    <motion.div
                      key={asset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card bg-base-200 shadow-xl overflow-hidden"
                    >
                      {asset.type === 'image' && (
                        <>
                          <figure>
                            <img
                              src={getPlaceholderImage(asset.id)}
                              alt={asset.altText || asset.caption}
                              className="w-full h-64 object-cover"
                            />
                          </figure>
                          {asset.caption && (
                            <div className="card-body p-4">
                              <p className="text-sm">{asset.caption}</p>
                              {asset.credit && (
                                <p className="text-xs opacity-60 mt-1">
                                  Credit: {asset.credit}
                                </p>
                              )}
                            </div>
                          )}
                        </>
                      )}
                      
                      {asset.type === 'audio' && (
                        <div className="card-body">
                          <div className="flex items-center gap-4">
                            <div className="btn btn-circle btn-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{asset.caption}</p>
                              <p className="text-sm opacity-60">ไฟล์เสียง</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {asset.type === 'video' && (
                        <div className="card-body">
                          <div className="flex items-center gap-4">
                            <div className="btn btn-circle btn-primary">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{asset.caption}</p>
                              <p className="text-sm opacity-60">วิดีโอ</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Related Events */}
            {article.relatedEventIds && article.relatedEventIds.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">เหตุการณ์ที่เกี่ยวข้อง</h3>
                <div className="flex flex-wrap gap-2">
                  {article.relatedEventIds.map(eventId => (
                    <button
                      key={eventId}
                      className="btn btn-sm btn-outline"
                    >
                      ดูเหตุการณ์: {eventId}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleView