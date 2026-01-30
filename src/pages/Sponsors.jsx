import { FadeIn, StaggerContainer, StaggerItem } from '../components/AnimatedSection';

const Sponsors = () => {
  const sponsors = {
    platinum: [
      { name: 'Sponsor 1', logo: 'Logo' },
      { name: 'Sponsor 2', logo: 'Logo' },
    ],
    gold: [
      { name: 'Sponsor 3', logo: 'Logo' },
      { name: 'Sponsor 4', logo: 'Logo' },
      { name: 'Sponsor 5', logo: 'Logo' },
    ],
    silver: [
      { name: 'Sponsor 6', logo: 'Logo' },
      { name: 'Sponsor 7', logo: 'Logo' },
      { name: 'Sponsor 8', logo: 'Logo' },
      { name: 'Sponsor 9', logo: 'Logo' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Our <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Sponsors</span>
          </h1>
          <p className="text-gray-300 text-center mb-16">
            Thank you to our amazing sponsors who make this event possible!
          </p>
        </FadeIn>

        {/* Platinum Sponsors */}
        <FadeIn delay={0.2}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
                Platinum Sponsors
              </span>
            </h2>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sponsors.platinum.map((sponsor, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-800 rounded-lg p-12 border-2 border-gray-300 hover:border-primary transition flex items-center justify-center h-48">
                  <span className="text-gray-400 text-2xl">{sponsor.logo}</span>
                </div>
              </StaggerItem>
            ))}
              </div>
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Gold Sponsors */}
        <FadeIn delay={0.3}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Gold Sponsors
              </span>
            </h2>
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {sponsors.gold.map((sponsor, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-800 rounded-lg p-8 border-2 border-yellow-600 hover:border-primary transition flex items-center justify-center h-36">
                  <span className="text-gray-400 text-xl">{sponsor.logo}</span>
                </div>
              </StaggerItem>
            ))}
              </div>
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Silver Sponsors */}
        <FadeIn delay={0.4}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                Silver Sponsors
              </span>
            </h2>
            <StaggerContainer staggerDelay={0.08}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sponsors.silver.map((sponsor, index) => (
              <StaggerItem key={index}>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-500 hover:border-primary transition flex items-center justify-center h-28">
                  <span className="text-gray-400">{sponsor.logo}</span>
                </div>
              </StaggerItem>
            ))}
              </div>
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* Become a Sponsor */}
        <FadeIn delay={0.5}>
          <div className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-lg p-12 text-center border border-orange-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Interested in Sponsoring?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Partner with us to support innovation and connect with talented developers. Contact us to learn about sponsorship opportunities.
          </p>
          <a
            href="mailto:sponsors@bvrit.ac.in"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Contact Us
          </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default Sponsors;
