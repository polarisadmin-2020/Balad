import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-6">Welcome to Balad</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          A modern Next.js application built with clean architecture and SOLID principles
        </p>
        <div className="flex gap-4">
          <Button variant="primary">Get Started</Button>
          <Button variant="secondary">Learn More</Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}