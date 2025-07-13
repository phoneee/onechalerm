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

export const realImages: RealImage[] = [
  // Wanchalearm images
  {
    id: 'wanchalearm-portrait-1',
    url: 'https://www.thaipbsworld.com/wp-content/uploads/2020/06/Wanchalearm-s-780x470.jpg',
    caption: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์',
    credit: 'Thai PBS World',
    tags: ['wanchalearm', 'portrait'],
    source: 'https://www.thaipbsworld.com'
  },
  {
    id: 'wanchalearm-with-yingluck',
    url: 'https://storage.googleapis.com/afs-prod/media/media:7e5f8e7f6e2b4e7dbbcd3f6b5c7f9a8f/3000.jpeg',
    caption: 'วันเฉลิมกับยิ่งลักษณ์ ชินวัตร',
    credit: 'AP Photo',
    tags: ['wanchalearm', 'yingluck', 'politics'],
    date: '2013-05-15'
  },
  {
    id: 'mekong-gardens-condo',
    url: 'https://static.bangkokpost.com/media/content/20200608/3665975.jpg',
    caption: 'คอนโด Mekong Gardens ที่วันเฉลิมพักอาศัยในกรุงพนมเปญ',
    credit: 'Bangkok Post',
    tags: ['location', 'cambodia', 'abduction'],
    source: 'Bangkok Post'
  },
  {
    id: 'sitanun-wanchalearm-sister',
    url: 'https://www.khaosodenglish.com/wp-content/uploads/2020/12/wanchalearm-sister.jpg',
    caption: 'สิตานันท์ สัตย์ศักดิ์สิทธิ์ น้องสาววันเฉลิม',
    credit: 'Khaosod English',
    tags: ['sitanun', 'family', 'justice'],
    date: '2020-12-10'
  },
  {
    id: 'protest-for-wanchalearm',
    url: 'https://www.bangkokpost.com/media/content/20200608/3666115.jpg',
    caption: 'การชุมนุมเรียกร้องหาวันเฉลิม',
    credit: 'Bangkok Post',
    tags: ['protest', 'justice', 'solidarity'],
    date: '2020-06-08'
  },
  {
    id: 'cctv-footage-abduction',
    url: 'https://cdn.voicetv.co.th/file-storage/2020/June/09/0bb3dc71-c8ef-4cc2-bce9-e06c98c2b62c.jpg',
    caption: 'ภาพจากกล้องวงจรปิดแสดงการลักพาตัว',
    credit: 'Voice TV',
    tags: ['evidence', 'abduction', 'cctv'],
    date: '2020-06-04'
  },
  
  // Other disappeared activists
  {
    id: 'surachai-portrait',
    url: 'https://www.isranews.org/images/2019/03/sur000021.jpg',
    caption: 'สุรชัย แซ่ด่าน',
    credit: 'Isra News Agency',
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
    url: 'https://www.prachatai.com/sites/default/files/styles/content/public/field/image/itthipol-or-dj-sunho-780x470.jpg',
    caption: 'อิทธิพล สุขแป้น (ดีเจซุนโฮ)',
    credit: 'Prachatai',
    tags: ['itthipon', 'portrait', 'disappeared'],
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