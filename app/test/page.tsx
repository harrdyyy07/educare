// app/test/page.tsx
export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Tailwind is Working! 🎉</h1>
        <p className="text-2xl text-white">If you can see this styled text, Tailwind CSS is properly configured.</p>
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-red-500 p-4 rounded-lg text-white">Red</div>
          <div className="bg-green-500 p-4 rounded-lg text-white">Green</div>
          <div className="bg-blue-500 p-4 rounded-lg text-white">Blue</div>
        </div>
      </div>
    </div>
  )
}