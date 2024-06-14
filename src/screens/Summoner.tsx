import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAccount, fetchSummoner } from '../utils/riotApi';
import SummonerHeader from '../partials/SummonerHeader';
import GameList from '../partials/GameList';
import SummonerKDA from '../partials/SummonerKDA';
import LiveGamePopup from '../components/LiveGamePopup';
import { registerVisit } from '../utils/visitorsDatabase';
import { PublicWrapper } from '../PublicWrapper';

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

      // visitor tracking
      registerVisit({
        screen: "summoner",
        riotIdGameName: res.data.gameName ?? gameName,
        riotIdTagLine: tagLine,
        timestamp: Date.now(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    });
  }, [gameName, tagLine])

  return (
    <PublicWrapper>
      <main className='flex flex-col gap-8 py-14'>
        <SummonerHeader summoner={summoner} gameName={correctGameName} tagLine={tagLine} />
        <SummonerKDA summoner={summoner} />
        {summoner &&
          <GameList title='Last matches' limit={5} summonerId={summoner.id} />
        }
        <LiveGamePopup />
      </main>
    </PublicWrapper>
  )
}
