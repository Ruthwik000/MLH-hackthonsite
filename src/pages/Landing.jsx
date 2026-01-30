import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';
import { HeroSection } from '../components/ui/HeroDitheringCard';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const Landing = () => {
  const hackathonDate = '2026-03-15T09:00:00';

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section with Dithering Effect */}
      <HeroSection />

      {/* Countdown Section */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Event Starts In
            </h2>
          </FadeIn>
          <ScaleIn delay={0.2}>
            <Countdown targetDate={hackathonDate} />
          </ScaleIn>
        </div>
      </section>

      {/* Event Highlights - Professional Version */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <FadeIn delay={0.1}>
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
                <span className="text-orange-500 font-semibold text-sm">WHY JOIN US</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Event Highlights
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Experience an unforgettable 24-hour journey of innovation, collaboration, and growth
              </p>
            </div>
          </FadeIn>

          {/* Highlight Cards */}
          <StaggerContainer staggerDelay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 - 24 Hours */}
            <StaggerItem>
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 rounded-2xl transition-all duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">24 Hours</h3>
                <p className="text-gray-400 leading-relaxed">
                  Non-stop coding marathon to build innovative solutions and bring your ideas to life
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            </StaggerItem>

            {/* Card 2 - 200+ teams */}
            <StaggerItem>
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 rounded-2xl transition-all duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">200+ teams</h3>
                <p className="text-gray-400 leading-relaxed">
                  Connect with talented developers, designers, and innovators from across the region
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            </StaggerItem>

            {/* Card 3 - Amazing Prizes */}
            <StaggerItem>
              <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 rounded-2xl transition-all duration-300"></div>
              
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-3">Amazing Prizes</h3>
                <p className="text-gray-400 leading-relaxed">
                  Win exciting prizes, swag, and recognition for your innovative projects and solutions
                </p>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            </StaggerItem>
            </div>
          </StaggerContainer>

          {/* Additional Stats Row */}
          <FadeIn delay={0.5}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                FREE
              </div>
              <div className="text-gray-400 text-sm">Registration</div>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                1-4
              </div>
              <div className="text-gray-400 text-sm">Team Size</div>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                MLH
              </div>
              <div className="text-gray-400 text-sm">Member Event</div>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                Offline
              </div>
              <div className="text-gray-400 text-sm">In-Person</div>
            </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team Size Info */}
      <section className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Team Registration
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Form teams of 1-4 members and register for free!
            </p>
          </FadeIn>
          <ScaleIn delay={0.3}>
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1-4</div>
                <div className="text-gray-400">Team Size</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">FREE</div>
                <div className="text-gray-400">Registration</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">Offline</div>
                <div className="text-gray-400">Event Mode</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">MLH</div>
                <div className="text-gray-400">Member Event</div>
              </div>
            </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Sponsors
            </h2>
          </FadeIn>
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <StaggerItem key={i}>
                <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 flex items-center justify-center h-32">
                  <span className="text-gray-500 text-lg">Sponsor Logo {i}</span>
                </div>
              </StaggerItem>
            ))}
            </div>
          </StaggerContainer>
          <FadeIn delay={0.5}>
            <div className="text-center mt-12">
            <Link
              to="/sponsors"
              className="text-primary hover:text-primary/80 font-semibold text-lg"
            >
              View All Sponsors →
            </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500/20 to-orange-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn delay={0.1}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join 200+ teams in this exciting 24-hour coding marathon!
            </p>
          </FadeIn>
          <ScaleIn delay={0.3}>
            <Link
              to="/apply"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
            >
              Register Now
            </Link>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
};

export default Landing;
