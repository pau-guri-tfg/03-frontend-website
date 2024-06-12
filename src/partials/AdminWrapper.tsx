import React from 'react'

export default function AdminWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex w-screen h-screen text-black bg-gray'>
      <aside className='flex flex-col w-64 h-full border-r border-dark-gray'>
        <div className='p-3 text-xl font-semibold text-center bg-black text-gray shrink-0'>Admin Panel</div>
        <div className='flex-1 overflow-auto'>
          <nav className='flex flex-col gap-2 p-3'>
            <a href='/admin' className='underline'>Dashboard</a>
            <span className='pt-3 font-semibold'>Screens:</span>
            <a href='/admin/live' className='underline'>Live</a>
            <a href='/admin/matches' className='underline'>Matches</a>
            <a href='/admin/champions' className='underline'>Champions</a>
            <a href='/admin/summoner' className='underline'>Summoner</a>
          </nav>
        </div>
      </aside>
      <main className='flex-1 h-full overflow-auto'>
        {children}
      </main>
    </div>
  )
}
