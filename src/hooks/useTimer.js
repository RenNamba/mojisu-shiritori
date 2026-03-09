import { useEffect, useRef } from "react";

export const useTimer = (gameStatus, onTick) => {
  const intervalRef = useRef(null);
  const onTickRef = useRef(onTick);

  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  useEffect(() => {
    if (gameStatus !== "playing") {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      onTickRef.current();
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [gameStatus]);
};
