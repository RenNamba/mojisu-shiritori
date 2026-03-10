import { useEffect, useRef } from "react";
import { GAME_STATUS } from "../constants/gameConstants";

// ゲームの状態に応じて1秒ごとにonTickを呼び出すカスタムフック
export const useInterval = (gameStatus, onTick) => {
  const intervalRef = useRef(null);
  const onTickRef = useRef(onTick);

  // onTickが変わるたびに最新の関数をrefに保存
  useEffect(() => {
    onTickRef.current = onTick;
  }, [onTick]);

  // ゲーム状態がPLAYINGのときのみインターバルをセット
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
