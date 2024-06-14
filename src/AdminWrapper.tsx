import React from 'react'
import AdminSidebar from './partials/AdminSidebar'

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-screen h-screen text-black bg-gray'>
      <AdminSidebar />
      <div className='flex-1 h-full overflow-auto'>
        {children}
      </div>
    </div>
  )
}
