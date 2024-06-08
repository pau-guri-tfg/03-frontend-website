import { createContext, useEffect, useState } from "react";
import { ChangeStreamInsertDocument, ChangeStreamReplaceDocument, ChangeStreamUpdateDocument, Document } from "mongodb";
import { AxiosResponse } from "axios";
import { fetchGameEndpoint } from "./database";

import SampleGameData from "./sample_data/gamedata.json";
import SamplePlayers from "./sample_data/players.json";
import SampleEvents from "./sample_data/events.json";

type DataContextType = {
  gamedata: GameData | null;
  players: GamePlayer[] | null;
  events: GameEvent[] | null;
}
export const DataContext = createContext<DataContextType>({ gamedata: null, players: null, events: null });

export function DataReceiver({ children }: { children: React.ReactNode }) {
  const [gamedata, setGamedata] = useState<GameData | null>(null);
  const [players, setPlayers] = useState<GamePlayer[] | null>(null);
  const [events, setEvents] = useState<GameEvent[] | null>(null);

  const tryFirstTimeFetch = (gameId: string) => {
    if (gamedata === null) {
      fetchGameEndpoint(gameId, "gamedata")
        .then((response: AxiosResponse) => {
          setGamedata(response.data);
        });
    }
    if (players === null) {
      fetchGameEndpoint(gameId, "players")
        .then((response: AxiosResponse) => {
          setPlayers(response.data);
        });
    }
    if (events === null) {
      fetchGameEndpoint(gameId, "events")
        .then((response: AxiosResponse) => {
          setEvents(response.data.Events);
        });
    }
  }

  useEffect(() => {
    // sample data
    // setGamedata(SampleGameData);
    // setPlayers(SamplePlayers);
    // setEvents(SampleEvents.Events);

    const url: string = import.meta.env.VITE_BACKEND_URL + "/games/event-stream";
    const eventSource = new EventSource(url);

    eventSource.addEventListener("gamedata", (event) => {
      const changes = JSON.parse(event.data) as ChangeStreamInsertDocument<Document> | ChangeStreamUpdateDocument<Document> | ChangeStreamReplaceDocument<Document>;
      if (changes.fullDocument) {
        const gamedata = changes.fullDocument as GameData;

        console.log("gamedata", gamedata);
        setGamedata(gamedata);

        tryFirstTimeFetch(gamedata.gameId);
      }
    });

    eventSource.addEventListener("players", (event) => {
      const changes = JSON.parse(event.data) as ChangeStreamInsertDocument<Document> | ChangeStreamUpdateDocument<Document> | ChangeStreamReplaceDocument<Document>;
      if (changes.fullDocument) {
        console.log("players", changes.fullDocument);
        const player = changes.fullDocument as GamePlayer;

        tryFirstTimeFetch(player.gameId);

        if (players) {
          const newPlayers = players.map((p) => {
            if (p._id === player._id) {
              return player;
            }
            return p;
          });
          setPlayers(newPlayers);
        }
      }
    });

    eventSource.addEventListener("events", (event) => {
      const changes = JSON.parse(event.data) as ChangeStreamInsertDocument<Document> | ChangeStreamUpdateDocument<Document> | ChangeStreamReplaceDocument<Document>;
      if (changes.fullDocument) {
        const eventsDocument = changes.fullDocument as EventsDocument;
        const events = eventsDocument.Events;

        console.log("events", events);
        setEvents(events);

        tryFirstTimeFetch(eventsDocument.gameId);
      }
    });
  }, []);

  return (
    <DataContext.Provider value={{ gamedata, players, events }}>
      {children}
    </DataContext.Provider>
  )
}