# iOS App Architecture

## Overview

| Property | Value |
|----------|-------|
| Language | Swift |
| UI Framework | SwiftUI + Combine |
| Min iOS | 15.0 |
| Architecture | MVVM + Redux-style AppStore |
| Offline strategy | SQLite local DB + SyncService |

**Source**: RiPeM MVP Technical Specification v1.0 (April 2025)

---

## Architecture Layers

```
UI (SwiftUI Views)
    ↓
View Models (MVVM)
    ↓
AppStore (Redux-style shared state)
    ↓
Services Layer (API, Audio, Database, Sync)
    ↓
External APIs (RiPeM Backend, Whisper, Instagram, Apple OAuth, S3)
```

---

## Core Data Models (Swift)

```swift
struct User: Codable, Identifiable {
  let id: String
  let email: String
  let displayName: String
  let avatarURL: URL?
  let authToken: String
  let refreshToken: String
  var tokenExpiresAt: Date
  var isTokenExpired: Bool { Date() > tokenExpiresAt }
}

struct Garage: Codable, Identifiable {
  let id: String
  let userId: String
  let name: String
  var projects: [Project] = []
}

struct Project: Codable, Identifiable {
  let id: String
  let garageId: String
  let year: Int
  let make: String
  let model: String
  let name: String            // "Dale"
  let originStory: String?
  let vision: [String]        // ["track_car"]
  let skillLevel: SkillLevel
  let budgetAmount: Decimal
  let timelineMonths: Int
  let workCompleted: String?
  let primaryFocus: String?
  var logEntries: [LogEntry] = []
  var goals: [Goal] = []
  let isPublic: Bool
  let createdAt: Date

  enum SkillLevel: String, Codable {
    case novice, intermediate, advanced, professional
  }
}

struct LogEntry: Codable, Identifiable {
  let id: String
  let projectId: String
  let voiceRecordingURL: URL?
  let voiceDuration: TimeInterval
  let transcript: String
  let aiResponse: String
  var photoURLs: [URL] = []
  let isPublic: Bool
  var isShared: Bool
  var likes: Int = 0
  let createdAt: Date
  var syncStatus: SyncStatus = .pending

  enum SyncStatus: String, Codable {
    case pending, syncing, synced, failed
  }
}
```

---

## App State Management

```swift
@MainActor
class AppStore: ObservableObject {
  @Published var authState: AuthState = .init()
  @Published var garage: Garage?
  @Published var selectedProject: Project?
  @Published var logEntries: [LogEntry] = []
  @Published var conversations: [Conversation] = []
  @Published var discoveryFeed: [DiscoveryItem] = []
  @Published var syncStatus: SyncStatus = .idle

  enum SyncStatus {
    case idle, syncing
    case error(String)
    case paused(reason: String)
  }
}
```

---

## Screen Hierarchy

### Phase 1 (Weeks 1-2): Onboarding

```
App Launch
└── OnboardingFlow (new user)
    ├── WelcomeScreen
    ├── QuestionnaireScreens (1-12)
    └── AIFirstResponseScreen
```

### Phase 2+ (Main App)

```
TabBar
├── Garage Tab
│   ├── GarageView (project list)
│   ├── ProjectDetailView
│   │   ├── ProjectOverview
│   │   ├── LogEntriesList
│   │   ├── AIAssistantView (chat)
│   │   └── GoalsList
│   └── RecordEntryView (voice recording)
│
├── Discovery Tab
│   ├── DiscoveryFeedView (swipeable)
│   └── SubscriptionsView
│
└── Settings Tab
    ├── ProfileView
    ├── PreferencesView
    └── SubscriptionView
```

---

## Key Screen Implementations

### RecordEntryView (Voice Logging)

Core flow:
1. User taps record → `AudioService.startRecording()` (16kHz mono M4A)
2. User taps stop → `AudioService.stopRecording()` returns local file URL
3. `LogEntryViewModel` creates `LogEntry` with `syncStatus: .pending`
4. `DatabaseService.saveLogEntry()` persists to local SQLite
5. App shows "Saved locally"
6. When online: `SyncService` detects reachability → `APIService.createLogEntry()`
7. Backend: S3 upload → Whisper → AI response
8. `DatabaseService.updateLogEntry()` + `syncStatus: .synced`
9. Push notification: "Your buddy has responded"

### AIAssistantView (Chat)

- Uses `POST /ai/chat` (async)
- Polls `GET /ai/chat/{conversation_id}/response` until `status: "complete"`
- Displays Chat Pro upsell if user hits free tier limit

### DiscoveryFeedView

- Vertical swipeable `TabView` (TikTok-style)
- Like / Subscribe actions on overlay buttons
- Paginated: load more when reaching end

---

## Services Layer

### APIService

```swift
class APIService {
  private let baseURL = URL(string: "https://api.ripem.app/v1")!
  private var authToken: String?

  func login(email: String, password: String) async throws -> User
  func createLogEntry(projectId: String, voiceURL: URL, photos: [UIImage]) async throws -> LogEntry
  func syncLogEntry(_ entry: LogEntry) async throws -> LogEntry
  func getDiscoveryFeed(page: Int) async throws -> [DiscoveryItem]
  // ... all other API endpoints
}
```

### AudioService

```swift
class AudioService: NSObject, AVAudioRecorderDelegate {
  // 16kHz mono M4A for optimal Whisper performance
  let settings: [String: Any] = [
    AVFormatIDKey: Int(kAudioFormatMPEG4AAC),
    AVSampleRateKey: 16000.0,
    AVNumberOfChannelsKey: 1
  ]

  func startRecording() throws
  func stopRecording() throws -> URL   // returns local file URL
  func cancelRecording()
}
```

### DatabaseService (Local SQLite)

```swift
class DatabaseService {
  // SQLite.swift wrapper
  func saveLogEntry(_ entry: LogEntry) throws
  func getPendingEntries() throws -> [LogEntry]
  func updateSyncStatus(_ id: String, status: String) throws
  func updateLogEntry(_ entry: LogEntry) throws
}
```

### SyncService (Offline-First)

```swift
class SyncService {
  private let reachability = try? Reachability()

  func startSync() {
    reachability?.whenReachable = { [weak self] _ in
      self?.syncPendingEntries()
    }
    try? reachability?.startNotifier()
  }

  private func syncPendingEntries() {
    // Fetch pending from local DB → POST to /log/create → update status
  }
}
```

---

## Offline-First State Flow

```
User taps "Record" → AudioService.startRecording()
User taps "Stop" → local M4A file
LogEntryViewModel creates entry (syncStatus: .pending)
DatabaseService.saveLogEntry() → SQLite
App shows "Saved locally"
  ↓ [offline wait]
User goes online
Reachability → SyncService.syncPendingEntries()
APIService.createLogEntry(voice + photos)
  ↓
Whisper → transcript → AI response → back to app
DatabaseService.updateLogEntry(response) + syncStatus: .synced
Push notification: "Your buddy has responded"
```

---

## Performance Guidelines

1. **Lazy loading**: Discovery feed paginated (20 items); trigger load-more at bottom
2. **Image caching**: `AsyncImage` with `URLCache`
3. **Memory management**: `weak self` in closures; avoid retaining large objects
4. **Batch sync**: Sync all pending entries in one go, not one-by-one

---

## Build & Deployment

| Stage | Target |
|-------|--------|
| Xcode version | 15+ |
| TestFlight beta | Week 4 (end of Phase 1) |
| App Store launch | Week 8 |

## See Also

- [architecture.md](./architecture.md)
- [tech_stack.md](./tech_stack.md)
- [api_spec.md](./api_spec.md)
