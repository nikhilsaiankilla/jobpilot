import React from 'react';

const AboutSection = () => {
    return (
        <section 
            className="w-full padding text-center py-32 bg-background text-foreground"
            aria-labelledby="about-heading"
        >
            {/* Section Title */}
            <h2 
                id="about-heading" 
                className="text-3xl md:text-5xl font-semibold max-w-4xl mx-auto text-blue-500 mb-4"
            >
                Built for Job Seekers, by Job Seekers
            </h2>

            {/* Description */}
            <p 
                className="text-sm font-normal md:max-w-3xl mx-auto"
            >
                The JobPilot was created to make job hunting easier. No more messy spreadsheets or lost applications. 
                Track everything, stay organized, and improve your chances of landing the perfect job.
            </p>
        </section>
    );
};

export default AboutSection;
