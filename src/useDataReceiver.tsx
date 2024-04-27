import { useEffect, useState } from "react";
import { EventsDocument, GameData, GameEvent, GamePlayer } from "./@types/types";
import { ChangeStreamInsertDocument, ChangeStreamReplaceDocument, ChangeStreamUpdateDocument, Document } from "mongodb";
import { AxiosResponse } from "axios";
import { fetchGameEndpoint } from "./database";

export function useDataReceiver() {
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
          setEvents(response.data);
        });
    }
  }

  useEffect(() => {
    const url: string = import.meta.env.VITE_BACKEND_URL + "/database/event-stream";
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

  return { gamedata, players, events };
}