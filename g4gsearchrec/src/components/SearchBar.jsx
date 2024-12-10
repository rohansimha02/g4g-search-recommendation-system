import React, { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!query.trim() || isLoading) return;
        
        await onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto px-4">
            <div className="relative">
                {/* Search container with clean white design */}
                <div className={`relative bg-white border-2 rounded-2xl shadow-lg transition-all duration-300 ${
                    isFocused ? 'shadow-lg' : 'border-gray-200'
                }`} style={{borderColor: isFocused ? '#2f8d46' : '#d1d5db'}}>
                    <div className="flex items-center">
                        {/* Search icon */}
                        <div className="pl-6 pr-4">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                        {/* Search input field */}
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Search GeeksforGeeks programming content... (try 'binary search', 'dynamic programming', 'data structures')"
                            className="flex-1 py-4 pr-4 bg-transparent text-lg focus:outline-none"
                            style={{color: '#333333'}}
                            disabled={isLoading}
                        />
                        
                        {/* Submit button with exact green styling */}
                        <button
                            type="submit"
                            className={`mx-3 px-8 py-3 text-white font-semibold rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                                isLoading 
                                    ? 'opacity-70 cursor-not-allowed scale-95' 
                                    : 'hover:scale-105 hover:shadow-lg'
                            }`}
                            style={{
                                backgroundColor: isLoading ? '#6b7280' : '#2f8d46',
                                ':hover': {backgroundColor: '#008000'}
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    {/* Enhanced loading spinner */}
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Searching...</span>
                                </>
                            ) : (
                                <>
                                    <span>Search</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </div>
                </div>
                
                {/* Search suggestions/tips */}
                <div className="mt-4 text-center">
                    <p className="text-sm" style={{color: '#333333'}}>
                        <span className="inline-block px-2 py-1 rounded mr-2" style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}>🎓 Study tip:</span>
                        Search for programming concepts like "sorting algorithms", "object-oriented programming", or "system design"
                    </p>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;