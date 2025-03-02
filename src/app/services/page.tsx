import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

const services = [
  {
    title: "Web Development",
    description: "Modern web applications built with Next.js and React",
    icon: "💻"
  },
  {
    title: "Mobile Development",
    description: "Cross-platform mobile applications for iOS and Android",
    icon: "📱"
  },
  {
    title: "UI/UX Design",
    description: "User-centered design that focuses on usability and aesthetics",
    icon: "🎨"
  },
  {
    title: "Consulting",
    description: "Expert advice on software architecture and development practices",
    icon: "🧠"
  }
];

export default function Services() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}