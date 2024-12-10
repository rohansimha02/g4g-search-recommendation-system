import React from 'react';

const SearchResults = ({ results, onClick, isLoading }) => {
    if (isLoading) {
        return (
            <div className="w-full">
                <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse mr-3"></div>
                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                            <div className="w-3/4 h-6 bg-gray-200 rounded mb-3"></div>
                            <div className="w-1/2 h-4 bg-gray-100 rounded mb-2"></div>
                            <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Don't render component if no results are available
    if (!results || results.length === 0) {
        return null;
    }

    return (
        <div className="w-full">
            {/* Results header with icon */}
            <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{backgroundColor: '#2f8d46'}}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold" style={{color: '#333333'}}>Search Results</h2>
            </div>

            {/* Results grid */}
            <div className="space-y-4">
                {results.map((result, index) => (
                    <article 
                        key={index}
                        className="group bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-lg"
                        style={{'&:hover': {borderColor: '#2f8d46'}}}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <a 
                                    href={result.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold leading-tight hover:underline transition-colors mb-2 block cursor-pointer"
                                    style={{color: '#2f8d46'}}
                                >
                                    {result.title}
                                </a>
                                
                                {/* URL display */}
                                <p className="text-sm mb-3 break-all" style={{color: '#333333'}}>
                                    {result.url}
                                </p>
                                
                                {/* Preview content if available */}
                                {result.preview && (
                                    <p className="text-sm mb-4 line-clamp-2" style={{color: '#333333'}}>
                                        {result.preview}
                                    </p>
                                )}
                                
                                {/* Action buttons */}
                                <div className="flex items-center gap-3">
                                    <a 
                                        href={result.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                        style={{backgroundColor: '#eafaf1', color: '#2f8d46'}}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Read Article
                                    </a>
                                    
                                    <button
                                        onClick={() => onClick(result.title)}
                                        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                        style={{color: '#333333'}}
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        Get Recommendations
                                    </button>
                                </div>
                            </div>
                            
                            {/* Score indicator if available */}
                            {result.score && (
                                <div className="ml-4 flex-shrink-0">
                                    <div className="bg-gray-100 px-3 py-1 rounded-full">
                                        <span className="text-gray-700 text-xs font-medium">
                                            {result.method === 'BM25' ? '🎯' : '📊'} {result.score.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Results info */}
            <div className="mt-6 text-center">
                <p className="text-sm" style={{color: '#333333'}}>
                    Found {results.length} educational articles. 
                    <span className="font-medium" style={{color: '#2f8d46'}}> Read articles</span> to learn concepts or 
                    <span className="font-medium" style={{color: '#333333'}}> get recommendations</span> for related topics.
                </p>
            </div>
        </div>
    );
};

export default SearchResults;