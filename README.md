# Hathor Wallet Frontend

A modern, responsive frontend application for the Hathor Wallet, built with React and TypeScript.

## Features

- Wallet management interface
- Token creation and management
- Rewards system
- User profile management
- Telegram Mini App integration
- Responsive design with mobile-first approach

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- React Query
- Wouter (for routing)
- Framer Motion (for animations)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd HTRminiapp
```

2. Install dependencies:
```bash
# Install all dependencies from package.json
npm install

# Install specific package categories (if needed)
# Core dependencies
npm install react@18.3.1 react-dom@18.3.1 typescript@5.6.3 express@4.21.2

# UI Components
npm install @radix-ui/react-accordion@1.2.4 @radix-ui/react-alert-dialog@1.1.7 @radix-ui/react-avatar@1.1.4

# Data Visualization
npm install chart.js@4.4.9 react-chartjs-2@5.3.0 recharts@2.15.2

# Development dependencies
npm install -D @types/react@18.3.11 @types/react-dom@18.3.1 @types/node@20.16.11
```

## Development

To start the development server:

```bash
npm run dev
# or
npx tsx server/index.ts
```

The application will be available at `http://localhost:5000`

## Docker Deployment

The project includes a multi-stage Dockerfile for optimized production deployment:

1. Build the Docker image:

```bash
docker build -t HTRminiapp .
```

2. Run the container:

```bash
docker run -p 5000:5000 HTRminiapp
```


## Building for Production

To create a production build:

```bash
npm run build
# or
npx tsx server/index.ts
```

The built files will be in the `dist` directory.

## Project Structure

```
HathorConnect/
├── client/                      # Frontend application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/           # React context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions and configurations
│   │   ├── pages/             # Page components
│   │   ├── types/             # TypeScript type definitions
│   │   ├── App.tsx            # Main application component
│   │   ├── main.tsx           # Application entry point
│   │   └── index.css          # Global styles
│   └── index.html             # HTML template
├── server/                     # Backend application
│   ├── services/              # Business logic and services
│   ├── index.ts               # Server entry point
│   ├── vite.ts                # Vite configuration for server
│   ├── storage.ts             # Storage related functionality
│   └── routes.ts              # API route definitions
├── shared/                    # Shared code between client and server
├── attached_assets/           # Project assets
├── node_modules/              # Dependencies
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Locked dependencies
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── drizzle.config.ts         # Drizzle ORM configuration
├── components.json           # UI components configuration
├── ngrok.yml                 # Ngrok configuration
└── README.md                 # Project documentation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

