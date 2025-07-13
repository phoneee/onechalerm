// Cross-reference system to link timeline events, locations, and articles

export interface CrossReference {
  timelineEventId?: string
  disappearanceCaseId?: string
  articleIds?: string[]
  coordinates?: [number, number]
  locationName?: string
  date: string
}

export const crossReferences: CrossReference[] = [
  // วันเฉลิมถูกอุ้ม
  {
    timelineEventId: 'abduction',
    disappearanceCaseId: 'wanchalearm',
    articleIds: ['the-abduction', 'who-is-wanchalearm', 'prachatai-investigation'],
    coordinates: [104.9282, 11.5564],
    locationName: 'พนมเปญ, กัมพูชา',
    date: '2020-06-04'
  },
  // การทำงานกับพรรคเพื่อไทย
  {
    timelineEventId: 'work-pheu-thai',
    articleIds: ['who-is-wanchalearm'],
    locationName: 'กรุงเทพฯ, ไทย',
    date: '2012-01-01'
  },
  // หลบหนีไปกัมพูชา
  {
    timelineEventId: 'flee-cambodia',
    articleIds: ['who-is-wanchalearm'],
    coordinates: [104.9282, 11.5564],
    locationName: 'กัมพูชา',
    date: '2014-12-01'
  },
  // น้องสาวให้การ
  {
    timelineEventId: 'sister-testimony',
    articleIds: ['sister-fight'],
    coordinates: [104.9282, 11.5564],
    locationName: 'ศาลพนมเปญ, กัมพูชา',
    date: '2020-12-01'
  },
  // อิทธิพลหายตัว
  {
    disappearanceCaseId: 'ittipon',
    articleIds: ['transnational-repression'],
    coordinates: [102.6000, 17.9667],
    locationName: 'เวียงจันทน์, ลาว',
    date: '2016-06-22'
  },
  // สุรชัยและผู้ช่วยหายตัว
  {
    disappearanceCaseId: 'surachai',
    articleIds: ['transnational-repression'],
    coordinates: [102.6000, 17.9667],
    locationName: 'ลาว',
    date: '2018-12-12'
  },
  // ชัชชาญพบศพ
  {
    disappearanceCaseId: 'chatcharn',
    articleIds: ['transnational-repression'],
    coordinates: [104.7833, 17.4167],
    locationName: 'แม่น้ำโขง, นครพนม',
    date: '2018-12-12'
  },
  // ไกรเดชพบศพ
  {
    disappearanceCaseId: 'kraidej',
    articleIds: ['transnational-repression'],
    coordinates: [104.7833, 17.4167],
    locationName: 'แม่น้ำโขง, นครพนม',
    date: '2018-12-12'
  },
  // 3 คนหายในเวียดนาม
  {
    disappearanceCaseId: 'siam',
    articleIds: ['transnational-repression'],
    coordinates: [106.6297, 10.8231],
    locationName: 'โฮจิมินห์, เวียดนาม',
    date: '2019-05-08'
  },
  {
    disappearanceCaseId: 'chucheep',
    articleIds: ['transnational-repression'],
    coordinates: [106.6297, 10.8231],
    locationName: 'โฮจิมินห์, เวียดนาม',
    date: '2019-05-08'
  },
  {
    disappearanceCaseId: 'kritsana',
    articleIds: ['transnational-repression'],
    coordinates: [106.6297, 10.8231],
    locationName: 'โฮจิมินห์, เวียดนาม',
    date: '2019-05-08'
  },
  // DSI ปฏิเสธคดี
  {
    timelineEventId: 'thai-denial',
    articleIds: ['impunity-system'],
    locationName: 'กรุงเทพฯ, ไทย',
    date: '2020-07-01'
  },
  // กัมพูชาปิดคดี
  {
    timelineEventId: 'case-closed',
    articleIds: ['impunity-system'],
    locationName: 'กัมพูชา',
    date: '2024-02-01'
  },
  
  // Other disappearances
  // อิทธิพลหายตัว
  {
    timelineEventId: 'ittipon-disappear',
    disappearanceCaseId: 'ittipon',
    articleIds: ['transnational-repression', 'itthipon-dj-sunho'],
    coordinates: [102.6000, 17.9667],
    locationName: 'เวียงจันทน์, ลาว',
    date: '2016-06-22'
  },
  // วุฒิพงศ์หายตัว
  {
    timelineEventId: 'wuthipong-disappear',
    disappearanceCaseId: 'wuthipong',
    articleIds: ['transnational-repression', 'wuthipong-ko-tee'],
    coordinates: [102.6000, 17.9667],
    locationName: 'เวียงจันทน์, ลาว',
    date: '2017-07-29'
  },
  // สุรชัยและผู้ช่วยหายตัว
  {
    timelineEventId: 'surachai-group-disappear',
    disappearanceCaseId: 'surachai',
    articleIds: ['transnational-repression', 'surachai-dan'],
    coordinates: [102.6000, 17.9667],
    locationName: 'ลาว',
    date: '2018-12-12'
  },
  // พบศพในแม่น้ำโขง
  {
    timelineEventId: 'bodies-found-mekong',
    articleIds: ['transnational-repression', 'surachai-dan'],
    coordinates: [104.7833, 17.4167],
    locationName: 'แม่น้ำโขง, นครพนม',
    date: '2019-12-26'
  },
  // สามคนหายในเวียดนาม
  {
    timelineEventId: 'vietnam-trio-disappear',
    disappearanceCaseId: 'siam',
    articleIds: ['transnational-repression', 'siam-chucheep-kritsana'],
    coordinates: [106.6297, 10.8231],
    locationName: 'โฮจิมินห์ซิตี, เวียดนาม',
    date: '2019-05-08'
  },
  // DSI ปฏิเสธคดีวันเฉลิม
  {
    timelineEventId: 'thai-denial',
    disappearanceCaseId: 'wanchalearm',
    articleIds: ['impunity-system', 'sister-fight'],
    locationName: 'ไทย',
    date: '2020-07-01'
  }
]

// Helper functions
export const getReferencesByTimelineEvent = (eventId: string): CrossReference[] => {
  return crossReferences.filter(ref => ref.timelineEventId === eventId)
}

export const getReferencesByDisappearanceCase = (caseId: string): CrossReference[] => {
  return crossReferences.filter(ref => ref.disappearanceCaseId === caseId)
}

export const getReferencesByArticle = (articleId: string): CrossReference[] => {
  return crossReferences.filter(ref => ref.articleIds?.includes(articleId))
}

export const getReferencesByCoordinates = (coords: [number, number], radius = 0.1): CrossReference[] => {
  return crossReferences.filter(ref => {
    if (!ref.coordinates) return false
    const [lng1, lat1] = ref.coordinates
    const [lng2, lat2] = coords
    const distance = Math.sqrt(Math.pow(lng1 - lng2, 2) + Math.pow(lat1 - lat2, 2))
    return distance <= radius
  })
}

export const getReferencesByDateRange = (startDate: string, endDate: string): CrossReference[] => {
  return crossReferences.filter(ref => {
    return ref.date >= startDate && ref.date <= endDate
  })
}