import React from 'react'

export default function Modal({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="bg-gray-900 rounded h-[550px] px-8 py-3 max-w-3xl w-full">
        <button className=" text-sm mb-2 cursor-pointer hover:font-bold" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
