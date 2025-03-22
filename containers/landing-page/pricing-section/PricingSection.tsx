import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    { name: "Track Applications", free: true, premium: true },
    { name: "Follow-up Reminders", free: true, premium: true },
    { name: "Download to CSV", free: true, premium: true },
    { name: "AI Resume & Cover Letter", free: false, premium: true },
    { name: "Advanced Analytics", free: false, premium: true },
    { name: "Job Search Integration", free: false, premium: true },
];

export default function PricingSection() {
    return (
        <section className="container mx-auto py-12 px-6 text-center bg-background" aria-labelledby="pricing-heading">
            {/* SEO Optimized Heading */}
            <h1 id="pricing-heading" className="text-3xl font-bold mb-6 text-blue-500">
                Choose the Right Plan for You
            </h1>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" aria-labelledby="plans-heading">
                {/* Free Plan */}
                <Card className="border shadow-lg p-6" aria-labelledby="free-plan-heading">
                    <CardHeader>
                        <CardTitle id="free-plan-heading" className="text-xl font-semibold">Free Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-3xl font-bold mb-5" id="price-per-month-for-free-plan">0$ / Month</h2>
                        <p className="text-gray-700 dark:text-gray-400 mb-4">Basic tracking & reminders</p>
                        <Button variant="default" className="bg-blue-500">Start Free</Button>
                    </CardContent>
                </Card>

                {/* Premium Plan */}
                <Card className="border shadow-lg p-6 bg-blue-500 text-white" aria-labelledby="premium-plan-heading">
                    <CardHeader>
                        <CardTitle id="premium-plan-heading" className="text-xl font-semibold">Premium Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <h2 className="text-3xl font-bold mb-5" id="price-per-month-for-premium-plan">10$ / Month</h2>
                        <p className="mb-4">Unlimited tracking, AI resume & cover letter, analytics</p>
                        <Button variant="secondary" className="bg-white text-black hover:bg-transparent border-2 border-transparent hover:border-white hover:text-white">Start Free Trial</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Free vs Premium Comparison */}
            <div className="mt-12">
                <h2 id="comparison-heading" className="text-2xl text-blue-500 font-bold mb-6">
                    Free vs Premium
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {/* Free Plan Features */}
                    <Card className="border shadow-md p-6" aria-labelledby="free-features-heading">
                        <CardHeader>
                            <CardTitle id="free-features-heading" className="text-lg font-semibold">Free Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {features.map((feature, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b">
                                    <span className="text-gray-700 dark:text-gray-400">{feature.name}</span>
                                    {feature.free ? (
                                        <Check className="text-green-500" aria-label="Included in Free Plan" />
                                    ) : (
                                        <X className="text-red-500" aria-label="Not Included in Free Plan" />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Premium Plan Features */}
                    <Card className="border shadow-md p-6 text-white bg-blue-500!" aria-labelledby="premium-features-heading">
                        <CardHeader>
                            <CardTitle id="premium-features-heading" className="text-lg font-semibold">Premium Plan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {features.map((feature, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-white/30">
                                    <span>{feature.name}</span>
                                    {feature.premium ? (
                                        <Check className="text-white" aria-label="Included in Premium Plan" />
                                    ) : (
                                        <X className="text-red-300" aria-label="Not Included in Premium Plan" />
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
