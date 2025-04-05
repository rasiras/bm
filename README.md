# Real-Time Brand Mention & Sentiment Dashboard

A modern SaaS application for monitoring brand mentions and sentiment across various platforms. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Real-time brand mention monitoring
- Sentiment analysis (positive, neutral, negative)
- Multi-platform support (Twitter, Reddit, news sites)
- Actionable insights and recommendations
- Responsive dashboard with filtering capabilities
- User authentication and protected routes
- Modern, clean UI with Tailwind CSS

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Clerk account for authentication (or your preferred auth provider)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd brand-mention-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── pricing/          # Pricing page
│   ├── contact/          # Contact page
│   └── page.tsx          # Landing page
├── components/            # Reusable components
├── data/                 # Mock data and API utilities
└── types/                # TypeScript type definitions
```

## Development

- The application uses Next.js 14 with the App Router
- Tailwind CSS for styling
- Clerk for authentication
- Mock data for development (ready for real API integration)

## Deployment

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
