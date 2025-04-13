
const StartScreen = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md ">
        <div className="flex flex-col items-center justify-center text-center">
          <img src="/image.png" alt="image" className="w-20"/>
          <h1 className="text-4xl font-bold mb-4 font-mono">Sentence Construction</h1>
          <p className="mb-6 text-lg opacity-65">
            Select the correct words to complete the sentence by arranging the words in the correct order.
          </p>
          <div className="grid grid-cols-2 mb-6">
            <div className="border-r-2 px-10">
              <h2 className="text-xl font-semibold">Time Per Question</h2>
              <p className="text-lg opacity-65">30s</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Total Questions</h2>
              <p className="text-lg opacity-65">10</p>
            </div>
          </div>
          <button 
          onClick={() => window.location.href = '/test'}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            Start Quiz
          </button>
        </div>
      </div>
    </section>
    
  )
}

export default StartScreen
