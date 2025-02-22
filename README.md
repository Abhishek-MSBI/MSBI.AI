# MSBI.AI - Biological Sciences Research Assistant

An AI-powered research assistant platform designed specifically for biological sciences, streamlining scientific document analysis and knowledge extraction through advanced computational tools.

## 🌟 Features

- 🧬 Specialized in biological sciences and bioinformatics
- 📝 Advanced file processing for scientific documents
- 🤖 AI-driven research insights
- 🌙 Dark theme user interface
- 📱 Responsive web application design
- 📤 Robust file upload capabilities

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- Node.js (v20.x or later)
- npm (v9.x or later)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/msbi-ai.git
cd msbi-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` and add your API keys:
- Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- Get your PaLM API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📦 Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## 🔧 Environment Variables

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- `PALM_API_KEY`: Your PaLM API key

Optional variables:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `DATABASE_URL`: PostgreSQL database URL (if using database)

## 🌐 API Documentation

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

## 🛠️ Tech Stack

- Frontend:
  - React with TypeScript
  - TanStack Query for data fetching
  - Tailwind CSS & shadcn/ui for styling
  - Wouter for routing
- Backend:
  - Express.js
  - OpenAI API
  - PaLM API
  - Drizzle ORM (optional)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.