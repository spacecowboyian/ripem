# Technical Terms

This glossary covers technical and AI terminology used in RiPeM documentation.

---

## A

**API** — Application Programming Interface. A set of rules that allows different software components to communicate. RiPeM's backend exposes a REST API consumed by the iOS and web apps.

**async/await** — A programming pattern for handling asynchronous operations. Used in Swift for network and AI calls.

**AVFoundation** — Apple's framework for audio and video capture and playback. Used for voice recording in the iOS app.

## B

**Backend** — The server-side application that handles business logic, data storage, and API responses.

**Bearer token** — An authentication token passed in HTTP headers to authorize API requests.

## C

**CDN** — Content Delivery Network. A distributed server network that delivers media content (images, video) with low latency.

**CoreData** — Apple's framework for local data persistence on iOS.

## E

**Endpoint** — A specific URL in an API that performs a defined operation (e.g., `POST /sessions` to log a session).

## G

**GDPR** — General Data Protection Regulation. EU data privacy law requiring transparent data handling and user rights.

**CCPA** — California Consumer Privacy Act. US state law governing data privacy for California residents.

## I

**iOS** — Apple's mobile operating system. The primary platform for RiPeM.

## J

**JSON** — JavaScript Object Notation. A lightweight data format used for API requests and responses.

**JWT** — JSON Web Token. A compact token format used for authentication.

## L

**LLM** — Large Language Model. The type of AI model that powers RiPeM's assistant (e.g., GPT-4, Claude).

## O

**Offline-first** — An architecture approach where the app is designed to function without internet connectivity, syncing when a connection is available.

## R

**REST / RESTful** — Representational State Transfer. An architectural style for web APIs using standard HTTP methods (GET, POST, PUT, DELETE).

## S

**SwiftUI** — Apple's declarative UI framework for building iOS interfaces. Used for RiPeM's iOS app.

**System prompt** — The instructions given to an AI model that define its persona, behavior, and context. RiPeM injects vehicle and build context into the system prompt.

## T

**Transcription** — The process of converting audio recordings to text. RiPeM uses AI transcription (Whisper or Apple Speech) to convert voice logs.

**TLS** — Transport Layer Security. The protocol that encrypts data in transit (HTTPS uses TLS).

## U

**UUID** — Universally Unique Identifier. A 128-bit identifier used as primary keys in RiPeM's data model.

## W

**Whisper** — OpenAI's speech-to-text model. A candidate for RiPeM's transcription engine due to its accuracy on domain-specific vocabulary.
