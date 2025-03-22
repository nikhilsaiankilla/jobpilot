import { FeatureType } from '@/types/type';
import React from 'react';

const Features = ({ title, description, icon: Icon }: FeatureType) => {
    return (
        <div className="w-full p-6 rounded-lg bg-secondary shadow-sm transition-all duration-300 hover:shadow-md">
            {/* Icon */}
            <div className="text-blue-500">{Icon && <Icon size={48} />}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mt-3">{title}</h3>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-400 mt-2">{description}</p>
        </div>
    );
};

export default Features;

