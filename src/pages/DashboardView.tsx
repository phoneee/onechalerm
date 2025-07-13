import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as d3 from 'd3'
import { disappearanceCases, timelineEvents } from '@/data/timeline-data'
import { articles } from '@/data/articles'
import ArticleCard from '@/components/ArticleCard'
import ArticleView from '@/components/ArticleView'
import ShareCard from '@/components/common/ShareCard'
import { getImagesByTag, realImages } from '@/data/real-images'
import type { NavigationState } from '@/App'

interface DashboardViewProps {
  navigationState?: NavigationState
}

const DashboardView = ({ navigationState }: DashboardViewProps) => {
  const barChartRef = useRef<SVGSVGElement>(null)
  const pieChartRef = useRef<SVGSVGElement>(null)
  const timelineChartRef = useRef<SVGSVGElement>(null)
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState<'overview' | 'articles' | 'media' | 'facts'>('overview')
  
  // Handle navigation from search
  useEffect(() => {
    if (navigationState?.targetId && navigationState.targetType === 'article') {
      setSelectedTab('articles')
      setSelectedArticle(navigationState.targetId)
    }
  }, [navigationState])

  useEffect(() => {
    // Clear previous charts
    d3.select(barChartRef.current).selectAll('*').remove()
    d3.select(pieChartRef.current).selectAll('*').remove()
    d3.select(timelineChartRef.current).selectAll('*').remove()

    // 1. Bar Chart - Cases by Country
    const countryData = d3.rollup(
      disappearanceCases,
      v => v.length,
      d => d.country
    )
    
    const barData = Array.from(countryData, ([country, count]) => ({ country, count }))
    
    const barMargin = { top: 20, right: 20, bottom: 40, left: 60 }
    const barWidth = 400 - barMargin.left - barMargin.right
    const barHeight = 300 - barMargin.top - barMargin.bottom

    const barSvg = d3.select(barChartRef.current)
      .attr('width', barWidth + barMargin.left + barMargin.right)
      .attr('height', barHeight + barMargin.top + barMargin.bottom)

    const barG = barSvg.append('g')
      .attr('transform', `translate(${barMargin.left},${barMargin.top})`)

    const x = d3.scaleBand()
      .range([0, barWidth])
      .domain(barData.map(d => d.country))
      .padding(0.1)

    const y = d3.scaleLinear()
      .range([barHeight, 0])
      .domain([0, d3.max(barData, d => d.count) || 0])

    barG.append('g')
      .attr('transform', `translate(0,${barHeight})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', '#9ca3af')

    barG.append('g')
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', '#9ca3af')

    barG.selectAll('.bar')
      .data(barData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.country) || 0)
      .attr('width', x.bandwidth())
      .attr('y', barHeight)
      .attr('height', 0)
      .attr('fill', '#ef4444')
      .transition()
      .duration(800)
      .attr('y', d => y(d.count))
      .attr('height', d => barHeight - y(d.count))

    // 2. Pie Chart - Status Distribution
    const statusData = d3.rollup(
      disappearanceCases,
      v => v.length,
      d => d.status
    )
    
    const pieData = Array.from(statusData, ([status, count]) => ({ status, count }))
    
    const pieWidth = 300
    const pieHeight = 300
    const radius = Math.min(pieWidth, pieHeight) / 2 - 20

    const pieSvg = d3.select(pieChartRef.current)
      .attr('width', pieWidth)
      .attr('height', pieHeight)

    const pieG = pieSvg.append('g')
      .attr('transform', `translate(${pieWidth / 2},${pieHeight / 2})`)

    const pie = d3.pie<{ status: string; count: number }>()
      .value(d => d.count)

    const arc = d3.arc<d3.PieArcDatum<{ status: string; count: number }>>()
      .innerRadius(0)
      .outerRadius(radius)

    const color = d3.scaleOrdinal()
      .domain(['missing', 'found_dead'])
      .range(['#f59e0b', '#ef4444'])

    const arcs = pieG.selectAll('.arc')
      .data(pie(pieData))
      .enter().append('g')
      .attr('class', 'arc')

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.status) as string)
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 2)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .style('opacity', 1)

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text(d => d.data.count)

    // 3. Timeline Chart - Cases by Year
    const yearData = d3.rollup(
      disappearanceCases,
      v => v.length,
      d => new Date(d.date).getFullYear()
    )
    
    const timelineData = Array.from(yearData, ([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year)

    const timelineMargin = { top: 20, right: 20, bottom: 40, left: 60 }
    const timelineWidth = 600 - timelineMargin.left - timelineMargin.right
    const timelineHeight = 200 - timelineMargin.top - timelineMargin.bottom

    const timelineSvg = d3.select(timelineChartRef.current)
      .attr('width', timelineWidth + timelineMargin.left + timelineMargin.right)
      .attr('height', timelineHeight + timelineMargin.top + timelineMargin.bottom)

    const timelineG = timelineSvg.append('g')
      .attr('transform', `translate(${timelineMargin.left},${timelineMargin.top})`)

    const xTime = d3.scaleLinear()
      .domain(d3.extent(timelineData, d => d.year) as [number, number])
      .range([0, timelineWidth])

    const yTime = d3.scaleLinear()
      .domain([0, d3.max(timelineData, d => d.count) || 0])
      .range([timelineHeight, 0])

    const line = d3.line<{ year: number; count: number }>()
      .x(d => xTime(d.year))
      .y(d => yTime(d.count))
      .curve(d3.curveMonotoneX)

    timelineG.append('g')
      .attr('transform', `translate(0,${timelineHeight})`)
      .call(d3.axisBottom(xTime).tickFormat(d3.format('d')))
      .selectAll('text')
      .style('fill', '#9ca3af')

    timelineG.append('g')
      .call(d3.axisLeft(yTime))
      .selectAll('text')
      .style('fill', '#9ca3af')

    const path = timelineG.append('path')
      .datum(timelineData)
      .attr('fill', 'none')
      .attr('stroke', '#ef4444')
      .attr('stroke-width', 2)
      .attr('d', line)

    const totalLength = path.node()?.getTotalLength() || 0
    
    path
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .attr('stroke-dashoffset', 0)

    timelineG.selectAll('.dot')
      .data(timelineData)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', d => xTime(d.year))
      .attr('cy', d => yTime(d.count))
      .attr('r', 0)
      .attr('fill', '#ef4444')
      .transition()
      .duration(800)
      .delay((_d, i) => i * 100)
      .attr('r', 4)

  }, [])

  const stats = [
    { label: 'การบังคับให้สูญหายทั้งหมด', value: '93', subtitle: 'ตั้งแต่ปี 2523', icon: '📊' },
    { label: 'ยังไม่ได้รับการแก้ไข', value: '77', subtitle: '82.8%', icon: '❓' },
    { label: 'หลังรัฐประหาร 2557', value: '9', subtitle: 'นักเคลื่อนไหวการเมือง', icon: '🎯' },
    { label: 'ประเทศที่เกิดเหตุ', value: '3', subtitle: 'ลาว, เวียดนาม, กัมพูชา', icon: '🌏' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ภาพรวม: <span className="text-primary">ความยุติธรรมที่หายไป</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            วิเคราะห์ข้อมูลการบังคับบุคคลให้สูญหายในประเทศไทย และกรณีนักเคลื่อนไหวหลังรัฐประหาร 2557
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="stat-value text-primary">{stat.value}</div>
                  <div className="stat-title">{stat.label}</div>
                  <div className="stat-desc">{stat.subtitle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">จำนวนผู้หายตัวแยกตามประเทศ</h3>
                <div className="flex justify-center">
                  <svg ref={barChartRef}></svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title mb-4">สถานะผู้หายตัว</h3>
                <div className="flex justify-center">
                  <svg ref={pieChartRef}></svg>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="badge badge-warning gap-2">
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    สูญหาย
                  </div>
                  <div className="badge badge-error gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    พบศพ
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h3 className="card-title mb-4">การหายตัวแยกตามปี (2016-2020)</h3>
              <div className="overflow-x-auto flex justify-center">
                <svg ref={timelineChartRef}></svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Latest Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-display font-bold mb-8">บทความและการวิเคราะห์</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <ArticleCard
                  article={article}
                  onClick={() => setSelectedArticle(article.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 shadow-xl">
            <div className="card-body">
              <h3 className="text-2xl font-display font-bold mb-6">ร่วมเรียกร้องความยุติธรรม</h3>
              <p className="mb-8 max-w-2xl mx-auto">
                เสียงของคุณมีความหมาย ร่วมเป็นส่วนหนึ่งในการเรียกร้องความยุติธรรมให้กับผู้สูญหายและครอบครัว
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  ลงชื่อเรียกร้อง
                </button>
                <button className="btn btn-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 010-5.368m0 5.368a9.003 9.003 0 01-9.032-4.026m0 0A9.003 9.003 0 018.684 6.316m0 0a3 3 0 110 2.684m0-2.684a9.001 9.001 0 019.032-4.026m0 0a9.003 9.003 0 00-9.032 4.026" />
                  </svg>
                  แชร์เรื่องราว
                </button>
                <button className="btn btn-outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ดูรายละเอียดเพิ่มเติม
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Article Modal */}
      {selectedArticle && (() => {
        const article = articles.find(a => a.id === selectedArticle)
        if (!article) return null
        return (
          <ArticleView
            article={article}
            onClose={() => setSelectedArticle(null)}
          />
        )
      })()}
    </div>
  )
}

export default DashboardView