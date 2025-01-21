# URL Shortener Microservice

This is a simple Node.js application that implements a URL shortener microservice. Users can submit a URL, which will be stored and assigned a unique ID. The service can then redirect users to the original URL using the shortened ID.

## Features

- **Root Route:** Serves a static HTML page for user interaction.
- **CORS Enabled:** Ensures the API is remotely testable.
- **API Endpoints:**
  - `/api/hello`: Returns a sample JSON response.
  - `/api/shorturl`: Accepts a URL and returns a shortened version.
  - `/api/shorturl/:id`: Redirects the user to the original URL based on the shortened ID.

## Usage

### API Endpoints

1. **GET `/api/hello`**  
   Example response:  
   {  
     "greeting": "hello API"  
   }

2. **POST `/api/shorturl`**  
   Accepts a URL in the body of the request and returns a JSON object containing the original URL and its shortened version.  
   Example request:  
   Body: `{ "url": "https://www.example.com" }`  
   Example response:  
   {  
     "original_url": "https://www.example.com",  
     "short_url": 1  
   }  

3. **GET `/api/shorturl/:id`**  
   Redirects the user to the original URL based on the provided ID.  
   Example: Visiting `/api/shorturl/1` redirects to `https://www.example.com`.

## Installation

1. Clone the repository:  
   git clone https://github.com/abelgideon/URL-Shortener-Microservice.git  

2. Navigate to the project directory:  
   cd URL-Shortener-Microservice  

3. Install dependencies:  
   npm install  

4. Set up the environment variables (create a `.env` file):  
   Add your `PORT` or other environment variables if necessary.  

5. Start the application:  
   npm start  

## Contributions

Contributions are welcome! Fork the repository and submit a Pull Request with your improvements.