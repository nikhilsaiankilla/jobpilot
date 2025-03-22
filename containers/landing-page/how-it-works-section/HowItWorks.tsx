import { Briefcase, Bell, UserPlus, Rocket } from "lucide-react";

const steps = [
  { id: 1, title: "Sign Up", description: "Create an account", icon: UserPlus },
  { id: 2, title: "Add Job Applications", description: "Track applications easily", icon: Briefcase },
  { id: 3, title: "Get Insights & Reminders", description: "Stay updated with automated insights.", icon: Bell },
  { id: 4, title: "Land Your Dream Job", description: "Achieve success in your career.", icon: Rocket },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-background text-foreground py-16 padding">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
        <p className="text-lg text-gray-400 mb-12">Follow these simple steps to get started.</p>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-gray-300 h-full"></div>

          {/* Steps */}
          <div className="flex flex-col gap-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
              >
                {/* Step Box */}
                <div className="bg-muted shadow-lg rounded-lg p-6 max-w-lg ml-12 md:ml-0">
                  <div className="flex flex-col gap-3 items-start">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-gray-300 text-sm mt-1">{step.description}</p>
                  </div>
                </div>

                {/* Step Indicator */}
                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white border-4 border-background shadow-md">
                  <step.icon size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
