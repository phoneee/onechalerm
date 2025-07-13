import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

interface Node extends d3.SimulationNodeDatum {
  id: string
  name: string
  group: string
  description?: string
  importance: number
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node
  target: string | Node
  type: string
  strength: number
}

const NetworkView = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove()

    // Data
    const nodes: Node[] = [
      // Core person
      { id: 'wanchalearm', name: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์', group: 'victim', importance: 10 },
      
      // Political connections
      { id: 'chatchart', name: 'ชัชชาติ สิทธิพันธุ์', group: 'politician', importance: 7 },
      { id: 'yingluck', name: 'ยิ่งลักษณ์ ชินวัตร', group: 'politician', importance: 8 },
      { id: 'pheua-thai', name: 'พรรคเพื่อไทย', group: 'party', importance: 8 },
      
      // Cambodia connections
      { id: 'cleang-huot', name: 'Cleang Huot', group: 'cambodia-official', importance: 7 },
      { id: 'sok-heng', name: 'ซก เฮง (ตัวตนปลอม)', group: 'identity', importance: 6 },
      
      // Other disappeared
      { id: 'ittipon', name: 'อิทธิพล', group: 'victim', importance: 5 },
      { id: 'wuthipong', name: 'วุฒิพงษ์', group: 'victim', importance: 5 },
      { id: 'siam', name: 'สยาม', group: 'victim', importance: 5 },
      
      // Family
      { id: 'sitanan', name: 'สิตานันท์ (น้องสาว)', group: 'family', importance: 6 },
      
      // Organizations
      { id: 'un-wgeid', name: 'UN Working Group', group: 'international', importance: 6 },
      { id: 'hrw', name: 'Human Rights Watch', group: 'international', importance: 5 },
      
      // Thai authorities
      { id: 'thai-govt', name: 'รัฐบาลไทย', group: 'authority', importance: 8 },
      { id: 'ncpo', name: 'คสช.', group: 'authority', importance: 8 },
      
      // Refugee network
      { id: 'refugee-network', name: 'เครือข่ายผู้ลี้ภัย', group: 'network', importance: 6 },
    ]

    const links: Link[] = [
      // Political connections
      { source: 'wanchalearm', target: 'chatchart', type: 'worked_for', strength: 8 },
      { source: 'wanchalearm', target: 'pheua-thai', type: 'affiliated', strength: 7 },
      { source: 'chatchart', target: 'pheua-thai', type: 'member', strength: 9 },
      { source: 'yingluck', target: 'pheua-thai', type: 'leader', strength: 10 },
      { source: 'wanchalearm', target: 'yingluck', type: 'connection', strength: 5 },
      
      // Cambodia connections
      { source: 'wanchalearm', target: 'cleang-huot', type: 'suspected_link', strength: 6 },
      { source: 'wanchalearm', target: 'sok-heng', type: 'false_identity', strength: 10 },
      
      // Victim connections
      { source: 'wanchalearm', target: 'refugee-network', type: 'coordinator', strength: 8 },
      { source: 'ittipon', target: 'refugee-network', type: 'member', strength: 5 },
      { source: 'wuthipong', target: 'refugee-network', type: 'member', strength: 5 },
      { source: 'siam', target: 'refugee-network', type: 'member', strength: 5 },
      
      // Family
      { source: 'wanchalearm', target: 'sitanan', type: 'family', strength: 10 },
      { source: 'sitanan', target: 'un-wgeid', type: 'reported_to', strength: 7 },
      
      // International pressure
      { source: 'un-wgeid', target: 'thai-govt', type: 'pressure', strength: 6 },
      { source: 'hrw', target: 'thai-govt', type: 'pressure', strength: 5 },
      
      // Authority connections
      { source: 'thai-govt', target: 'ncpo', type: 'controlled_by', strength: 9 },
      { source: 'ncpo', target: 'wanchalearm', type: 'target', strength: 8 },
    ]

    // Dimensions
    const width = containerRef.current.clientWidth
    const height = 600

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Create zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Create main group
    const g = svg.append('g')

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id((d: any) => d.id)
        .distance(d => 100 - d.strength * 5)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide<Node>().radius(d => d.importance * 5))

    // Color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['victim', 'politician', 'party', 'authority', 'family', 'international', 'network', 'identity', 'cambodia-official'])
      .range(['#ef4444', '#3b82f6', '#8b5cf6', '#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#6b7280', '#f97316'])

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('class', 'link')
      .attr('stroke', '#4b5563')
      .attr('stroke-width', d => Math.sqrt(d.strength))
      .attr('stroke-dasharray', d => d.type === 'suspected_link' ? '5,5' : 'none')

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      )

    // Add circles to nodes
    node.append('circle')
      .attr('r', d => d.importance * 3)
      .attr('fill', d => colorScale(d.group))
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 2)

    // Add labels
    node.append('text')
      .text(d => d.name)
      .attr('x', 0)
      .attr('y', d => d.importance * 3 + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#e5e7eb')
      .style('font-size', '12px')
      .style('pointer-events', 'none')

    // Add tooltip
    const tooltip = d3.select('body').append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0)

    node.on('mouseover', function(event, d) {
      tooltip.transition()
        .duration(200)
        .style('opacity', .9)
      tooltip.html(`<strong>${d.name}</strong><br/>กลุ่ม: ${d.group}`)
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY - 28) + 'px')
    })
    .on('mouseout', function() {
      tooltip.transition()
        .duration(500)
        .style('opacity', 0)
    })

    // Update positions on tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      node
        .attr('transform', d => `translate(${d.x || 0},${d.y || 0})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
      tooltip.remove()
    }
  }, [])

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
            เว็บแห่งอำนาจ: <span className="text-primary">เครือข่ายที่ซ่อนเร้น</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            วิเคราะห์ความเชื่อมโยงระหว่างบุคคล องค์กร และเหตุการณ์ที่นำไปสู่การหายตัว
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center mb-8">
          <div className="join">
            <button className="btn join-item btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
              ซูมเข้า
            </button>
            <button className="btn join-item btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
              ซูมออก
            </button>
            <button className="btn join-item btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              รีเซ็ต
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { color: 'bg-error', label: 'ผู้หายตัว' },
            { color: 'bg-info', label: 'นักการเมือง' },
            { color: 'bg-secondary', label: 'พรรคการเมือง' },
            { color: 'bg-warning', label: 'หน่วยงานรัฐ' },
            { color: 'bg-success', label: 'ครอบครัว' },
            { color: 'bg-info', label: 'องค์กรระหว่างประเทศ' },
          ].map(item => (
            <div key={item.label} className="badge badge-lg gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              {item.label}
            </div>
          ))}
        </div>

        {/* Network Graph */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="card bg-base-200 shadow-xl overflow-hidden"
        >
          <div className="card-body p-0">
            <svg ref={svgRef} className="w-full" />
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <div className="alert shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">วิธีใช้งาน</h3>
              <div className="text-xs">ลากเพื่อเคลื่อนย้ายโหนด • เลื่อนเมาส์เพื่อซูม • คลิกค้างเพื่อดูรายละเอียด</div>
            </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-error">เครือข่ายผู้หายตัว</h3>
                <p className="text-sm opacity-80">
                  วันเฉลิมมีบทบาทสำคัญในการประสานงานช่วยเหลือผู้ลี้ภัยไทยในกัมพูชา 
                  ซึ่งอาจเป็นสาเหตุที่ทำให้เขาตกเป็นเป้าหมาย
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-info">ความสัมพันธ์ทางการเมือง</h3>
                <p className="text-sm opacity-80">
                  อดีตผู้ช่วยของ ชัชชาติ สิทธิพันธุ์ และมีความใกล้ชิดกับแกนนำพรรคเพื่อไทย
                  แสดงให้เห็นเครือข่ายทางการเมืองที่กว้างขวาง
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-warning">แรงกดดันระหว่างประเทศ</h3>
                <p className="text-sm opacity-80">
                  องค์กรระหว่างประเทศอย่าง UN และ Human Rights Watch 
                  ยังคงเรียกร้องให้มีการสอบสวนอย่างจริงจัง
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default NetworkView