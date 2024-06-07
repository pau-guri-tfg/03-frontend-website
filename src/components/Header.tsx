export default function Header() {
  return (
    <header className='w-full bg-dark-blue'>
      <div className='container flex items-center justify-center gap-10 py-6 mx-auto text-xl text-white'>
        <a href='/' className='flex items-center gap-2.5 text-purple border-b border-transparent hover:border-white'>
          <div className="w-3 h-3 rounded-full bg-purple" />
          <span>LIVE MATCH</span>
        </a>
        <a href='/matches' className='text-white border-b border-transparent hover:border-white'>MATCHES</a>
        <a href='/champions' className='text-white border-b border-transparent hover:border-white'>CHAMPIONS</a>
      </div>
    </header>
  )
}
