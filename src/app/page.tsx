import { ExampleComponent } from "@/components/ExampleComponent";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            File Upload Demo
          </h1>
          <p className="text-lg text-gray-600">
            A modern file upload component for Next.js applications
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6 mb-12">
          <div className="max-w-xl mx-auto">
            <ExampleComponent />
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-gray-200">
          <a
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>
    </div>
  );
}
