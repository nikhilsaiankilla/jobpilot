import React from "react";
import Image from "next/image";
import { TestimonialType } from "@/types/type";

const testimonials: TestimonialType[] = [
    {
        id: 1,
        name: "Sarah T.",
        text: "The JobPilot helped me land my dream job! The reminders and tracking features are game-changers.",
        rating: 3,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
    {
        id: 2,
        name: "James R.",
        text: "I love how easy it is to generate resumes & cover letters. It saved me so much time!",
        rating: 4.5,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
    {
        id: 3,
        name: "Emily K.",
        text: "Super intuitive and well-designed. It keeps my job search organized effortlessly!",
        rating: 5,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
    {
        id: 4,
        name: "Michael D.",
        text: "This app makes tracking job applications a breeze. Highly recommend!",
        rating: 5,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
    {
        id: 5,
        name: "Michael D.",
        text: "This app makes tracking job applications a breeze. Highly recommend!",
        rating: 5,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
    {
        id: 6,
        name: "Michael D.",
        text: "This app makes tracking job applications a breeze. Highly recommend!",
        rating: 5,
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoq0f1tSU2b8opZaApGh5tl2FreFb52dyo6Q&s",
    },
];

const Testimonial = () => {
    return (
        <section
            className="w-full padding py-16 bg-background text-foreground"
            aria-labelledby="testimonial-heading"
        >
            {/* Section Title */}
            <h2
                id="testimonial-heading"
                className="text-3xl font-bold text-center text-blue-500 mb-10"
            >
                What Our Users Say
            </h2>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial: TestimonialType, index: number) => (
                    <div
                        key={testimonial.id}
                        className={`bg-secondary shadow-sm transition-all duration-300 hover:shadow-md p-6 rounded-lg flex flex-col items-center`}
                    >
                        {/* User Avatar */}
                        <Image
                            src={testimonial.avatar}
                            alt={`${testimonial.name} avatar`}
                            width={80}
                            height={80}
                            className="rounded-full mb-3"
                        />

                        {/* Rating (5 stars) */}
                        <div className="flex gap-1 text-yellow-500">
                            {"⭐".repeat(testimonial.rating)}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-sm text-gray-700 dark:text-gray-400 text-center mt-3">{testimonial.text}</p>

                        {/* User Name */}
                        <span className="text-md font-semibold mt-3">{testimonial.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonial;
