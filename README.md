# Technical Test — Product Management Dashboard

A product management dashboard built as part of a frontend technical assessment. The app consumes the [DummyJSON](https://dummyjson.com) public API and supports product listing, search, add, edit, delete, and pagination.

## Live Demo

[https://testdjson.vercel.app](https://testdjson.vercel.app)

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 8 |
| UI Library | Ant Design 6 |
| Routing | TanStack Router v1 |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| HTTP Client | Axios |
| Styling | SCSS Modules |
| Icons | Heroicons |
| Package Manager | pnpm |

## Features

- Product list with pagination
- Search product with debounce
- Add product
- Edit product
- Delete product
- View product detail
- Optimistic cache update (without refetch)
- Authentication (login/logout)
- Protected routes

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/username/testdjson.git
cd testdjson

# Install dependencies
pnpm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=https://dummyjson.com
```

### Running the App

```bash
# Development
pnpm dev

# Build
pnpm build

# Preview build
pnpm preview
```

## Login Credentials

Uses DummyJSON auth:

```
Username: emilys
Password: emilyspass
```