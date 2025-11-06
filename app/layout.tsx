import './globals.css';

export const metadata = {
  title: "Prompt Doctor",
  description: "Analyze and sanitize image-generation prompts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-gray-900">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">Prompt Doctor</h1>
            <p className="text-gray-600">Find and fix risky or model-incompatible prompt text</p>
          </header>
          {children}
          <footer className="mt-16 text-sm text-gray-500">
            Built for fast Vercel deployment.
          </footer>
        </div>
      </body>
    </html>
  );
}
