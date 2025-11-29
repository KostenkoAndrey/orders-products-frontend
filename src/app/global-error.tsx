'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-center p-6'>
          <div className='max-w-md space-y-4 text-center'>
            <h1 className='text-4xl font-bold text-red-600'>Something went wrong!</h1>

            <p className='text-gray-600'>{error.message || 'An unexpected error occurred'}</p>

            <button
              onClick={reset}
              className='rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700'
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
