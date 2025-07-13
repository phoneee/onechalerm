# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Onechalerm** is an investigative data visualization project telling the story of Wanchalearm Satsaksit (วันเฉลิม สัตย์ศักดิ์สิทธิ์), a Thai political activist who was forcibly disappeared in Cambodia on June 4, 2020. The project aims to create interactive visualizations that reveal the patterns, networks, and timeline of enforced disappearances of Thai political exiles.

## Key Context

- **Source Article**: https://prachatai.com/journal/2022/08/100082
- **Focus**: Enforced disappearances of Thai political activists (9 cases since 2014 coup)
- **Main Subject**: Wanchalearm Satsaksit - abducted from Phnom Penh, Cambodia
- **Visualization Types**: Timeline analysis, network graphs, geographic mapping, scrollytelling

## Architecture & Tech Stack

### Frontend
- **Framework**: React with TypeScript for component architecture
- **Visualization Libraries**: 
  - D3.js for custom visualizations and network graphs
  - Mapbox GL JS for geographic storytelling
  - Scrollama.js for scrollytelling narratives
- **Styling**: Tailwind CSS for responsive design
- **State Management**: Zustand for lightweight state management

### Data Layer
- **Format**: JSON data files for portability
- **Structure**:
  ```
  /data
    /timeline      # Chronological events data
    /networks      # Relationship and connection data
    /geographic    # Location-based data
    /cases         # Individual case files
  ```

### Build System
- **Package Manager**: pnpm for efficient dependency management
- **Build Tool**: Vite for fast development and optimized builds
- **Testing**: Vitest for unit tests, Playwright for E2E tests

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test          # Unit tests
pnpm test:e2e      # End-to-end tests

# Lint and format
pnpm lint          # ESLint
pnpm format        # Prettier

# Type checking
pnpm typecheck

# Data validation
pnpm validate:data
```

## Project Structure

```
/src
  /components
    /timeline      # Timeline visualization components
    /network       # Network graph components
    /map           # Geographic visualization components
    /story         # Scrollytelling narrative components
  /data
    /loaders       # Data loading and transformation
    /validators    # Data validation schemas
  /hooks           # Custom React hooks
  /utils           # Utility functions
  /styles          # Global styles and themes
```

## Data Security & Ethics Guidelines

1. **Anonymization**: Protect identities of at-risk individuals
2. **Source Protection**: Never expose sources who request anonymity
3. **Fact Verification**: All data must be verified from multiple sources
4. **Sensitive Information**: Blur faces, avoid current locations of refugees
5. **Legal Compliance**: Follow Thai and international laws on data protection

## Key Features to Implement

1. **Interactive Timeline**
   - Chronological events from 2014 coup to present
   - Filter by person, location, or event type
   - Multimedia integration (photos, videos, documents)

2. **Network Analysis**
   - Relationship mapping between activists, politicians, and officials
   - Force-directed graphs showing power structures
   - Hidden connections revealed through investigation

3. **Geographic Storytelling**
   - Map showing disappearance locations
   - Escape routes and safe houses
   - Cross-border movements

4. **Scrollytelling Investigation**
   - Immersive narrative of Wanchalearm's last days
   - Step-by-step revelation of evidence
   - Integration of all visualization types

5. **Case Comparison Dashboard**
   - Side-by-side analysis of all 9 disappearances
   - Pattern identification
   - Investigation status tracking

## Data Sources & Attribution

- Primary source: Prachatai article (August 2022)
- Human rights organizations reports
- UN Working Group on Enforced Disappearances
- Court documents and official statements
- Witness testimonies (anonymized)

## Performance Considerations

- Lazy load heavy visualizations
- Optimize images and media files
- Use WebGL for complex network graphs
- Implement progressive data loading
- Cache processed data

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation for all interactions
- Screen reader support with ARIA labels
- High contrast mode option
- Multi-language support (Thai/English)

## Deployment

- Static site deployment to Vercel/Netlify
- CDN for media assets
- HTTPS enforcement
- Regular security audits
- Backup data storage

## Important Patterns

1. **Data Validation**: Always validate data before visualization
2. **Error Boundaries**: Graceful degradation for failed data loads
3. **Responsive Design**: Mobile-first approach
4. **Progressive Enhancement**: Core content accessible without JavaScript
5. **Documentation**: Comment complex data transformations

This project aims to shed light on enforced disappearances through compelling data storytelling while maintaining the highest standards of journalistic integrity and technical excellence.