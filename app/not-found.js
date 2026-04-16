import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-4">
        <h1 className="text-6xl font-extrabold text-royal-blue mb-4">404</h1>
        <p className="text-xl text-dark-navy font-semibold mb-2">Page not found</p>
        <p className="text-dark-grey mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="px-8 py-3 bg-royal-blue text-white font-bold rounded-lg hover:bg-dark-navy transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
