import { FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <FadeIn delay={0.1}>
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-orange-500/10 rounded-full border border-orange-500/20">
              <span className="text-orange-500 font-semibold text-sm tracking-wide">ABOUT THE EVENT</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              About{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                BVRIT Hackathon 2026
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Where innovation meets opportunity. Join us for an extraordinary 24-hour journey of creativity, collaboration, and technological excellence.
            </p>
          </div>
        </FadeIn>

        {/* Main Content Card */}
        <FadeIn delay={0.2}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 mb-8 border border-gray-700 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              What is BVRIT Hackathon?
            </h2>
            <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                BVRIT Hackathon 2026 is a premier 24-hour coding marathon that brings together over 200 talented developers, designers, and innovators to collaborate on solving real-world challenges through technology.
              </p>
              <p>
                As a proud <span className="text-orange-500 font-semibold">MLH Member Event</span>, we uphold the highest standards of hackathon organization, fostering an environment that is safe, inclusive, and inspiring for all participants. Our event is designed to push boundaries, encourage creative thinking, and build lasting connections within the tech community.
              </p>
              <p>
                Whether you're a seasoned developer or just beginning your coding journey, BVRIT Hackathon provides the perfect platform to learn, grow, and showcase your skills alongside like-minded individuals passionate about technology and innovation.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Event Details Grid */}
        <StaggerContainer staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Date & Time */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Date & Time</h3>
                  <p className="text-gray-400">March 15-16, 2026</p>
                  <p className="text-gray-500 text-sm mt-1">24 hours of continuous innovation</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Location */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Location</h3>
                  <p className="text-gray-400">BVRIT Narsapur</p>
                  <p className="text-gray-500 text-sm mt-1">College of Engineering for Women</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Duration */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Duration</h3>
                  <p className="text-gray-400">24 Hours</p>
                  <p className="text-gray-500 text-sm mt-1">Non-stop coding and innovation</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Team Size */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Team Size</h3>
                  <p className="text-gray-400">1-4 Members</p>
                  <p className="text-gray-500 text-sm mt-1">Solo or team participation</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Registration */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Registration Fee</h3>
                  <p className="text-orange-500 font-bold text-2xl">FREE</p>
                  <p className="text-gray-500 text-sm mt-1">Completely free to participate</p>
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* Mode */}
          <StaggerItem>
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500/50 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-2">Event Mode</h3>
                  <p className="text-gray-400">Offline / In-Person</p>
                  <p className="text-gray-500 text-sm mt-1">Face-to-face collaboration</p>
                </div>
              </div>
            </div>
          </StaggerItem>
        </div>
        </StaggerContainer>

        {/* What to Expect Section */}
        <FadeIn delay={0.4}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 mb-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              What to Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Exciting Challenges", desc: "Work on real-world problem statements from industry partners" },
              { title: "Expert Mentorship", desc: "Get guidance from experienced professionals and industry leaders" },
              { title: "Technical Workshops", desc: "Learn cutting-edge technologies through hands-on sessions" },
              { title: "Networking Opportunities", desc: "Connect with fellow developers, recruiters, and tech enthusiasts" },
              { title: "Free Meals & Snacks", desc: "Stay energized with complimentary food throughout the event" },
              { title: "Amazing Prizes", desc: "Win exciting prizes, swag, and recognition for your work" },
              { title: "Certificates", desc: "Receive participation certificates for all attendees" },
              { title: "Career Opportunities", desc: "Showcase your skills to potential employers and recruiters" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/50 transition-colors duration-300">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
            </div>
          </div>
        </FadeIn>

        {/* Who Can Participate */}
        <FadeIn delay={0.5}>
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
            Who Can Participate?
          </h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              This hackathon is open to <span className="text-orange-500 font-semibold">all college students</span> who are passionate about technology and innovation. Whether you're pursuing Computer Science, Engineering, Design, or any other field, if you have the drive to create and innovate, you're welcome here!
            </p>
            <p>
              We welcome participants of all skill levels – from beginners taking their first steps in coding to experienced developers looking to push their limits. Our event is designed to provide value and learning opportunities for everyone.
            </p>
            <p>
              All participants must agree to the <span className="text-orange-500 font-semibold">MLH Code of Conduct</span> to ensure a safe, respectful, and inclusive environment for everyone. We are committed to creating a harassment-free experience for all attendees.
            </p>
          </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default About;
