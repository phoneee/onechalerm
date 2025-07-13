import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import scrollama from 'scrollama'
import { getArticleById } from '@/data/articles'
import { getReferencesByTimelineEvent } from '@/data/cross-references'

interface StorySection {
  id: string
  title: string
  content: string
  backgroundType: 'gradient' | 'image' | 'video'
  backgroundData?: string
  relatedArticles?: string[]
  relatedEvents?: string[]
}

const StoryView = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const sections: StorySection[] = [
    {
      id: 'intro',
      title: 'การบังคับบุคคลให้สูญหายครั้งล่าสุด',
      content: '4 มิถุนายน 2563 วันเฉลิม สัตย์ศักดิ์สิทธิ์ ถูกลักพาตัวหน้าคอนโด Mekong Gardens กรุงพนมเปญ กัมพูชา เป็นกรณีล่าสุดของการบังคับบุคคลให้สูญหายที่เกิดขึ้นกับนักเคลื่อนไหวการเมืองไทยในต่างประเทศ',
      backgroundType: 'gradient',
      relatedArticles: ['the-abduction'],
      relatedEvents: ['abduction']
    },
    {
      id: 'the-man',
      title: 'ประวัติผู้สูญหาย',
      content: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์ อดีตผู้ประสานงานทางการเมือง หลบหนีออกจากประเทศไทยหลังรัฐประหาร 2557 พำนักอยู่ในกัมพูชาภายใต้ชื่อ "ซก เฮง" ตามเอกสารเดินทาง มีบทบาทในการช่วยเหลือผู้ลี้ภัยการเมืองไทยคนอื่นๆ',
      backgroundType: 'gradient',
      relatedArticles: ['who-is-wanchalearm'],
      relatedEvents: ['work-pheu-thai', 'flee-cambodia']
    },
    {
      id: 'the-network',
      title: 'บทบาทในชุมชนผู้ลี้ภัย',
      content: 'วันเฉลิมทำหน้าที่ประสานงานช่วยเหลือผู้ลี้ภัยการเมืองไทยในกัมพูชา ให้คำแนะนำเรื่องที่พัก การดำรงชีพ และความปลอดภัย บทบาทนี้อาจเป็นปัจจัยที่ทำให้ถูกเลือกเป็นเป้าหมาย',
      backgroundType: 'gradient',
      relatedArticles: ['who-is-wanchalearm']
    },
    {
      id: 'the-pattern',
      title: 'สถิติการบังคับบุคคลให้สูญหาย',
      content: 'ข้อมูลจาก UN Working Group: ประเทศไทยมีกรณีบังคับบุคคลให้สูญหาย 93 ราย (2523-2567) ยังไม่ได้รับการแก้ไข 77 ราย หลังปี 2557 มีนักเคลื่อนไหวไทย 9 คนหายตัวในประเทศเพื่อนบ้าน: ลาว 5 คน เวียดนาม 3 คน กัมพูชา 1 คน',
      backgroundType: 'gradient',
      relatedArticles: ['transnational-repression'],
      relatedEvents: ['the-pattern']
    },
    {
      id: 'the-river',
      title: 'กรณีพบศพในแม่น้ำโขง',
      content: 'ชัชชาญ บุญเฟื่อง และ ไกรเดช ทนงศึก ผู้ช่วยของ สุรชัย แซ่ด่าน ถูกพบเป็นศพในแม่น้ำโขง บริเวณนครพนม เมื่อปี 2562 ทั้งสามคนหายตัวพร้อมกันจากลาวเมื่อธันวาคม 2561',
      backgroundType: 'gradient',
      relatedArticles: ['transnational-repression']
    },
    {
      id: 'the-void',
      title: 'ผลกระทบต่อชุมชนผู้ลี้ภัย',
      content: 'การหายตัวของวันเฉลิมส่งผลกระทบต่อผู้ลี้ภัยการเมืองไทยในกัมพูชา หลายคนย้ายที่พัก เปลี่ยนรูปแบบการสื่อสาร และเพิ่มมาตรการรักษาความปลอดภัย สะท้อนบรรยากาศความหวาดกลัวในชุมชนผู้ลี้ภัย',
      backgroundType: 'gradient',
      relatedArticles: ['impunity-system']
    },
    {
      id: 'justice',
      title: 'สถานะคดีและการเรียกร้องความยุติธรรม',
      content: 'กุมภาพันธ์ 2567 ทางการกัมพูชาประกาศปิดคดี อ้างไม่พบหลักฐาน ฝ่ายไทยอ้างข้อจำกัดอำนาจสอบสวนนอกประเทศ สิตานันท์ สัตย์ศักดิ์สิทธิ์ พี่สาว ยื่นเอกสาร 177 หน้าต่อหน่วยงานต่างๆ UN และองค์กรสิทธิมนุษยชนยังติดตามคดี',
      backgroundType: 'gradient',
      relatedArticles: ['sister-fight', 'impunity-system'],
      relatedEvents: ['sister-testimony', 'case-closed']
    },
  ]

  useEffect(() => {
    const scroller = scrollama()

    scroller
      .setup({
        step: '.scroll-section',
        offset: 0.5,
      })
      .onStepEnter((response) => {
        setCurrentSection(response.index)
      })

    return () => scroller.destroy()
  }, [])

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed Background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-base-300 via-base-100 to-base-300" />
        
        {/* Animated elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Progress indicator */}
      <progress 
        className="progress progress-primary fixed top-0 left-0 right-0 z-50 h-1 bg-transparent"
        value={scrollYProgress.get() * 100} 
        max="100"
      ></progress>

      {/* Sections */}
      <div className="relative z-10">
        {sections.map((section, index) => (
          <section
            key={section.id}
            className="scroll-section min-h-screen flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="badge badge-primary badge-lg mb-4">
                  ตอนที่ {index + 1} จาก {sections.length}
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-display font-bold mb-8"
              >
                {section.title}
              </motion.h2>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card bg-base-200/80 backdrop-blur shadow-2xl max-w-3xl mx-auto"
              >
                <div className="card-body">
                  <p className="text-xl leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </motion.div>

              {/* Special content for specific sections */}
              {section.id === 'the-pattern' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-12"
                >
                  <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="stat">
                      <div className="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="stat-title">ลาว</div>
                      <div className="stat-value text-primary">5</div>
                      <div className="stat-desc">คนหายตัว</div>
                    </div>
                    
                    <div className="stat">
                      <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="stat-title">เวียดนาม</div>
                      <div className="stat-value text-secondary">3</div>
                      <div className="stat-desc">คนหายตัว</div>
                    </div>
                    
                    <div className="stat">
                      <div className="stat-figure text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="stat-title">กัมพูชา</div>
                      <div className="stat-value text-accent">1</div>
                      <div className="stat-desc">คนหายตัว</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {section.id === 'justice' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-12"
                >
                  <button className="btn btn-primary btn-lg">
                    เรียกร้องความยุติธรรม
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </motion.div>
              )}

              {/* Related Articles */}
              {section.relatedArticles && section.relatedArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8"
                >
                  <div className="flex flex-wrap gap-2 justify-center">
                    {section.relatedArticles.map(articleId => {
                      const article = getArticleById(articleId)
                      if (!article) return null
                      return (
                        <a
                          key={articleId}
                          href={`#/articles/${articleId}`}
                          className="btn btn-sm btn-ghost gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {article.title}
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </section>
        ))}
      </div>

      {/* Section indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <ul className="steps steps-vertical">
          {sections.map((section, index) => (
            <li 
              key={section.id}
              className={`step ${currentSection >= index ? 'step-primary' : ''}`}
              data-content={currentSection === index ? '●' : ''}
            >
              <button
                onClick={() => {
                  const element = document.querySelectorAll('.scroll-section')[index]
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn btn-ghost btn-xs"
                aria-label={`Go to section ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StoryView