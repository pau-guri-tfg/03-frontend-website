import { useEffect, useState } from "react";
import ChampionCard from "../components/ChampionCard";
import Loader from "../components/Loader";
import { fetchGameEndpoint, fetchGamesByChampionEndpoint } from "../utils/gamesDatabase";

export default function ChampionList({ title = "" }: { title?: string }) {
  const [champions, setChampions] = useState<ChampionDocument[]>([]);
  const [totalGames, setTotalGames] = useState<number>(0);

  useEffect(() => {
    fetchGamesByChampionEndpoint("all", "players").then((res) => {
      setChampions(res.data);
    });
    fetchGameEndpoint("all", "gamedata").then((res) => {
      setTotalGames(res.data.length);
    });
  }, []);

  return (
    <div className='container flex flex-col gap-6'>
      {title !== "" && <h2 className='font-serif text-3xl font-semibold text-gold'>{title}</h2>}
      {champions.length > 0 ?
        <div className='flex flex-col w-full gap-3'>
          {champions.map((champ, index) => <ChampionCard key={index} champion={champ} totalGames={totalGames} />)}
        </div>
        :
        <div className='flex items-center justify-center w-full h-40'>
          <div className="p-6 shadow-big bg-dark-blue rounded-3xl shadow-purple/30">
            <Loader />
          </div>
        </div>
      }
    </div>
  )
}
