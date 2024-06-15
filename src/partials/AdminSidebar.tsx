export default function AdminSidebar() {
  return (
    <aside className='flex flex-col w-64 h-full bg-white border-r border-dark-gray'>
      <h1 className='p-3 text-xl font-semibold text-center bg-black text-gray shrink-0'>Admin Panel</h1>
      <div className='flex-1 overflow-auto'>
        <nav className='flex flex-col gap-2 p-3'>
          <a href='/admin' className='underline'>Dashboard</a>
          <span className='pt-3 font-semibold'>Screens:</span>
          <a href='/admin/live' className='underline'>Live Match</a>
          <a href='/admin/matches' className='underline'>Matches</a>
          <a href='/admin/champions' className='underline'>Champions</a>
          <a href='/admin/summoner' className='underline'>Summoner</a>
        </nav>
      </div>
    </aside>
  )
}
