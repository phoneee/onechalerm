export interface TimelineEvent {
  id: string
  date: string
  time?: string
  title: string
  description: string
  type: 'political' | 'personal' | 'disappearance' | 'investigation' | 'legal'
  location?: string
  isImportant?: boolean
  relatedPeople?: string[]
  sources?: string[]
}

export interface DisappearanceCase {
  id: string
  name: string
  nameEn: string
  date: string
  location: string
  country: string
  age: number
  background: string
  lastSeen: string
  status: 'missing' | 'found_dead' | 'unknown'
  coordinates: [number, number] // [lng, lat]
}

export const timelineEvents: TimelineEvent[] = [
  // Wanchalearm timeline
  {
    id: 'birth',
    date: '1982-08-11',
    title: 'วันเกิดของวันเฉลิม',
    description: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์ เกิดที่ประเทศไทย',
    type: 'personal',
    relatedPeople: ['วันเฉลิม สัตย์ศักดิ์สิทธิ์']
  },
  {
    id: 'work-pheu-thai',
    date: '2012-01-01',
    title: 'ทำงานกับพรรคเพื่อไทย',
    description: 'วันเฉลิมเคยทำงานเป็นผู้ช่วยให้กับ ชัชชาติ สิทธิพันธุ์ ในช่วงที่ดำรงตำแหน่งรัฐมนตรีว่าการกระทรวงคมนาคม (2555-2557)',
    type: 'personal',
    relatedPeople: ['วันเฉลิม สัตย์ศักดิ์สิทธิ์', 'ชัชชาติ สิทธิพันธุ์', 'ยิ่งลักษณ์ ชินวัตร'],
  },
  {
    id: 'coup-2014',
    date: '2014-05-22',
    title: 'รัฐประหาร 2557',
    description: 'คณะรักษาความสงบแห่งชาติ (คสช.) นำโดย พล.อ.ประยุทธ์ จันทร์โอชา ทำรัฐประหาร',
    type: 'political',
    isImportant: true,
  },
  {
    id: 'flee-cambodia',
    date: '2014-12-01',
    title: 'หลบหนีไปกัมพูชา',
    description: 'วันเฉลิมหลบหนีออกจากประเทศไทยไปยังกัมพูชาหลังรัฐประหาร',
    type: 'personal',
    location: 'กัมพูชา',
    isImportant: true,
  },
  {
    id: 'lese-majeste-charge',
    date: '2015-06-01',
    title: 'ถูกตั้งข้อหาหมิ่นพระบรมเดชานุภาพ',
    description: 'ถูกตั้งข้อหาตามมาตรา 112 ประมวลกฎหมายอาญา',
    type: 'legal',
  },
  {
    id: 'cambodia-visa',
    date: '2017-01-01',
    title: 'ได้รับวีซ่าพำนักในกัมพูชา',
    description: 'ได้รับอนุญาตให้พำนักอาศัยในกัมพูชาอย่างถูกกฎหมาย พร้อมหนังสือเดินทางกัมพูชาในนาม "ซก เฮง" (Sok Heng)',
    type: 'personal',
    location: 'พนมเปญ, กัมพูชา',
  },
  {
    id: 'computer-crime-charge',
    date: '2018-01-01',
    title: 'ถูกตั้งข้อหา พ.ร.บ.คอมพิวเตอร์',
    description: 'ถูกตั้งข้อหาเพิ่มเติมตามพระราชบัญญัติว่าด้วยการกระทำความผิดเกี่ยวกับคอมพิวเตอร์',
    type: 'legal',
  },
  {
    id: 'last-video',
    date: '2020-06-03',
    title: 'โพสต์วิดีโอครั้งสุดท้าย',
    description: 'โพสต์วิดีโอวิพากษ์วิจารณ์ พล.อ.ประยุทธ์ จันทร์โอชา บน Facebook',
    type: 'personal',
    isImportant: true,
  },
  {
    id: 'abduction',
    date: '2020-06-04',
    time: '17:54',
    title: 'ถูกอุ้มหาย',
    description: 'วันเฉลิมถูกอุ้มขึ้นรถ Toyota Highlander สีดำ ทะเบียน 2X2307 หน้าคอนโด Mekong Gardens',
    type: 'disappearance',
    location: 'Mekong Gardens, เขตจรอยจังวา, พนมเปญ',
    isImportant: true,
  },
  {
    id: 'cambodia-investigation',
    date: '2020-09-01',
    title: 'กัมพูชาเปิดการสอบสวน',
    description: 'ตำรวจกัมพูชาเปิดการสอบสวนคดีอาญากรณีการหายตัวของวันเฉลิม',
    type: 'investigation',
    location: 'กัมพูชา',
  },
  {
    id: 'sister-testimony',
    date: '2020-12-01',
    title: 'น้องสาวให้การต่อศาล',
    description: 'สิตานันท์ สัตย์ศักดิ์สิทธิ์ น้องสาวของวันเฉลิม ให้การต่อศาลกัมพูชาพร้อมส่งเอกสารหลักฐาน 177 หน้า',
    type: 'investigation',
    relatedPeople: ['สิตานันท์ สัตย์ศักดิ์สิทธิ์'],
  },
  {
    id: 'case-closed',
    date: '2024-02-01',
    title: 'กัมพูชาปิดคดี',
    description: 'ทางการกัมพูชาประกาศปิดคดีโดยไม่มีความคืบหน้าในการสอบสวน',
    type: 'investigation',
    location: 'กัมพูชา',
    isImportant: true,
  },
  
  // Other disappeared persons timeline
  {
    id: 'ittipon-disappear',
    date: '2016-06-22',
    title: 'อิทธิพล สุขแป้น (ดีเจซุนโฮ) หายตัว',
    description: 'นักจัดรายการวิทยุใต้ดิน แกนนำเสื้อแดง หายตัวจากเวียงจันทน์',
    type: 'disappearance',
    location: 'เวียงจันทน์, ลาว',
    isImportant: true,
    relatedPeople: ['อิทธิพล สุขแป้น']
  },
  {
    id: 'wuthipong-disappear',
    date: '2017-07-29',
    title: 'วุฒิพงศ์ กชธรรมคุณ (โกตี๋) หายตัว',
    description: 'แกนนำเสื้อแดง ถูกตั้งข้อหา ม.112 หายตัวจากเวียงจันทน์',
    type: 'disappearance',
    location: 'เวียงจันทน์, ลาว',
    isImportant: true,
    relatedPeople: ['วุฒิพงศ์ กชธรรมคุณ']
  },
  {
    id: 'surachai-group-disappear',
    date: '2018-12-12',
    title: 'สุรชัยและผู้ช่วย 2 คนหายตัว',
    description: 'สุรชัย ด่านวัฒนานุสรณ์ พร้อมชัชชาญ บุปผาวัลย์ และไกรเดช ลือเลิศ หายตัวพร้อมกัน',
    type: 'disappearance',
    location: 'ลาว',
    isImportant: true,
    relatedPeople: ['สุรชัย ด่านวัฒนานุสรณ์', 'ชัชชาญ บุปผาวัลย์', 'ไกรเดช ลือเลิศ']
  },
  {
    id: 'bodies-found-mekong',
    date: '2019-12-26',
    title: 'พบศพ 2 ศพในแม่น้ำโขง',
    description: 'พบศพชัชชาญและไกรเดช ผู้ช่วยของสุรชัย ในแม่น้ำโขงที่นครพนม ถูกทรมานและอัดคอนกรีตในท้อง',
    type: 'investigation',
    location: 'แม่น้ำโขง, นครพนม',
    isImportant: true,
    relatedPeople: ['ชัชชาญ บุปผาวัลย์', 'ไกรเดช ลือเลิศ']
  },
  {
    id: 'vietnam-trio-disappear',
    date: '2019-05-08',
    title: 'สามนักเคลื่อนไหวหายในเวียดนาม',
    description: 'สยาม ธีรวุฒิ, ชูชีพ ชีวะสุทธิ์ และกฤษณะ ทัพไทย หายตัวพร้อมกันที่โฮจิมินห์ซิตี',
    type: 'disappearance',
    location: 'โฮจิมินห์ซิตี, เวียดนาม',
    isImportant: true,
    relatedPeople: ['สยาม ธีรวุฒิ', 'ชูชีพ ชีวะสุทธิ์', 'กฤษณะ ทัพไทย']
  },
  {
    id: 'thai-denial',
    date: '2020-07-01',
    title: 'DSI ปฏิเสธรับคดีวันเฉลิม',
    description: 'กรมสอบสวนคดีพิเศษปฏิเสธรับคดีการหายตัวของวันเฉลิมเป็นคดีพิเศษ',
    type: 'investigation',
    location: 'ไทย',
    relatedPeople: ['วันเฉลิม สัตย์ศักดิ์สิทธิ์']
  }
]

export const disappearanceCases: DisappearanceCase[] = [
  {
    id: 'wanchalearm',
    name: 'วันเฉลิม สัตย์ศักดิ์สิทธิ์',
    nameEn: 'Wanchalearm Satsaksit',
    date: '2020-06-04',
    location: 'พนมเปญ',
    country: 'กัมพูชา',
    age: 38,
    background: 'นักเคลื่อนไหวการเมือง อดีตผู้ช่วยนักการเมืองพรรคเพื่อไทย ผู้ประสานงานผู้ลี้ภัยไทยในกัมพูชา',
    lastSeen: 'หน้าคอนโด Mekong Gardens ขณะเดินไปซื้อของ คุยโทรศัพท์กับพี่สาว',
    status: 'missing',
    coordinates: [104.9282, 11.5564], // Phnom Penh
  },
  {
    id: 'ittipon',
    name: 'อิทธิพล สุขแป้น (ดีเจซุนโฮ)',
    nameEn: 'Ittipon Sukpaen (DJ Sunho)',
    date: '2016-06-22',
    location: 'เวียงจันทน์',
    country: 'ลาว',
    age: 35,
    background: 'นักจัดรายการวิทยุใต้ดิน แกนนำเสื้อแดง',
    lastSeen: 'เวียงจันทน์ ก่อนหายตัวไปอย่างไร้ร่องรอย',
    status: 'missing',
    coordinates: [102.6000, 17.9667], // Vientiane
  },
  {
    id: 'wuthipong',
    name: 'วุฒิพงศ์ กชธรรมคุณ (โกตี๋)',
    nameEn: 'Wuthipong Kachathamakul (Ko Tee)',
    date: '2017-07-29',
    location: 'เวียงจันทน์',
    country: 'ลาว',
    age: 45,
    background: 'แกนนำเสื้อแดง ถูกตั้งข้อหา ม.112',
    lastSeen: 'เวียงจันทน์ หายตัวไปอย่างไร้ร่องรอย',
    status: 'missing',
    coordinates: [102.6000, 17.9667], // Vientiane
  },
  {
    id: 'chatcharn',
    name: 'ชัชชาญ บุปผาวัลย์ (สหายภูชนะ)',
    nameEn: 'Chatchan Bubphawan (Phuchana)',
    date: '2018-12-12',
    location: 'นครพนม',
    country: 'ลาว',
    age: 56,
    background: 'ผู้ช่วยของสุรชัย ด่านวัฒนานุสรณ์ ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปพร้อมกับสุรชัยและกาสะลอง พบศพในแม่น้ำโขงสภาพถูกทรมาน',
    status: 'found_dead',
    coordinates: [104.7833, 17.4167], // Nakhon Phanom
  },
  {
    id: 'kraidej',
    name: 'ไกรเดช ลือเลิศ (สหายกาสะลอง)',
    nameEn: 'Kraidej Luelert (Kasalong)',
    date: '2018-12-12',
    location: 'นครพนม',
    country: 'ลาว',
    age: 46,
    background: 'ผู้ช่วยของสุรชัย ด่านวัฒนานุสรณ์ ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปพร้อมกับสุรชัยและภูชนะ พบศพในแม่น้ำโขงสภาพถูกทรมาน',
    status: 'found_dead',
    coordinates: [104.7833, 17.4167], // Nakhon Phanom
  },
  {
    id: 'surachai',
    name: 'สุรชัย ด่านวัฒนานุสรณ์ (สุรชัย แซ่ด่าน)',
    nameEn: 'Surachai Danwattananusorn',
    date: '2018-12-12',
    location: 'ลาว',
    country: 'ลาว',
    age: 78,
    background: 'นักเคลื่อนไหวอาวุโส ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปพร้อมผู้ช่วย 2 คน ยังไม่พบร่องรอย',
    status: 'missing',
    coordinates: [102.6000, 17.9667], // Vientiane
  },
  {
    id: 'siam',
    name: 'สยาม ธีรวุฒิ',
    nameEn: 'Siam Theerawut',
    date: '2019-05-08',
    location: 'โฮจิมินห์',
    country: 'เวียดนาม',
    age: 47,
    background: 'นักกิจกรรม ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปที่โฮจิมินห์ซิตี พร้อมกับเพื่อนอีก 2 คน',
    status: 'missing',
    coordinates: [106.6297, 10.8231], // Ho Chi Minh City
  },
  {
    id: 'chucheep',
    name: 'ชูชีพ ชีวะสุทธิ์ (ลุงสนามหลวง)',
    nameEn: 'Chucheep Chivasut (Uncle Sanam Luang)',
    date: '2019-05-08',
    location: 'โฮจิมินห์',
    country: 'เวียดนาม',
    age: 55,
    background: 'นักจัดรายการวิทยุใต้ดิน ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปที่โฮจิมินห์ซิตี พร้อมกับเพื่อนอีก 2 คน',
    status: 'missing',
    coordinates: [106.6297, 10.8231], // Ho Chi Minh City
  },
  {
    id: 'kritsana',
    name: 'กฤษณะ ทัพไทย',
    nameEn: 'Kritsana Thapthai',
    date: '2019-05-08',
    location: 'โฮจิมินห์',
    country: 'เวียดนาม',
    age: 58,
    background: 'ผู้ติดตามชูชีพ ถูกตั้งข้อหา ม.112',
    lastSeen: 'หายตัวไปที่โฮจิมินห์ซิตี พร้อมกับสยามและชูชีพ',
    status: 'missing',
    coordinates: [106.6297, 10.8231], // Ho Chi Minh City
  },
]