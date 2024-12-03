# GeeksforGeeks Search & Recommendation Engine

A sophisticated AI-powered search and recommendation system built for GeeksforGeeks programming content, featuring hybrid machine learning algorithms, BM25 ranking, TF-IDF search, and intelligent content recommendations.

[![React](https://img.shields.io/badge/React-18.x-blue?logo=react)](g4gsearchrec/)
[![Flask](https://img.shields.io/badge/Flask-2.3.x-green?logo=flask)](flask-server/)
[![Python](https://img.shields.io/badge/Python-3.9+-green?logo=python)](flask-server/requirements.txt)
[![Machine Learning](https://img.shields.io/badge/ML-TF--IDF%20%2B%20BM25-orange)](flask-server/system.py)

## 🚀 Live Demo

> **Backend API**: Ready for deployment on Railway/Render  
> **Frontend**: Ready for deployment on Vercel/Netlify  
> **Full-Stack**: Complete search and recommendation system

## Core Features

### AI-Powered Hybrid Recommendations
- **Content Analysis (80%)**: Deep semantic understanding using full article content
- **Title Boosting (20%)**: Contextual relevance through topic matching  
- **Transparent Scoring**: Individual content/title scores with hybrid results
- **Real-time Processing**: Sub-10ms recommendation generation
- **Confidence Levels**: High/Medium/Low confidence indicators

**Algorithm Formula:**
```
Hybrid Score = (0.8 × Content Similarity) + (0.2 × Title Similarity)
```

### Advanced Search Engine
- **BM25 Ranking**: State-of-the-art probabilistic ranking algorithm
- **TF-IDF Search**: Fast text-based similarity matching with intelligent fallback
- **Real-time Results**: Sub-100ms response times with smart caching
- **Method Selection**: Choice between BM25 and TF-IDF algorithms

### Modern Web Application
- **React Frontend**: Functional components with hooks and clean architecture
- **Responsive Design**: Mobile-first approach, works on all devices
- **Professional UI**: Clean interface with intuitive user experience
- **Smart UX**: Side-panel recommendations, loading states, error handling

### System Architecture
- **Microservices Design**: Separate backend and frontend services
- **RESTful API**: Clean endpoint design with proper error handling
- **Production Features**: Caching, rate limiting, health monitoring
- **Cloud Deployment**: Scalable hosting on modern platforms

## Technical Stack

### Backend (Flask + Machine Learning)
- **Python 3.9+** with Flask web framework
- **scikit-learn** for TF-IDF vectorization and cosine similarity
- **PyTerrier** for BM25 ranking with intelligent fallback
- **pandas** for data processing and manipulation
- **Rate limiting and caching** for optimal performance

### Frontend (React)
- **React 18** with modern functional components
- **Tailwind CSS** for responsive styling
- **Fetch API** for backend communication
- **Component-based architecture** with reusable UI elements

### Data Processing
- **1,581 GeeksforGeeks articles** processed and indexed
- **CSV data pipeline** with deduplication and cleaning
- **Vector space models** for similarity computation
- **Pre-computed similarity matrices** for fast inference

## System Performance

### Response Times
- **Search**: 50-200ms (depending on BM25/TF-IDF algorithm)
- **Recommendations**: 6-15ms (hybrid algorithm)
- **Health Check**: <5ms
- **Cold Start**: 5-10 seconds (TF-IDF matrix initialization)

### Recommendation Quality
- **High Confidence**: >70% similarity (semantic + topical match)
- **Medium Confidence**: 40-70% similarity (good relevance)
- **Algorithm Transparency**: Shows content, title, and hybrid scores

### Example Results
For "Selection Sort" query:
- **Insertion Sort**: 69.05% hybrid (72.87% content + 53.76% title)
- **Bubble Sort**: 68.75% hybrid (72.49% content + 53.76% title)
- **Merge Sort**: 60.01% hybrid (67.59% content + 29.70% title)

## API Documentation

### Search Endpoint
```bash
GET /search?q=<query>&limit=<num>&method=<bm25|tfidf>

# Example
curl "http://localhost:5001/search?q=python+sorting&limit=5&method=tfidf"
```

### Recommendations Endpoint
```bash
GET /recommend?title=<title>&limit=<num>

# Example
curl "http://localhost:5001/recommend?title=Selection%20Sort&limit=3"
```

### Health Check
```bash
GET /health

# Returns system status and capabilities
{
  "status": "healthy",
  "capabilities": {
    "tfidf_search": true,
    "bm25_search": false,
    "hybrid_recommendations": true,
    "total_articles": 1581
  }
}
```

## Technical Architecture

### Project Structure
```
G4GSearchRecSys/
├── flask-server/           # Backend API
│   ├── system.py          # Main Flask application
│   └── requirements.txt   # Python dependencies
├── g4gsearchrec/          # Frontend React app
│   ├── src/components/    # React components
│   └── public/           # Static assets
├── data/                 # Article data
│   └── geeksforgeeks_articles.csv
└── README.md            # Project documentation
```

### Backend Components
- **`system.py`**: Main application with hybrid ML algorithms
- **Search Functions**: `perform_bm25_search()`, `perform_tfidf_search()`
- **Recommendation Engine**: `generate_recommendations()` with hybrid scoring
- **Caching & Rate Limiting**: Performance optimization features

### Frontend Components
- **`App.js`**: Main application component with state management
- **`SearchBar.jsx`**: Search input with real-time validation
- **`SearchResults.jsx`**: Article results with click handling
- **`Recommendations.jsx`**: ML-powered sidebar recommendations

### Machine Learning Pipeline
1. **Data Loading**: CSV processing with deduplication and cleaning
2. **Vectorization**: TF-IDF matrices for content and titles (5000 + 1000 features)
3. **Similarity Computation**: Cosine similarity matrices pre-computed
4. **Hybrid Scoring**: Weighted combination (80% content + 20% title)
5. **Real-time Inference**: Fast lookup from pre-computed similarities

## Technical Concepts

### Information Retrieval
- **BM25 Algorithm**: Probabilistic ranking function for document retrieval
- **TF-IDF Vectorization**: Term frequency-inverse document frequency weighting
- **Vector Space Models**: Mathematical representation of text documents
- **Cosine Similarity**: Measure of similarity between document vectors

### Machine Learning
- **Hybrid Recommendation System**: Multi-modal scoring approach
- **Content-Based Filtering**: Recommendations based on item features
- **Similarity Matrices**: Pre-computed relationships for fast inference
- **Transparent Scoring**: Explainable AI with visible calculation steps

### Software Engineering
- **RESTful API Design**: Clean, stateless web service architecture
- **Component Architecture**: Modular React frontend design
- **Caching Strategies**: Performance optimization techniques
- **Error Handling**: Robust system with graceful failure modes

## License

This project is created for educational and demonstration purposes.


