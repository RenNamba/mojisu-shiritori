import { CARD_ORDER } from "../constants/cards";

// 有効なカードからランダムに1枚引く
export const drawCard = (cards) => {
  const enabledCards = CARD_ORDER.filter((key) => cards[key].enabled);
  return enabledCards[Math.floor(Math.random() * enabledCards.length)];
};
