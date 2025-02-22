# MSBI.AI - Biological Sciences Research Assistant

An AI-powered research assistant platform designed specifically for biological sciences, streamlining scientific document analysis and knowledge extraction through advanced computational tools.

## Features

- 🧬 Specialized in biological sciences and bioinformatics
- 📝 Advanced file processing for scientific documents
- 🤖 AI-driven research insights
- 🌙 Dark theme user interface
- 📱 Responsive web application design
- 📤 Robust file upload capabilities

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v20.x or later)
- npm (v9.x or later)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required for AI functionality
OPENAI_API_KEY=your_openai_api_key
PALM_API_KEY=your_palm_api_key

# Optional for production deployment
NODE_ENV=production
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/msbi-ai.git
cd msbi-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Development

- Frontend code is in the `client/src` directory
- Backend API routes are in `server/routes.ts`
- Shared types and schemas are in `shared/schema.ts`

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## API Documentation

### POST /api/query
Submit a research question with optional file attachments.

Request body:
```typescript
{
  question: string;
  files?: string[];
}
```

Response:
```typescript
{
  id: number;
  question: string;
  answer: string;
  files: string[];
  createdAt: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
