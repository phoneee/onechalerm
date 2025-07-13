import { motion } from 'framer-motion'
import { Article } from '@/data/articles'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

interface ArticleCardProps {
  article: Article
  onClick?: () => void
}

const ArticleCard = ({ article, onClick }: ArticleCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="card bg-base-200 shadow-xl cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          <time className="text-sm opacity-60">
            {format(new Date(article.date), 'd MMMM yyyy', { locale: th })}
          </time>
        </div>
        
        <h3 className="card-title text-lg">
          {article.title}
        </h3>
        
        {article.subtitle && (
          <p className="text-sm opacity-80 mb-2">
            {article.subtitle}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {article.tags.map(tag => (
            <span key={tag} className="badge badge-sm badge-outline">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleCard