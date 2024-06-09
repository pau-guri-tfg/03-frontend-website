import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchSummoner } from '../utils/riotApi';

export default function Summoner() {
  const { gameName, tagLine } = useParams();
  const [summoner, setSummoner] = React.useState<Riot.Summoner.SummonerDto | null>(null);

  useEffect(() => {
    if (!gameName || !tagLine) return;

    fetchSummoner(gameName, tagLine).then(res => {
      setSummoner(res.data);
    });
  }, [gameName, tagLine])

  return (
    <div>Summoner</div>
  )
}
