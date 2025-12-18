import React from 'react'

export default function AdminLayout({ sidebar, content }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        {sidebar}
      </div>
      <div className="lg:col-span-3">
        {content}
      </div>
    </div>
  )
}