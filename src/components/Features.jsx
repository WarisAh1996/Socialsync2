import { FaCalendarAlt, FaChartLine, FaClock, FaMagic } from 'react-icons/fa';

const features = [
  {
    name: 'Smart Scheduling',
    description: 'Schedule posts for multiple platforms with our intelligent timing optimizer.',
    icon: FaCalendarAlt,
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    name: 'Analytics Dashboard',
    description: 'Track performance across all platforms in one unified dashboard.',
    icon: FaChartLine,
    gradient: 'from-green-500 to-teal-500'
  },
  {
    name: 'Auto-Formatting',
    description: 'Seamless formatting of all social media content.',
    icon: FaMagic,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Time Zone Management',
    description: `Schedule posts according to your audience's time zones.`,
    icon: FaClock,
    gradient: 'from-orange-500 to-red-500'
  },
];

export default function Features() {
  return (
    <div id="features" className="scroll-offset py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-gray-50 to-white"></div>
      <div className="absolute -left-20 top-40 w-96 h-96 bg-primary/5 shape-blob"></div>
      <div className="absolute -right-20 bottom-20 w-80 h-80 bg-secondary/5 shape-blob"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Everything you need to manage your social media
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Streamline your social media workflow with our powerful features
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative group h-full">
                <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className={`flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r ${feature.gradient} text-white group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-600 text-center">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
