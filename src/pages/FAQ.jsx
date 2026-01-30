import { useState } from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Who can participate in the hackathon?',
      answer: 'All college students are welcome to participate! Whether you\'re a beginner or experienced developer, we encourage you to join.'
    },
    {
      question: 'What is the team size?',
      answer: 'Teams can have 1-4 members. You can participate solo or form a team with your friends.'
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No! Registration is completely FREE for all participants.'
    },
    {
      question: 'Do I need to have a team before registering?',
      answer: 'No, you can register individually. We\'ll help you find teammates during the event if needed.'
    },
    {
      question: 'What should I bring?',
      answer: 'Bring your laptop, charger, student ID, and enthusiasm! We\'ll provide everything else including meals, snacks, and WiFi.'
    },
    {
      question: 'Will food be provided?',
      answer: 'Yes! All meals, snacks, and beverages will be provided throughout the 24-hour event.'
    },
    {
      question: 'What if I\'m a beginner?',
      answer: 'Perfect! We welcome beginners. We\'ll have workshops, mentors, and resources to help you learn and build something amazing.'
    },
    {
      question: 'Can I start working on my project before the hackathon?',
      answer: 'No, all projects must be started during the hackathon. However, you can brainstorm ideas beforehand.'
    },
    {
      question: 'What are the judging criteria?',
      answer: 'Projects will be judged on innovation, technical complexity, design, and presentation.'
    },
    {
      question: 'What prizes can we win?',
      answer: 'We have exciting prizes for top teams, including cash prizes, gadgets, and certificates. Details will be announced soon!'
    },
    {
      question: 'Is this an MLH event?',
      answer: 'Yes! This is an MLH Member Event, which means we follow MLH\'s Code of Conduct and community guidelines.'
    },
    {
      question: 'Can I leave during the event?',
      answer: 'While we encourage you to stay for the full 24 hours, you can take breaks as needed. However, you must be present for check-in and final presentations.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Frequently Asked <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-gray-300 text-center mb-12">
            Got questions? We've got answers!
          </p>
        </FadeIn>

        <StaggerContainer staggerDelay={0.05}>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition"
              >
                <span className="text-white font-semibold pr-8">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-primary transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              )}
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <FadeIn delay={0.4}>
          <div className="mt-12 bg-gray-800 rounded-lg p-8 border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Feel free to reach out to us at{' '}
            <a href="mailto:hackathon@bvrit.ac.in" className="text-primary hover:underline">
              hackathon@bvrit.ac.in
            </a>
          </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default FAQ;
