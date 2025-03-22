import Features from '@/components/Features';
import { features } from '@/data/data';
import React from 'react';

const FeatureSection = () => {
    return (
        <section 
            className="w-full padding bg-background text-foreground"
            aria-labelledby="features-heading"
        >
            {/* Section Title */}
            <h2 
                id="features-heading" 
                className="text-3xl font-bold text-primary text-center"
            >
                Why Choose The JobPilot?
            </h2>

            {/* Features Grid */}
            <div 
                className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10"
                aria-describedby="features-heading"
            >
                {features.map((feature, index) => (
                    <Features key={index} {...feature} />
                ))}
            </div>
        </section>
    );
};

export default FeatureSection;
