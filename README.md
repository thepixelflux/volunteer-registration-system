# Volunteer Registration System - Naye Pankh Foundation Prototype

A production-ready full-stack MERN application built as a prototype for the Naye Pankh Foundation volunteer portal.

## Core Features
- **Structural Registration Pipeline:** Captures and validates key volunteer fields (Name, Email, Contact, Preferred Role, and Custom Skills).
- **Live Cloud Syncing:** Securely pipes validated incoming form submissions into a live MongoDB Atlas cluster database.
- **Dynamic Admin Dashboard:** Integrated state-swapped layout displaying real-time applicant data fetched securely via a background GET API route.
- **NGO Branding Integration:** Complete with custom typography, official logos, and responsive redirection buttons to the live foundation portal.

## How to Setup

### 1. Environment Configuration
Create a `.env` file inside the `backend` directory matching the structural outline provided in `.env.example`:
```text
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
