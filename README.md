# Onechalerm - เส้นทางสู่ความมืด

An interactive data visualization documenting the enforced disappearance of Wanchalearm Satsaksit (วันเฉลิม สัตย์ศักดิ์สิทธิ์) and 8 other Thai political activists in Southeast Asia.

🔗 **Live Site**: [https://[your-username].github.io/onechalerm/](https://[your-username].github.io/onechalerm/)

## About

On June 4, 2020, Wanchalearm Satsaksit was abducted in broad daylight outside his condominium in Phnom Penh, Cambodia. He became the 9th Thai political activist to disappear in exile since the 2014 military coup. This project uses data visualization to tell his story and reveal the patterns behind these enforced disappearances.

## Features

- **Interactive Timeline**: Explore events from 2014 coup to present
- **Network Analysis**: Uncover hidden connections and power structures  
- **Geographic Mapping**: Trace escape routes and disappearance locations
- **Scrollytelling**: Immersive narrative of Wanchalearm's final days
- **Case Comparison**: Analyze patterns across all 9 disappearances

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-username]/onechalerm.git
cd onechalerm

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development

```bash
# Run tests
npm test

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Data Sources

- Primary investigation by Prachatai (August 2022)
- UN Working Group on Enforced Disappearances reports
- Human rights organizations documentation
- Court documents and witness testimonies

## 🛠️ Technology Stack

- **Frontend**: React 18.3 + TypeScript 5.7
- **Build Tool**: Vite 5.4 (lightning fast)
- **Visualization**: D3.js 7.9
- **Maps**: Mapbox GL JS 3.8
- **Styling**: Tailwind CSS 3.4 + DaisyUI 5.0
- **Animation**: Framer Motion 11.12
- **Scrollytelling**: Scrollama 3.2
- **CI/CD**: GitHub Actions + GitHub Pages

## 🗂️ Data Architecture

No database required! All data is stored in static JSON/TypeScript files:

```
src/data/
├── timeline-data.ts      # Timeline events & disappearance cases
├── articles.ts           # Article content with markdown support
├── cross-references.ts   # Links between events, people & locations
└── real-images.ts        # Image metadata with attribution
```

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to `main` branch.

### Manual Setup:
1. Fork this repository
2. Go to Settings → Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Push any change to trigger deployment
5. Your site will be available at: `https://[your-username].github.io/onechalerm/`

## 📝 Adding Content

### Add a Timeline Event
Edit `src/data/timeline-data.ts`:
```typescript
{
  id: 'unique-event-id',
  date: '2020-06-04',
  title: 'Event Title',
  description: 'Detailed description',
  type: 'disappearance', // political, personal, investigation, legal
  location: 'City, Country',
  isImportant: true
}
```

### Add an Article
Edit `src/data/articles.ts`:
```typescript
{
  id: 'article-id',
  title: 'Article Title',
  subtitle: 'Subtitle',
  date: '2020-06-05',
  tags: ['investigation', 'evidence'],
  content: `Article content in **markdown** format...`
}
```

## 🤝 Contributing

This project aims to shed light on human rights violations through responsible data journalism. Contributions that enhance the storytelling, improve accessibility, or add verified information are welcome.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security & Ethics

- All sensitive information is anonymized
- Sources requesting anonymity are protected
- Faces in photos are blurred for safety
- Current locations of at-risk individuals are never disclosed

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Acknowledgments

- Families of the disappeared for their courage
- Human rights defenders and journalists
- Organizations fighting for justice

---

*"They may silence the person, but they cannot silence the truth."*