# NutriAgent Server

A Node.js server supporting the NutriAgent AI website, with integration for Groq and Hindsight APIs.

## Features

- Serves static HTML files for the NutriAgent web app
- User authentication with session management
- Integration with Groq API for AI chat responses
- Integration with Hindsight API for health data (placeholder)
- CORS enabled for API access

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with your API keys:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   HINDSIGHT_API_KEY=your_hindsight_api_key_here
   SESSION_SECRET=your_session_secret_here
   ```

3. Start the server:
   ```
   npm start
   ```
   Or for development:
   ```
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## API Endpoints

- `POST /login` - Authenticate user (email: user@example.com, password: password)
- `POST /logout` - Logout user
- `GET /auth/status` - Check login status
- `POST /api/groq` - Send messages to Groq AI (requires login)
- `GET /api/hindsight` - Fetch health data from Hindsight API (requires login)

## Usage

- Login with the provided credentials on the index.html page
- Access the main app at Agent123.html
- Use the integrated APIs for AI assistance and health insights

## Troubleshooting

- Ensure all environment variables are set correctly
- Check console for server errors
- Verify API keys are valid and have proper permissions
- For Hindsight API, replace the placeholder endpoint with the actual API URL

## Dependencies

- express: Web framework
- express-session: Session management
- axios: HTTP client for API calls
- cors: Cross-origin resource sharing
- dotenv: Environment variable management