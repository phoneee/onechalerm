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
      title: '4 มิถุนายน 2563 เวลา 17:54 น.',
      content: 'เสียงโทรศัพท์ดังขึ้น วันเฉลิมกำลังคุยกับเพื่อนขณะเดินออกจากคอนโด Mekong Gardens ในกรุงพนมเปญ "กำลังไปซื้อของ เดี๋ยวโทรกลับนะ" นี่คือประโยคสุดท้ายที่ใครได้ยินจากเขา',
      backgroundType: 'gradient',
      relatedArticles: ['the-abduction'],
      relatedEvents: ['abduction']
    },
    {
      id: 'the-man',
      title: 'ชายผู้มีหลายชื่อ หลายบทบาท',
      content: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์ หรือ "ซก เฮง" ในหนังสือเดินทางกัมพูชา อดีตผู้ช่วยของ ชัชชาติ สิทธิพันธุ์ เมื่อครั้งเป็นรัฐมนตรีคมนาคม ผู้ที่เคยถ่ายรูปกับ ยิ่งลักษณ์ ชินวัตร แต่กลายเป็นผู้ลี้ภัยหลังรัฐประหาร',
      backgroundType: 'gradient',
      relatedArticles: ['who-is-wanchalearm'],
      relatedEvents: ['work-pheu-thai', 'flee-cambodia']
    },
    {
      id: 'the-network',
      title: 'เครือข่ายความช่วยเหลือที่ซ่อนเร้น',
      content: 'ในกัมพูชา วันเฉลิมไม่ได้เป็นเพียงผู้ลี้ภัยธรรมดา เขาเป็นผู้ประสานงานลับที่ช่วยเหลือผู้ลี้ภัยไทยคนอื่นๆ บทบาทนี้ทำให้เขารู้ข้อมูลมากเกินไป และอาจเป็นสาเหตุที่ทำให้เขาตกเป็นเป้าหมาย',
      backgroundType: 'gradient',
      relatedArticles: ['who-is-wanchalearm']
    },
    {
      id: 'the-pattern',
      title: '93 กรณี 9 ชีวิต 3 ประเทศ',
      content: 'ตั้งแต่ปี 2523 ประเทศไทยมีการบังคับบุคคลให้สูญหาย 93 กรณี โดย 77 กรณียังไม่ได้รับการแก้ไข หลังรัฐประหาร 2557 มีนักเคลื่อนไหว 9 คนหายตัวในต่างประเทศ: ลาว 5 คน (พบศพ 2) เวียดนาม 3 คน กัมพูชา 1 คน คือวันเฉลิม',
      backgroundType: 'gradient',
      relatedArticles: ['transnational-repression'],
      relatedEvents: ['the-pattern']
    },
    {
      id: 'the-river',
      title: 'แม่น้ำโขง: สายน้ำแห่งความตาย',
      content: 'ชัชชาญ บุญเฟื่อง และ ไกรเดช ทนงศึก ถูกพบเป็นศพในแม่น้ำโขง ที่นครพนม ทั้งคู่เคยเป็นผู้ช่วยของ สุรชัย แซ่ด่าน ที่หายตัวพร้อมกัน แม่น้ำที่เคยเป็นเส้นทางการค้า กลายเป็นสุสานของนักเคลื่อนไหว',
      backgroundType: 'gradient',
      relatedArticles: ['transnational-repression']
    },
    {
      id: 'the-void',
      title: 'ความเงียบที่กลืนกินทุกคน',
      content: 'หลังวันเฉลิมหายตัว พวกพ้องรีบทำลายข้อมูลของเขาเพื่อปกป้องผู้ลี้ภัยคนอื่น ผู้ลี้ภัยไทยในกัมพูชาต่างหลบซ่อน ย้ายที่อยู่ ปิดโซเชียลมีเดีย ความหวาดกลัวแพร่กระจายราวกับโรคระบาดที่มองไม่เห็น',
      backgroundType: 'gradient',
      relatedArticles: ['impunity-system']
    },
    {
      id: 'justice',
      title: 'ความยุติธรรมที่สูญหายไปพร้อมกับวันเฉลิม',
      content: 'กุมภาพันธ์ 2567 กัมพูชาประกาศปิดคดี ไทยอ้างไม่มีอำนาจสอบสวนนอกประเทศ สิตานันท์ น้องสาว ยังคงต่อสู้เพียงลำพัง 177 หน้าเอกสารที่ส่งให้ศาล กลายเป็นเพียงกระดาษไร้ค่า คำถามยังคงลอยคว้าง: วันเฉลิมอยู่ที่ไหน?',
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