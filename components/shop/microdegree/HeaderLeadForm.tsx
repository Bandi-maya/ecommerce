'use client'
import React from 'react'

export default function HeaderLeadForm() {
  return (
    <form className="request-microdegrees max-w-md w-full p-4 bg-white/90 rounded shadow">
      <h3 className="text-lg font-semibold">Choose the Best Courses for your Child !</h3>
      <div className="mt-3 grid grid-cols-1 gap-2">
        <input name="parent" placeholder="Parent Name" className="w-full border rounded px-2 py-2" />
        <input name="child" placeholder="Child Name" className="w-full border rounded px-2 py-2" />
        <div className="flex gap-2">
          <input name="phone" placeholder="Phone Number" className="flex-1 border rounded px-2 py-2" />
          <input name="email" placeholder="Email" className="w-40 border rounded px-2 py-2" />
        </div>
      </div>
      <button type="submit" disabled className="mt-3 w-full bg-orange-500 text-white rounded py-2">Talk To Us</button>
    </form>
  )
}
