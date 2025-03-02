import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">About</h1>
        <div className="prose max-w-none">
          <p className="mb-4">
            Balad is a modern Next.js application built with clean architecture and SOLID principles.
            Our mission is to provide a scalable, maintainable, and user-friendly platform.
          </p>
          <p className="mb-4">
            We follow best practices in software development, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Clean Architecture for separation of concerns</li>
            <li>SOLID principles for maintainable code</li>
            <li>Responsive design for all devices</li>
            <li>Accessibility for all users</li>
          </ul>
        </div>
      </div>
      <Footer />
    </main>
  );
}