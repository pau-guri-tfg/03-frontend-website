export default function Header() {
  console.log(window.location.pathname);
  return (
    <header className='w-full shadow-big bg-dark-blue shadow-purple/30'>
      <div className='container flex items-center justify-center gap-10 py-6 mx-auto text-xl text-white'>
        <a href='/' className='flex items-center gap-2.5 text-purple border-b border-transparent group hover:border-gold transition'>
          <div className={"w-3 h-3 transition-colors rounded-full bg-purple group-hover:bg-gold" + (window.location.pathname === "/" ? " !bg-gold" : "")} />
          <span className={"transition-colors group-hover:text-gold" + (window.location.pathname === "/" ? " !text-gold" : "")}>LIVE MATCH</span>
        </a>
        <a href='/matches' className={'text-white transition-colors border-b border-transparent hover:border-gold hover:text-gold' + (window.location.pathname === "/matches" ? " !text-gold" : "")}>MATCHES</a>
        <a href='/champions' className={'text-white transition-colors border-b border-transparent hover:border-gold hover:text-gold' + (window.location.pathname === "/champions" ? " !text-gold" : "")}>CHAMPIONS</a>
      </div>
    </header>
  )
}
