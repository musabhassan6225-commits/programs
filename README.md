# Dental Practice Management System (DPMS)

This repository contains a production-ready, modular Dental Practice Management System and CRM designed for enterprise dental clinics and multi-location organizations.

## Architecture Overview

- `apps/backend` - NestJS API server with PostgreSQL and Redis support
- `apps/frontend` - Next.js + TypeScript + Tailwind CSS clinic portal
- `docker-compose.yml` - Local development environment with PostgreSQL, Redis, backend, and frontend

## Key Features

- Role-based access control (RBAC)
- Patient EHR and medical/dental history
- Interactive odontogram and periodontal charting foundation
- Appointments, scheduling, and clinic calendar workflows
- Billing, invoice, payments, and insurance claim management
- Imaging asset support for X-rays, scans, and per-tooth tagging
- Treatment planning module for diagnosis and cost estimates
- Modular architecture ready for AI diagnostics and imaging expansion
- Audit logging for all patient and appointment updates

## Setup

1. Install dependencies for backend and frontend:

```bash
cd /workspaces/programs/apps/backend && npm install
cd /workspaces/programs/apps/frontend && npm install
```

2. Copy `.env.example` to `.env` in `apps/backend` and update database credentials if needed.

3. Start the environment with Docker Compose:

```bash
docker compose up --build
```

4. Open the frontend at `http://localhost:3000` and backend at `http://localhost:4200`.

> Preview the current clinic portal modules at `http://localhost:3000/preview`.

## Project Structure

- `apps/backend/src` - API modules, entities, RBAC, services, controllers, database configuration
- `apps/frontend/src` - Next.js pages, components, charting UI, and data fetching
- `apps/frontend/src/pages/preview.tsx` - current product preview dashboard for the clinic portal
- `apps/frontend/src/pages/appointments.tsx` - appointment list and booking workflow
- `apps/frontend/src/pages/billing.tsx` - invoices, payments, and insurance claim management
- `apps/frontend/src/pages/imaging.tsx` - imaging asset review and upload
- `apps/frontend/src/pages/treatment-plans.tsx` - treatment planning and case workflows

## Deployment

This system is designed for containerized deployment. For production, run from a cloud provider with managed PostgreSQL, Redis, and object storage for imaging assets.

---

## Notes

This scaffold is a foundation for a dental SaaS platform that can evolve into AI-powered diagnostics, imaging integrations, and multi-clinic workflows.
