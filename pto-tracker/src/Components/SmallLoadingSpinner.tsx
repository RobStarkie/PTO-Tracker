import React from 'react';
import "./SmallLoadingSpinner.css";

interface SmallLoadingSpinnerProps {
}

const SmallLoadingSpinner: React.FC<SmallLoadingSpinnerProps> = ({  }) => {
    return (
        <div className='loading-container'><div className="lds-ring-small"><div></div><div></div><div></div><div></div></div></div>
    );
};

export default SmallLoadingSpinner;
