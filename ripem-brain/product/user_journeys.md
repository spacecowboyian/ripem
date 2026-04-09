# User Journeys

## Primary Personas

### The Builder (Primary iOS User)
- **Who**: Car enthusiast actively working on a project vehicle
- **Goals**: Track what they've done, remember parts used, share progress
- **Pain points**: Scattered notes, forgotten part numbers, no easy way to document
- **Platform**: iOS

### The Sharer
- **Who**: Enthusiast who loves showing off their build on social media
- **Goals**: Create compelling content from their work, grow a following
- **Pain points**: Time-consuming to create posts, no automotive-native tool
- **Platform**: iOS primary, social media secondary

### The Learner
- **Who**: Someone planning a build or researching modifications
- **Goals**: Discover what others have done with their car, get AI advice
- **Pain points**: Information is scattered across forums, YouTube, Facebook groups
- **Platform**: iOS and web

---

## Core Journeys

### Journey 1: First Log Entry (Documenter)
1. User downloads app and creates account
2. User adds their vehicle (year, make, model)
3. After a work session, user taps "Log Session"
4. User speaks naturally: "Just swapped the front struts, used KYB Excel-G, took about 3 hours, cost me $180 for the pair"
5. AI extracts: parts (KYB Excel-G struts), time (3 hours), cost ($180), job type (suspension)
6. User reviews and confirms the log entry
7. Entry appears in build timeline

### Journey 2: AI Q&A (Learner / Builder)
1. User navigates to AI assistant
2. User asks: "What's the best intake for my build budget?"
3. AI references: user's car (e.g., 2003 Honda Civic), prior logged mods, stated budget
4. AI answers with car-specific recommendations and confidence score
5. AI cites: "Based on 2,400 logged builds for this car..."

### Journey 3: Publish and Go Viral (Sharer)
1. User completes a milestone in their build
2. AI suggests: "You've logged 12 sessions — ready to publish a build update?"
3. User taps "Publish"
4. AI auto-formats: title, description, highlight reel from logged sessions
5. Watermark is applied automatically
6. Post goes live on RipEm; user shares to Instagram/TikTok
7. Viewers see watermark → download app → discover community

### Journey 4: Parts Discovery
1. User needs a specific part
2. User opens Parts Search
3. User searches "coilovers for 2003 Civic"
4. Results show: products, prices, affiliate links, sponsored listings (ads)
5. AI surfaces what other community members used for the same car

---

## See Also

- [product_definition.md](./product_definition.md)
- [features.md](./features.md)
- [/mvp/acceptance_criteria.md](../mvp/acceptance_criteria.md)
