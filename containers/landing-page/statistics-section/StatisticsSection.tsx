const statistics = [
    { value: "10,000+", label: "Job Seekers Trust The JobPilot" },
    { value: "80%", label: "Users Get More Interview Calls" },
    { value: "50,000+", label: "Job Applications Tracked" },
  ];
  
  const StatisticsSection = () => {
    return (
      <section className="bg-background text-foreground py-16 padding">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Real Impact, Real Results
          </h2>
          <p className="text-sm text-gray-400 mb-12">
            See how The JobPilot is transforming job seekers' success.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-secondary rounded-lg py-10"
              >
                <h3 className="text-4xl font-bold text-blue-500">{stat.value}</h3>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default StatisticsSection;
  