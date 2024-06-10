import GameList from '../partials/GameList'

export default function Matches() {
  return (
    <main className='flex flex-col gap-8 py-14'>
      <GameList title='Last 10 matches' limit={10} />
    </main>
  )
}
