import React from 'react';
import "./LoadingSpinner.css"

interface LoadingSpinnerProps {
    isLoading : boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {

    return (
        <div className={`loading-spinner ${isLoading ? 'show' : ''}`}><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
    );
};

export default LoadingSpinner;
