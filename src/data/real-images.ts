// Real images data for the Onechalerm project
// These are publicly available images from news sources and social media

export interface RealImage {
  id: string
  url: string
  caption: string
  credit: string
  tags: string[]
  source?: string
  date?: string
}

// Interface for backup URLs
export interface ImageWithBackup extends RealImage {
  backupUrls?: string[]
}

export const realImages: ImageWithBackup[] = [
  // Wanchalearm images
  {
    id: 'wanchalearm-portrait-1',
    url: 'https://f.ptcdn.info/252/069/000/q8nlzt5moOv8QQ3Oq8R-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2020/06/S__7307305.jpg',
      'https://images.workpointnews.com/workpointnews/2020/06/05120532/1591333519_86277_notg4.jpg'
    ],
    caption: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์',
    credit: 'Prachatai/Matichon',
    tags: ['wanchalearm', 'portrait'],
    source: 'https://prachatai.com'
  },
  {
    id: 'wanchalearm-with-yingluck',
    url: 'https://www.matichon.co.th/wp-content/uploads/2020/06/ยิ่งลักษณ์-วันเฉลิม.jpg',
    backupUrls: [
      'https://images.workpointnews.com/workpointnews/2020/06/08104714/1591587983_79147.jpg'
    ],
    caption: 'วันเฉลิมกับยิ่งลักษณ์ ชินวัตร',
    credit: 'Matichon',
    tags: ['wanchalearm', 'yingluck', 'politics'],
    date: '2013-05-15'
  },
  {
    id: 'mekong-gardens-condo',
    url: 'https://www.khaosod.co.th/wpapp/uploads/2020/06/ที่พักวันเฉลิม.jpg',
    backupUrls: [
      'https://images.workpointnews.com/workpointnews/2020/06/08151515/1591605301_60609.jpg',
      'https://static.thairath.co.th/media/dFQROr7oWzulq5FZUHvLJLa5u3g0ZBp49Yq4VNJidOCzrA.jpg'
    ],
    caption: 'คอนโด Mekong Gardens ที่วันเฉลิมพักอาศัยในกรุงพนมเปญ',
    credit: 'Khaosod',
    tags: ['location', 'cambodia', 'abduction'],
    source: 'https://www.khaosod.co.th'
  },
  {
    id: 'sitanun-wanchalearm-sister',
    url: 'https://www.matichon.co.th/wp-content/uploads/2020/12/น้องสาววันเฉลิม.jpg',
    backupUrls: [
      'https://static.thairath.co.th/media/dFQROr7oWzulq5FZUHm3KmnJPsoAQU8r6y5RFg93uCKKBc.jpg',
      'https://f.ptcdn.info/458/071/000/qmktxn6l4TFwGNIN2xA-o.jpg'
    ],
    caption: 'สิตานันท์ สัตย์ศักดิ์สิทธิ์ น้องสาววันเฉลิม',
    credit: 'Matichon',
    tags: ['sitanun', 'family', 'justice'],
    date: '2020-12-10'
  },
  {
    id: 'protest-for-wanchalearm',
    url: 'https://f.ptcdn.info/252/069/000/q8nlzyx6uT1oGq80qqL-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2020/06/S__19439680.jpg',
      'https://static.thairath.co.th/media/dFQROr7oWzulq5FZYSBMdKuNzNC52HkaGCzQMNi7WFTL0S.jpg'
    ],
    caption: 'การชุมนุมเรียกร้องหาวันเฉลิม',
    credit: 'Prachatai',
    tags: ['protest', 'justice', 'solidarity'],
    date: '2020-06-08'
  },
  {
    id: 'cctv-footage-abduction',
    url: 'https://f.ptcdn.info/252/069/000/q8nlzud9bPm0m1hOzMp-o.jpg',
    backupUrls: [
      'https://static.thairath.co.th/media/dFQROr7oWzulq5FZYSBLKLk37WPGTBp0BXsQYPgBBiPqse.jpg',
      'https://www.matichon.co.th/wp-content/uploads/2020/06/กล้องวงจรปิด-วันเฉลิม.jpg'
    ],
    caption: 'ภาพจากกล้องวงจรปิดแสดงการลักพาตัว',
    credit: 'Prachatai',
    tags: ['evidence', 'abduction', 'cctv'],
    date: '2020-06-04'
  },
  
  // Other disappeared activists
  {
    id: 'surachai-portrait',
    url: 'https://f.ptcdn.info/141/063/000/pq7t39q9jRc5H11SOdN-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2018/12/5-2-สุรชัย.jpg',
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4LBok1qxbznoOu2PQUVnHlqQVlDgG6V.jpg'
    ],
    caption: 'สุรชัย แซ่ด่าน',
    credit: 'Prachatai',
    tags: ['surachai', 'portrait', 'disappeared'],
  },
  {
    id: 'mekong-river-bodies',
    url: 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZYSBGci5e7LJJEq5BTjhP7zxXDYZOtlJ6gNhvTZJ8JxYBG1yG3yX.jpg',
    caption: 'แม่น้ำโขงที่นครพนม',
    credit: 'Thairath',
    tags: ['mekong', 'location', 'evidence'],
    date: '2019-01-23'
  },
  {
    id: 'itthipon-dj-sunho',
    url: 'https://f.ptcdn.info/971/050/000/ov1klqm2fQ01OwF9Ysq-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2017/06/ดีเจซุนโฮ.jpg',
      'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4Lt3NdD7sxH4XBKKFqSGtD6kBwGKGG.jpg'
    ],
    caption: 'อิทธิพล สุขแป้น (ดีเจซุนโฮ)',
    credit: 'Prachatai',
    tags: ['ittipon', 'portrait', 'disappeared'],
  },
  {
    id: 'wuthipong-portrait',
    url: 'https://f.ptcdn.info/971/050/000/ov1klt19g10A65o9pAO-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2017/08/โกตี๋.jpg'
    ],
    caption: 'วุฒิพงศ์ ผิวเหลือง (โกตี๋)',
    credit: 'Prachatai',
    tags: ['wuthipong', 'portrait', 'disappeared'],
  },
  {
    id: 'chatcharn-portrait',
    url: 'https://f.ptcdn.info/141/063/000/pq7t3ahj1fI1OTd1iAC-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2018/12/3-2-ชัชชาญ.jpg'
    ],
    caption: 'ชัชชาญ บุญเฟื่อง',
    credit: 'Prachatai', 
    tags: ['chatcharn', 'portrait', 'disappeared'],
  },
  {
    id: 'kraidej-portrait',
    url: 'https://f.ptcdn.info/141/063/000/pq7t3cp8aT9xI8C2OzG-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2018/12/4-2-ไกรเดช.jpg'
    ],
    caption: 'ไกรเดช ทนงศึก',
    credit: 'Prachatai',
    tags: ['kraidej', 'portrait', 'disappeared'],
  },
  {
    id: 'siam-portrait',
    url: 'https://f.ptcdn.info/382/065/000/pxkwz6q8xAx9ZOa10OF-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2019/05/เสียม.jpg'
    ],
    caption: 'เสียม เถียรพัฒน์',
    credit: 'Prachatai',
    tags: ['siam', 'portrait', 'disappeared'],
  },
  {
    id: 'chucheep-portrait',
    url: 'https://f.ptcdn.info/382/065/000/pxkwz98dmJ3lIBUP11V-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2019/05/ชูชีพ.jpg'
    ],
    caption: 'ชูชีพ ชีวะประเสริฐ',
    credit: 'Prachatai',
    tags: ['chucheep', 'portrait', 'disappeared'],
  },
  {
    id: 'kritsana-portrait',
    url: 'https://f.ptcdn.info/382/065/000/pxkwzax9wOOI1GQ2o5A-o.jpg',
    backupUrls: [
      'https://www.matichon.co.th/wp-content/uploads/2019/05/กฤษณะ.jpg'
    ],
    caption: 'กฤษณะ ทัพไทย',
    credit: 'Prachatai',
    tags: ['kritsana', 'portrait', 'disappeared'],
  },
  {
    id: 'transnational-repression-map',
    url: 'https://www.hrw.org/sites/default/files/media_2022/01/202201asia_thailand_transnational_repression.jpg',
    caption: 'แผนที่แสดงการปราบปรามข้ามพรมแดน',
    credit: 'Human Rights Watch',
    tags: ['map', 'evidence', 'transnational'],
    date: '2022-01-28'
  },
  {
    id: 'memorial-disappeared',
    url: 'https://f.ptcdn.info/013/074/000/r15xykt5cWCdBfzJzjn-o.jpg',
    caption: 'อนุสรณ์สถานผู้สูญหาย',
    credit: 'Prachatai',
    tags: ['memorial', 'justice', 'solidarity'],
  },
  
  // Documents and evidence
  {
    id: 'un-petition-document',
    url: 'https://www.ohchr.org/sites/default/files/2021-12/G2121919.pdf',
    caption: 'คำร้องต่อ UN เรื่องการบังคับบุคคลให้สูญหาย',
    credit: 'UN OHCHR',
    tags: ['document', 'un', 'legal'],
    date: '2021-12-20'
  }
]

// Helper function to get image by ID
export const getImageById = (id: string): RealImage | undefined => {
  return realImages.find(img => img.id === id)
}

// Helper function to get images by tag
export const getImagesByTag = (tag: string): RealImage[] => {
  return realImages.filter(img => img.tags.includes(tag))
}

// Helper function to get images by person
export const getImagesByPerson = (personId: string): RealImage[] => {
  return realImages.filter(img => img.tags.includes(personId))
}

// Fallback image for missing images
export const getFallbackImage = (seed: string) => {
  // Use a more contextual fallback
  const fallbacks = {
    portrait: 'https://via.placeholder.com/400x400/1a1a1a/666666?text=No+Image',
    location: 'https://via.placeholder.com/800x600/1a1a1a/666666?text=Location',
    document: 'https://via.placeholder.com/600x800/1a1a1a/666666?text=Document',
    protest: 'https://via.placeholder.com/800x600/1a1a1a/666666?text=Event'
  }
  
  // Determine type based on seed
  if (seed.includes('portrait') || seed.includes('person')) return fallbacks.portrait
  if (seed.includes('location') || seed.includes('map')) return fallbacks.location
  if (seed.includes('document') || seed.includes('legal')) return fallbacks.document
  return fallbacks.protest
}