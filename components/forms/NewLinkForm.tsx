import React from 'react'
import { Card } from '../ui/card'

export default function NewLinkForm() {
  return (
    <div>
      <Card className='p-4'>
        <h2 className='text-lg font-semibold mb-4'>Create New Link</h2>
        <form className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Link Name"
            className="w-full px-4 py-2 rounded-md bg-[#1E293B] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="url"
            placeholder="Link URL"
            className="w-full px-4 py-2 rounded-md bg-[#1E293B] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="self-start px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
          >
            Create Link
          </button>
        </form>
      </Card>
    </div>
  )
}
