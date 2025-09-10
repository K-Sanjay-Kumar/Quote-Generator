const express = require('express');
const morgan = require('morgan');
const { RateLimiterMemory } = require('rate-limiter-flexible');

const app = express();
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

// Sample quotes array
const quotes = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "You miss 100% of the shots you don't take. - Wayne Gretzky"
];

// Rate limiter config: max 5 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

// Middleware for rate limiting
const rateLimiterMiddleware = (req, res, next) => {
  const ip = req.ip;
  rateLimiter.consume(ip)
    .then(() => {
      next();
    })
    .catch(rejRes => {
      res.set('Retry-After', String(Math.round(rejRes.msBeforeNext / 1000)) || 1);
      res.status(429).json({
        error: `Rate limit exceeded. Try again in ${Math.round(rejRes.msBeforeNext / 1000)} seconds.`
      });
    });
};

// Logger to log client IP and response status
app.use(morgan(':remote-addr :method :url :status :response-time ms'));

// Quote endpoint with rate limiting applied
app.get('/api/quote', rateLimiterMiddleware, (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

app.listen(PORT, () => {
  console.log(`Quote API listening at http://localhost:${PORT}`);
});
