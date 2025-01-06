import { type TelegramWebapp } from "../types/global";

// @ts-expect-error test remove
const tg: TelegramWebapp  = window?.Telegram.WebApp;
console.log('tg >>>>>>>>> ', tg);

// if (window?.Telegram?.WebApp.initData) {
//   tg = window.Telegram?.WebApp;
// }

export function useTelegram() {

  const onClose = () => {
      tg.close()
  }

  const onToggleButton = () => {
      if(tg.MainButton.isVisible) {
          tg.MainButton.hide();
      } else {
          tg.MainButton.show();
      }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  }
}