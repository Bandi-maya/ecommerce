'use client'
import React from 'react'

export default function RequestCallForm() {
  return (
    <section className="bg-white/90 p-6 rounded">
      <h3 className="text-lg font-semibold mb-2">Still Have an Unanswered Question?</h3>
      <p className="text-sm text-muted mb-4">Our experts are here to help you.</p>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input name="name" placeholder="Name" className="border rounded px-2 py-2 md:col-span-1" />
        <input name="phone" placeholder="Phone Number" className="border rounded px-2 py-2 md:col-span-1" />
        <button disabled className="bg-orange-500 text-white rounded px-4 py-2 md:col-span-1">Request a Call</button>
      </form>
    </section>
  )
}
