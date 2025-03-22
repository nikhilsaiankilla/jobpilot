import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
    return (
        <header className="w-full h-[95vh] padding bg-background text-foreground flex flex-col md:flex-row gap-16 md:gap-5" aria-labelledby="hero-heading">
            {/* Left Content */}
            <div className="flex-1 flex flex-col items-start justify-center gap-5">
                <h1 id="hero-heading" className="text-4xl md:text-6xl mt-16 md:mt-0">
                    Your Ultimate Job Application Tracker
                </h1>
                <p aria-label="Hero description">
                    Stay organized, track applications, and land your dream job faster with The JobPilot.
                </p>
                <div className="flex flex-wrap gap-5">
                    <Button className="cursor-pointer bg-blue-500 text-white hover:bg-blue-700" role="button" aria-label="Get started for free">
                        Get Started for Free
                    </Button>
                    <Button variant="outline" className="cursor-pointer" role="button" aria-label="Learn more about The JobPilot">
                        Learn More
                    </Button>
                </div>
            </div>

            {/* Right Image Section */}
            <div className="flex-1 flex items-center justify-center">
                <Image
                    src="/heroImage.svg"
                    alt="Illustration of job application tracking with The JobPilot"
                    width={300}
                    height={300}
                    className="w-4/5 h-4/5 object-contain"
                    aria-hidden="true"
                />
            </div>
        </header>
    );
};

export default HeroSection;
