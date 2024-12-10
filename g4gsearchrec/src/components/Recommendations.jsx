import React from 'react';

const Recommendations = ({ items }) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            {/* Recommendations header */}
            <div className="flex items-center mb-6">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-3" style={{backgroundColor: '#2f8d46'}}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold" style={{color: '#333333'}}>Related Content</h3>
                    <p className="text-xs mt-1" style={{color: '#333333'}}>
                        AI-curated educational materials
                    </p>
                </div>
            </div>

            {/* Recommendations list - compact design */}
            <div className="space-y-3">
                {items.map((item, index) => (
                    <a 
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block group border border-gray-100 rounded-lg p-4 transition-all duration-200 hover:bg-gray-50 cursor-pointer"
                        style={{'&:hover': {borderColor: '#eafaf1', backgroundColor: '#eafaf1'}}}
                        title={`Visit: ${item.title}`}
                    >
                        {/* Recommendation rank and similarity */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center mr-2" style={{backgroundColor: '#eafaf1'}}>
                                    <span className="text-xs font-bold" style={{color: '#2f8d46'}}>#{index + 1}</span>
                                </div>
                                {item.similarity_score && (
                                    <div className="bg-gray-100 px-2 py-1 rounded-full">
                                        <span className="text-xs font-medium" style={{color: '#333333'}}>
                                            {(item.similarity_score * 100).toFixed(0)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Article title - compact */}
                        <h4 className="font-medium text-sm leading-tight group-hover:underline transition-colors mb-2" style={{color: '#333333'}}>
                            {item.title}
                        </h4>

                        {/* Simple CTA */}
                        <div className="flex items-center justify-between text-xs" style={{color: '#333333'}}>
                            <span>Continue learning</span>
                            <svg className="w-3 h-3 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#2f8d46'}}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </a>
                ))}
            </div>

            {/* Compact info footer with hybrid algorithm info */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs" style={{color: '#333333'}}>
                    <span>{items.length} related topics</span>
                    <div className="flex items-center space-x-2">
                        {items.length > 0 && items[0].method && (
                            <span className="bg-gray-100 px-2 py-1 rounded-full font-medium">
                                {items[0].method}
                            </span>
                        )}
                        {items.length > 0 && items[0].weighting && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium text-xs">
                                {items[0].weighting}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-center mt-2" style={{color: '#666666'}}>
                    Hybrid ML algorithm • Content + Title analysis
                </p>
            </div>
        </div>
    );
};

export default Recommendations;