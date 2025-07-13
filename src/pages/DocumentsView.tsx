import { motion } from 'framer-motion'
import { useState } from 'react'

interface Document {
  id: string
  title: string
  organization: string
  date: string
  type: 'report' | 'statement' | 'petition' | 'news' | 'legal'
  url: string
  description: string
  tags: string[]
}

const documents: Document[] = [
  // UN Documents
  {
    id: 'un-report-2020',
    title: 'Thailand must stop enforced disappearances',
    organization: 'UN Office of the High Commissioner for Human Rights',
    date: '2020-06-12',
    type: 'statement',
    url: 'https://www.ohchr.org/en/press-releases/2020/06/thailand-must-stop-enforced-disappearances-un-experts',
    description: 'คำแถลงจากผู้เชี่ยวชาญ UN เรียกร้องให้ไทยหยุดการบังคับบุคคลให้สูญหาย',
    tags: ['UN', 'แถลงการณ์', 'สิทธิมนุษยชน']
  },
  {
    id: 'un-working-group-2024',
    title: 'Report of Working Group on Enforced Disappearances',
    organization: 'UN Working Group on Enforced or Involuntary Disappearances',
    date: '2024-03-15',
    type: 'report',
    url: 'https://www.ohchr.org/en/special-procedures/wg-disappearances',
    description: 'รายงานระบุไทยมีกรณีบังคับบุคคลให้สูญหาย 93 ราย ยังไม่ได้รับการแก้ไข 77 ราย',
    tags: ['UN', 'รายงาน', 'สถิติ']
  },
  
  // NGO Reports
  {
    id: 'hrw-transnational',
    title: 'Transnational Repression: Thailand',
    organization: 'Human Rights Watch',
    date: '2022-01-28',
    type: 'report',
    url: 'https://www.hrw.org/news/2024/06/11/thai-rights-commission-links-officials-disappearance-9-exiles',
    description: 'รายงานการปราบปรามข้ามพรมแดนและการหายตัวของนักเคลื่อนไหว 9 คน',
    tags: ['HRW', 'รายงาน', 'การปราบปรามข้ามพรมแดน']
  },
  {
    id: 'amnesty-wanchalearm',
    title: 'Thailand: Abducted activist Wanchalearm Satsaksit',
    organization: 'Amnesty International',
    date: '2020-06-08',
    type: 'statement',
    url: 'https://www.amnesty.org/en/latest/news/2020/06/thailand-abducted-activist-wanchalearm/',
    description: 'แถลงการณ์เรียกร้องให้สอบสวนการลักพาตัววันเฉลิม',
    tags: ['Amnesty', 'แถลงการณ์', 'วันเฉลิม']
  },
  
  // Thai Media Reports
  {
    id: 'prachatai-investigation',
    title: 'ย้อนรอยบทบาทวันเฉลิมจากแฟ้มมูลนิธิ 14 ตุลาฯ',
    organization: 'ประชาไท',
    date: '2022-08-04',
    type: 'news',
    url: 'https://prachatai.com/journal/2022/08/100082',
    description: 'รายงานสืบสวนเจาะลึกประวัติและบทบาทของวันเฉลิม',
    tags: ['ประชาไท', 'สืบสวน', 'วันเฉลิม']
  },
  {
    id: 'bbc-thai-9-missing',
    title: 'นักเคลื่อนไหวไทย 9 คนหายตัวในต่างแดน',
    organization: 'BBC Thai',
    date: '2020-06-05',
    type: 'news',
    url: 'https://www.bbc.com/thai/thailand-52933773',
    description: 'สรุปข้อมูลนักเคลื่อนไหว 9 คนที่หายตัวในประเทศเพื่อนบ้าน',
    tags: ['BBC', 'ข่าว', '9 คน']
  },
  
  // Legal Documents
  {
    id: 'sitanan-petition',
    title: 'คำร้องของสิตานันท์ต่อศาลกัมพูชา',
    organization: 'ครอบครัววันเฉลิม',
    date: '2020-12-10',
    type: 'petition',
    url: '#',
    description: 'เอกสาร 177 หน้าที่สิตานันท์ยื่นต่อศาลกัมพูชาเพื่อเรียกร้องการสอบสวน',
    tags: ['เอกสารกฎหมาย', 'คำร้อง', 'สิตานันท์']
  },
  {
    id: 'cambodia-case-closure',
    title: 'ประกาศปิดคดีวันเฉลิม',
    organization: 'ทางการกัมพูชา',
    date: '2024-02-15',
    type: 'legal',
    url: '#',
    description: 'ทางการกัมพูชาประกาศปิดคดี อ้างไม่พบหลักฐาน',
    tags: ['เอกสารกฎหมาย', 'ปิดคดี', 'กัมพูชา']
  },
  
  // Academic/Research
  {
    id: 'nhrct-report',
    title: 'รายงานคณะกรรมการสิทธิมนุษยชนแห่งชาติ',
    organization: 'คณะกรรมการสิทธิมนุษยชนแห่งชาติ',
    date: '2024-06-11',
    type: 'report',
    url: '#',
    description: 'รายงานเชื่อมโยงเจ้าหน้าที่ไทยกับการหายตัวของนักเคลื่อนไหว',
    tags: ['กสม.', 'รายงาน', 'เจ้าหน้าที่รัฐ']
  }
]

const DocumentsView = () => {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const types = [
    { id: 'all', label: 'ทั้งหมด', icon: '📚' },
    { id: 'report', label: 'รายงาน', icon: '📊' },
    { id: 'statement', label: 'แถลงการณ์', icon: '📢' },
    { id: 'news', label: 'ข่าว', icon: '📰' },
    { id: 'legal', label: 'เอกสารกฎหมาย', icon: '⚖️' },
    { id: 'petition', label: 'คำร้อง', icon: '📝' }
  ]

  const filteredDocs = selectedType === 'all' 
    ? documents 
    : documents.filter(doc => doc.type === selectedType)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'report': return 'badge-primary'
      case 'statement': return 'badge-secondary'
      case 'news': return 'badge-info'
      case 'legal': return 'badge-warning'
      case 'petition': return 'badge-error'
      default: return 'badge-ghost'
    }
  }

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
            เอกสารและ<span className="text-primary">หลักฐาน</span>
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            รวมรายงาน เอกสาร และแหล่งข้อมูลเกี่ยวกับการบังคับบุคคลให้สูญหาย
          </p>
        </motion.div>

        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {types.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`btn ${selectedType === type.id ? 'btn-primary' : 'btn-ghost'}`}
            >
              <span className="text-lg">{type.icon}</span>
              {type.label}
              {type.id !== 'all' && (
                <span className="badge badge-sm ml-2">
                  {documents.filter(d => d.type === type.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedDoc(doc)}
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <div className={`badge ${getTypeColor(doc.type)}`}>
                    {types.find(t => t.id === doc.type)?.label}
                  </div>
                  <time className="text-sm opacity-60">
                    {new Date(doc.date).toLocaleDateString('th-TH', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
                
                <h3 className="card-title text-lg">
                  {doc.title}
                </h3>
                
                <p className="text-sm opacity-80 mb-2">
                  {doc.organization}
                </p>
                
                <p className="text-sm">
                  {doc.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mt-4">
                  {doc.tags.map(tag => (
                    <span key={tag} className="badge badge-sm badge-ghost">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Document Modal */}
        {selectedDoc && (
          <div className="modal modal-open">
            <div className="modal-box max-w-3xl">
              <h3 className="font-bold text-lg mb-4">{selectedDoc.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm opacity-60">องค์กร</p>
                  <p className="font-medium">{selectedDoc.organization}</p>
                </div>
                <div>
                  <p className="text-sm opacity-60">วันที่</p>
                  <p className="font-medium">
                    {new Date(selectedDoc.date).toLocaleDateString('th-TH', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
              
              <div className="divider"></div>
              
              <p className="mb-4">{selectedDoc.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {selectedDoc.tags.map(tag => (
                  <span key={tag} className="badge badge-ghost">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="modal-action">
                {selectedDoc.url !== '#' && (
                  <a
                    href={selectedDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    ดูเอกสารต้นฉบับ
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <button className="btn" onClick={() => setSelectedDoc(null)}>
                  ปิด
                </button>
              </div>
            </div>
            <div className="modal-backdrop" onClick={() => setSelectedDoc(null)}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentsView