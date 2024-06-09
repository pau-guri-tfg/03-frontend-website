import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAccount, fetchSummoner } from '../utils/riotApi';
import SummonerHeader from '../partials/SummonerHeader';
import GameList from '../partials/GameList';

export default function Summoner() {
  const { gameName, tagLine } = useParams();
  const [correctGameName, setCorrectGameName] = useState<string>("");
  const [summoner, setSummoner] = useState<Riot.Summoner.SummonerDto | null>(null);

  useEffect(() => {
    if (!gameName || !tagLine) return;

    fetchAccount(gameName, tagLine).then(res => {
      setCorrectGameName(res.data.gameName ?? gameName);

      fetchSummoner(res.data.puuid).then(res => {
        setSummoner(res.data);
      });
    });


  }, [gameName, tagLine])

  return (
    <main className='flex flex-col gap-8 py-14'>
      <SummonerHeader summoner={summoner} gameName={correctGameName} tagLine={tagLine} />
      {summoner && <GameList summonerId={summoner.id} />}
    </main>
  )
}
