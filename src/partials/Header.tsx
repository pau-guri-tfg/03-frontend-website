import { useContext } from "react";
import useBlink from "../utils/useBlink"
import { DataContext } from "../DataReceiver";

export default function Header() {
  const { lastUpdate } = useContext(DataContext);
  const liveDot = useBlink(lastUpdate > 0);
  return (
    <header className='w-full shadow-big bg-dark-blue shadow-purple/30'>
      <div className='container flex items-center justify-center gap-10 py-6 mx-auto text-xl text-white'>
        <a href='/' className='flex items-center gap-2.5 text-purple group'>
          <div ref={liveDot} className={
            "w-3 h-3 transition-colors rounded-full" +
            (lastUpdate <= 0 ?
              " border border-purple group-hover:border-gold" + (window.location.pathname === "/" ? " !border-gold" : "")
              :
              " bg-purple group-hover:bg-gold" + (window.location.pathname === "/" ? " !bg-gold" : "")
            )
          } />
          <span className={"transition-colors border-b border-transparent hover:border-gold group-hover:text-gold" + (window.location.pathname === "/" ? " !text-gold" : "")}>LIVE MATCH</span>
        </a>
        <a href='/matches' className={'text-white transition-colors border-b border-transparent hover:border-gold hover:text-gold' + (window.location.pathname === "/matches" ? " !text-gold" : "")}>MATCHES</a>
        <a href='/champions' className={'text-white transition-colors border-b border-transparent hover:border-gold hover:text-gold' + (window.location.pathname === "/champions" ? " !text-gold" : "")}>CHAMPIONS</a>
      </div>
    </header>
  )
}
