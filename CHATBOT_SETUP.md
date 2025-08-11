# Intelligent Chatbot Configuration Guide

This guide explains how to configure the intelligent chatbot that personifies Aman Mehrotra using data from multiple sources. The chatbot is configured entirely on the backend - visitors don't need to provide any API keys.

## Features

- **Multi-Source Data Integration**: Reads from `portfolio.json`, `summary.txt`, and LinkedIn PDF
- **Multiple LLM Providers**: Supports OpenAI, Groq, and Ollama
- **Backend Configuration**: No client-side setup required for visitors
- **Automatic Provider Selection**: Uses the first available configured provider
- **Intelligent Responses**: Uses real data to provide accurate, personalized responses
- **Fallback System**: Graceful degradation when APIs are unavailable

## Quick Setup (Choose One Option)

### Option 1: OpenAI (Recommended for Best Quality)

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Edit `.env.local` and add:
   ```env
   OPENAI_API_KEY=sk-your-openai-api-key-here
   OPENAI_MODEL=gpt-4o-mini
   ```
4. Restart your development server

### Option 2: Groq (Recommended for Speed & Cost)

1. Get an API key from [Groq Console](https://console.groq.com/keys)
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Edit `.env.local` and add:
   ```env
   GROQ_API_KEY=gsk_your-groq-api-key-here
   GROQ_MODEL=llama-3.1-8b-instant
   ```
4. Restart your development server

### Option 3: Ollama (Free, Local)

1. Install Ollama:
   ```bash
   # macOS
   brew install ollama
   
   # Linux
   curl -fsSL https://ollama.ai/install.sh | sh
   ```

2. Start Ollama and pull a model:
   ```bash
   ollama serve
   ollama pull llama2
   ```

3. The chatbot will automatically use Ollama if no API keys are configured

## Configuration Priority

The system automatically selects the provider in this order:
1. **OpenAI** (if `OPENAI_API_KEY` is set)
2. **Groq** (if `GROQ_API_KEY` is set)  
3. **Ollama** (fallback, always available if running)

## Environment Variables

Create a `.env.local` file in your project root:

```env
# Option 1: OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-mini

# Option 2: Groq Configuration  
GROQ_API_KEY=gsk_your-groq-api-key-here
GROQ_MODEL=llama-3.1-8b-instant

# Option 3: Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

## Data Sources

The chatbot intelligently combines information from:

1. **src/data/portfolio.json**: Complete professional profile
2. **summary.txt**: Personal summary and context
3. **LinkedIn_Profile.pdf**: LinkedIn profile data (automatically parsed)

## Testing the Chatbot

1. Start your development server: `npm run dev`
2. Open your website
3. Click the chatbot button in the bottom-right corner
4. Ask questions like:
   - "Tell me about your experience at PepsiCo"
   - "What are your technical skills?"
   - "Where are you from?"
   - "What's your favorite food?"

## API Endpoints

- `GET/POST /api/chat` - Chat with the AI
- `GET /api/config` - Check current configuration status

## Deployment Notes

### For Production:
1. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
2. Never commit `.env.local` to version control
3. Use platform-specific environment variable settings

### For Vercel:
1. Go to your project settings
2. Add environment variables:
   - `OPENAI_API_KEY` or `GROQ_API_KEY`
   - `OPENAI_MODEL` or `GROQ_MODEL`

### For Local Ollama:
- Only works in development unless you deploy Ollama on a server
- Consider using OpenAI or Groq for production

## Troubleshooting

**Chatbot not responding**: Check the terminal for logs and verify your API keys

**"Configuration issues" message**: The backend couldn't initialize any LLM provider

**Slow responses**: 
- OpenAI/Groq: Check internet connection
- Ollama: Ensure sufficient system resources

**API key errors**: Verify your keys are correct and have sufficient credits/quota

## Security

- API keys are stored securely on the server
- Visitors never see or need to configure API keys
- No sensitive data is logged or stored client-side
