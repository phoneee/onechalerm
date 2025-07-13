# Map Features - แผนที่แสดงตำแหน่งผู้สูญหาย 9 คน

## ✅ Features Implemented

### 1. **Custom Markers for Each Person**
- Round profile images as markers
- Color coding: 
  - 🟡 Yellow border = Missing (สูญหาย)
  - 🔴 Red border = Found dead (พบศพ)
- Hover effect: Scale animation
- Shows first letter of name if no image available

### 2. **Interactive Popups**
Each marker has a popup showing:
- Profile image (or initial)
- Full name (Thai + English)
- Status badge (สูญหาย/พบศพ)
- Date of disappearance
- Location
- Age at disappearance
- "ดูรายละเอียด" (View Details) button

### 3. **Detailed Info Card**
When clicking "View Details":
- Large featured image with credit
- Complete information
- Background story
- Last seen details
- Related articles with links
- Smooth animations

### 4. **Map Constraints**
- Zoom limits: Min 4, Max 8 (prevents getting lost)
- Centered on Southeast Asia
- Mekong River highlighted in blue
- Country statistics cards below map

### 5. **Visual Hierarchy**
- **Laos**: 5 disappeared (2 found dead)
- **Vietnam**: 3 disappeared (all missing)
- **Cambodia**: 1 disappeared (Wanchalearm)

## 📍 All 9 Locations Plotted

1. **วันเฉลิม สัตย์ศักดิ์สิทธิ์** - Phnom Penh, Cambodia
2. **อิทธิพล สุขแป้น** - Vientiane, Laos
3. **วุฒิพงศ์ ผิวเหลือง** - Vientiane, Laos
4. **สุรชัย แซ่ด่าน** - Laos
5. **ชัชชาญ บุญเฟื่อง** - Mekong River (found dead)
6. **ไกรเดช ทนงศึก** - Mekong River (found dead)
7. **เสียม เถียรพัฒน์** - Ho Chi Minh City, Vietnam
8. **ชูชีพ ชีวะประเสริฐ** - Ho Chi Minh City, Vietnam
9. **กฤษณะ ทัพไทย** - Ho Chi Minh City, Vietnam

## 🖼️ Real Images Used

Images are sourced from:
- Thai PBS World
- Bangkok Post
- Prachatai
- Voice TV
- Khaosod English

All images include proper attribution and credits.

## 🔗 Click Flow

1. **Hover** over marker → See name tooltip
2. **Click** marker → Opens popup with summary
3. **Click** "ดูรายละเอียด" → Shows full info card
4. **Click** article links → Opens article modal
5. **Click** anywhere on map → Closes popups

## 🎨 Design Features

- Dark theme map style
- Glow effect on Mekong River
- Custom CSS for popups
- Responsive on all devices
- Smooth animations
- Accessibility features

## 📱 Mobile Support

- Touch-friendly markers
- Scrollable popups
- Responsive info cards
- Bottom navigation on mobile

---

**Live at**: https://phoneee.github.io/onechalerm/

Navigate to the Map view (แผนที่) to see all features in action.