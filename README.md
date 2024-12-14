# CS Learning Search & Recommendation Engine

An AI-powered search and content discovery system for computer science learning materials.  
Combines **BM25 ranking**, **TF-IDF search**, and a **hybrid machine learning recommendation model** to deliver fast, relevant, and explainable results.

**Live Demo:** [https://cs-learning-search-rec.onrender.com](https://cs-learning-search-rec.onrender.com)

---

## Core Features

### Advanced Search
- **BM25 Ranking** – Probabilistic ranking for high-quality document retrieval  
- **TF-IDF Search** – Fast text similarity matching with intelligent fallback  
- **Smart Caching** – Sub-100 ms response times for most queries  
- **Algorithm Choice** – Users can select BM25 or TF-IDF methods

### Hybrid ML Recommendations
- **Content Analysis (80%)** – Semantic similarity using full article text  
- **Title Boosting (20%)** – Topical match scoring for added relevance  
- **Transparent Scoring** – Displays content score, title score, and final hybrid score  
- **Real-time Generation** – 6–15 ms recommendation latency  
- **Confidence Indicators** – High, medium, and low confidence levels

### Modern Web Application
- **React Frontend** – Responsive UI with hooks and reusable components  
- **Flask Backend** – RESTful API serving search and recommendation endpoints  
- **Microservices Design** – Frontend and backend deployed separately for scalability  
- **Production-ready Features** – Rate limiting, health checks, and error handling

---

## Technical Stack

**Backend (Flask + Python)**  
- Python 3.9+, Flask  
- scikit-learn (TF-IDF, cosine similarity)  
- PyTerrier (BM25 ranking)  
- pandas (data cleaning, preprocessing)  

**Frontend (React)**  
- React 18  
- Tailwind CSS for responsive design  
- Fetch API for backend communication  

**Data**  
- 1,581 processed and indexed CS articles  
- CSV ingestion pipeline with deduplication and cleaning  
- Pre-computed similarity matrices for fast inference  

---

## Performance

| Feature             | Latency        |
|---------------------|---------------|
| Search (BM25/TF-IDF)| 50–200 ms      |
| Recommendations     | 6–15 ms        |
| Health Check        | <5 ms          |
| Cold Start          | 5–10 s         |

---

## Example API Usage

**Search**  
```bash
GET /search?q=python+sorting&limit=5&method=tfidf
```

**Recommendations**
```bash
GET /recommend?title=Selection%20Sort&limit=3
```

**Health**
```bash
GET /health
```

---

## Architecture Overview
```
cs-learning-search-rec/
├── flask-server/         # Backend API
│   ├── system.py         # Main Flask app + ML logic
│   └── requirements.txt
├── react-frontend/       # React UI
│   ├── src/components/
│   └── public/
├── data/
│   └── geeksforgeeks_articles.csv
└── README.md
```

**Pipeline:**  
1. Load and clean article data  
2. Vectorize content & titles with TF-IDF  
3. Compute similarity matrices  
4. Serve search & recommendation results via Flask API  
5. Render responsive UI with React

---

## License
Educational and demonstration purposes only


