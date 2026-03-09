import { useEffect, useRef } from "react";
import { GAME_STATUS } from "../constants/gameConstants";

export const useInterval = (gameStatus, onTick) => {
  const intervalRef = useRef(null);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (gameStatus !== GAME_STATUS.PLAYING) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      onTickRef.current();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [gameStatus]);
};
