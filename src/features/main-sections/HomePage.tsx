

const HomePage = () => {
  return (
<>

<div className="container mx-auto p-4">
   <div className="flex flex-wrap gap-4">
   <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">My Work</h1>
      <div className="flex space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
     
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center mb-4">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
        </svg>
        <p className="text-gray-500 text-center">Tasks and Reminders assigned to you will show here. <a href="#" className="text-blue-500">Learn more</a></p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        + Add task or reminder
      </button>
    </div>
  </div>
  <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Recents</h1>
      <div className="flex space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
     
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center mb-4">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
        </svg>
        <p className="text-gray-500 text-center">Tasks and Reminders assigned to you will show here. <a href="#" className="text-blue-500">Learn more</a></p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        + Add task or reminder
      </button>
    </div>
  </div>
  <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Spaces</h1>
      <div className="flex space-x-2">
        <button className="text-gray-500 hover:text-gray-700">
     
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
        
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
          </svg>
        </button>
      </div>
    </div>
    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg">
      <div className="flex flex-col items-center mb-4">
     
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.1 0-2 .9-2 2m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m4 0a2 2 0 11-4 0m-6 6H6m6 0h6m-6 0H6m6 0h6m-6 0H6m6 0h6" />
        </svg>
        <p className="text-gray-500 text-center">Tasks and Reminders assigned to you will show here. <a href="#" className="text-blue-500">Learn more</a></p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        + Add task or reminder
      </button>
    </div>
  </div>
   </div>
    </div>
</>
   
  )
}
export default HomePage