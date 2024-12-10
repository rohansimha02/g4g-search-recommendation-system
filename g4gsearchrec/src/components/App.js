import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Recommendations from './Recommendations';
import { API_ENDPOINTS, CONFIG } from '../config/api';
import '../App.css'

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [systemStatus, setSystemStatus] = useState(null);
    const [searchStats, setSearchStats] = useState(null);

    useEffect(() => {
        fetchSystemStatus();
    }, []);

    const fetchSystemStatus = async () => {
        try {
            const response = await fetch(`${API_ENDPOINTS.BASE}/health`);
            if (response.ok) {
                const status = await response.json();
                setSystemStatus(status);
            }
        } catch (error) {
            console.warn('Could not fetch system status:', error);
        }
    };

    const handleSearch = async (query) => {
        setError(null);
        setIsLoading(true);
        setRecommendations([]);
        
        try {
            const response = await fetch(
                `${API_ENDPOINTS.SEARCH}?q=${encodeURIComponent(query)}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
                }
            );
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.results) {
                throw new Error('Invalid response format from server');
            }
            
            setSearchResults(data.results);
            setSearchStats({
                query: data.query,
                totalResults: data.total_results,
                processingTime: data.processing_time,
                searchMethod: data.search_method,
                cached: data.cached
            });
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError(error.message || 'Failed to fetch search results. Please try again later.');
            setSearchResults([]);
            setSearchStats(null);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handles article clicks and fetches recommendations
     * 
     * @param {string} title - The title of the clicked article
     */
    const handleClick = async (title) => {
        try {
            // Request recommendations based on clicked article
            const response = await fetch(
                `${API_ENDPOINTS.RECOMMEND}?title=${encodeURIComponent(title)}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                    signal: AbortSignal.timeout(CONFIG.REQUEST_TIMEOUT)
                }
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setRecommendations(data.recommendations || []);
            
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendations([]);
        }
    };
    
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-green-50 to-white">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232f8d46' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
                }}></div>
                
                <div className="relative container mx-auto px-4 py-16">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{background: '#2f8d46'}}>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        <h1 className="text-5xl font-bold mb-4" style={{color: '#333333'}}>
                            GeeksforGeeks Study Assistant
                        </h1>
                        
                        <p className="text-xl mb-2 max-w-3xl mx-auto" style={{color: '#333333'}}>
                            Information Retrieval for Computer Science, Data Science, and Machine Learning Education
                        </p>
                        
                        <p className="mb-4 max-w-2xl mx-auto" style={{color: '#333333'}}>
                            Search through thousands of GeeksforGeeks programming tutorials, algorithms, and concepts with intelligent content recommendations.
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}>📚 Educational Content</span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}>💻 Programming Tutorials</span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}>🧠 Algorithm Explanations</span>
                            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}>🎯 Interview Prep</span>
                        </div>

                        {/* System Status Indicators */}
                        {systemStatus && (
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full mr-2`} style={{backgroundColor: '#2f8d46'}}></div>
                                    <span className="text-sm font-medium" style={{color: '#333333'}}>TF-IDF Search</span>
                                </div>
                                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full mr-2`} style={{backgroundColor: '#2f8d46'}}></div>
                                    <span className="text-sm font-medium" style={{color: '#333333'}}>BM25 Ranking</span>
                                </div>
                                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-200 shadow-sm">
                                    <div className={`w-2 h-2 rounded-full mr-2`} style={{backgroundColor: '#2f8d46'}}></div>
                                    <span className="text-sm font-medium" style={{color: '#333333'}}>ML Recommendations</span>
                                </div>
                            </div>
                        )}

                        {/* Technical Features */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#eafaf1'}}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#2f8d46'}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{color: '#333333'}}>Lightning Fast</h3>
                                <p className="text-sm" style={{color: '#333333'}}>Sub-10ms search response times with intelligent caching and optimized algorithms</p>
                            </div>
                            
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#eafaf1'}}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#2f8d46'}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{color: '#333333'}}>ML-Powered</h3>
                                <p className="text-sm" style={{color: '#333333'}}>Advanced ML algorithms including BM25, TF-IDF, and cosine similarity for precise results</p>
                            </div>
                            
                            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#eafaf1'}}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#2f8d46'}}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2" style={{color: '#333333'}}>Production Ready</h3>
                                <p className="text-sm" style={{color: '#333333'}}>Enterprise-grade architecture with rate limiting, error handling, and monitoring</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Search input component */}
                    <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                    

                </div>
            </div>
            
            {/* Results Section with Side Panel Layout */}
            <div className="container mx-auto px-4 pb-16">
                {/* Search Statistics */}
                {searchStats && (
                    <div className="max-w-6xl mx-auto mb-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between text-sm text-gray-700">
                                <span>
                                    Found <strong className="text-gray-900">{searchStats.totalResults}</strong> results for "{searchStats.query}"
                                </span>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${searchStats.searchMethod === 'BM25' ? 'bg-green-500' : 'bg-green-600'}`}></span>
                                        {searchStats.searchMethod}
                                    </span>
                                    <span>{searchStats.processingTime}s</span>
                                    {searchStats.cached && (
                                        <span className="flex items-center text-green-600">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Cached
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content Area - Split Layout */}
                <div className="max-w-6xl mx-auto">
                    <div className={`grid gap-6 transition-all duration-300 ${
                        recommendations && recommendations.length > 0 
                            ? 'lg:grid-cols-3' 
                            : 'lg:grid-cols-1'
                    }`}>
                        {/* Search Results - Takes 2/3 width when recommendations are shown */}
                        <div className={`${
                            recommendations && recommendations.length > 0 
                                ? 'lg:col-span-2' 
                                : 'lg:col-span-1'
                        }`}>
                            <SearchResults 
                                results={searchResults} 
                                onClick={handleClick} 
                                isLoading={isLoading}
                            />
                        </div>

                        {/* Recommendations Side Panel - Takes 1/3 width */}
                        {recommendations && recommendations.length > 0 && (
                            <div className="lg:col-span-1">
                                <div className="sticky top-4">
                                    <Recommendations items={recommendations} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Error message display */}
                {error && (
                    <div className="max-w-4xl mx-auto mt-6 px-4">
                        <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <p className="text-gray-600 mb-2">
                            Built with React, Flask, Python, and Machine Learning
                        </p>
                        <p className="text-sm" style={{color: '#333333'}}>
                            Portfolio Project by <span className="font-medium" style={{color: '#2f8d46'}}>Rohan Simha</span> • December 2024
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
