import { FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const Schedule = () => {
  const schedule = [
    { time: '09:00 AM', event: 'Registration & Check-in', day: 'Day 1' },
    { time: '10:00 AM', event: 'Opening Ceremony', day: 'Day 1' },
    { time: '11:00 AM', event: 'Hacking Begins!', day: 'Day 1' },
    { time: '01:00 PM', event: 'Lunch Break', day: 'Day 1' },
    { time: '03:00 PM', event: 'Workshop: Web Development', day: 'Day 1' },
    { time: '05:00 PM', event: 'Mentor Session', day: 'Day 1' },
    { time: '07:00 PM', event: 'Dinner Break', day: 'Day 1' },
    { time: '09:00 PM', event: 'Mini Games & Activities', day: 'Day 1' },
    { time: '12:00 AM', event: 'Midnight Snacks', day: 'Night' },
    { time: '03:00 AM', event: 'Late Night Fuel', day: 'Night' },
    { time: '07:00 AM', event: 'Breakfast', day: 'Day 2' },
    { time: '09:00 AM', event: 'Mentor Check-ins', day: 'Day 2' },
    { time: '11:00 AM', event: 'Hacking Ends - Submission Deadline', day: 'Day 2' },
    { time: '12:00 PM', event: 'Lunch Break', day: 'Day 2' },
    { time: '01:00 PM', event: 'Project Presentations Begin', day: 'Day 2' },
    { time: '04:00 PM', event: 'Judging & Deliberation', day: 'Day 2' },
    { time: '05:00 PM', event: 'Closing Ceremony & Prize Distribution', day: 'Day 2' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Event <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Schedule</span>
          </h1>
          <p className="text-gray-300 text-center mb-12">
            24 hours of non-stop innovation, learning, and fun!
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.05}>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary transition flex items-center">
              <div className="flex-shrink-0 w-32">
                <div className="text-primary font-bold text-lg">{item.time}</div>
                <div className="text-gray-500 text-sm">{item.day}</div>
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-semibold text-lg">{item.event}</h3>
              </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-4">Important Notes</h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Schedule is subject to change. Updates will be announced during the event.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>All meals and snacks are provided free of charge.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Workshops and mentor sessions are optional but highly recommended.</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">•</span>
              <span>Please be on time for the opening and closing ceremonies.</span>
            </li>
          </ul>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Schedule;
