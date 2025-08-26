import React from 'react'
export default function Loading() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-solid border-gray-300 border-t-transparent"></div>
    </div>
  )
}
