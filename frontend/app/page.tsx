import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to NextExpressAuth</h1>
      <Link href="/login" className="inline-block w-40 py-2 px-4 bg-blue-500 text-white text-center rounded hover:bg-blue-600">
        Login
      </Link>
      <Link href="/register" className="inline-block w-40 py-2 px-4 bg-orange-500 text-white text-center rounded m-2 hover:bg-orange-600">
        Register
      </Link>
      <Link href="/dashboard" className="inline-block w-40 py-2 px-4 bg-green-500 text-white text-center rounded hover:bg-green-600">
        Dashboard
      </Link>
    </div>
  );
}
