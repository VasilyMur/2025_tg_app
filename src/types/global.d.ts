type TelegramTheme = {
  bg_color: string;
  text_color: string;
  hint_color: string;
  link_color: string;
  button_color: string;
  button_text_color: string;
  secondary_bg_color: string;
  header_bg_color: string;
  accent_text_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  section_separator_color: string;
  subtitle_text_color: string;
  destructive_text_color: string;
 };
 
 
 type WebAppUser = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
  photo_url: string;
 };
 
 
 type WebappData = {
  user: WebAppUser;
  query_id?: string;
 };
 
 
 type TelegramHapticFeedback = {
  impactOccurred: (
    style: "light" | "medium" | "rigid" | "heavy" | "soft",
  ) => void;
  notificationOccurred: (type: "error" | "success" | "warning") => void;
 };
 
 type BottomButton = {
  isVisible?: boolean;
  hide: () => void;
  show: () => void;
  setParams(params: {
    text?: string
    color?: string
    text_color?: string
    has_shine_effect?: boolean
    position?: 'left' | 'right' | 'top' | 'bottom'
    is_active?: boolean
    is_visible?: boolean
  })
 }
 
 export type TelegramWebapp = {
  initData: string;
  initDataUnsafe: WebappData;
  version: string;
  platform: string;
  themeParams: TelegramTheme;
  headerColor: string;
  backgroundColor: string;
  sendData: (data: string) => void;
  expand: () => void;
  close: () => void;
  ready: () => boolean;
  onEvent: (eventType: 'mainButtonClicked', eventHandler: () => void) => void;
  offEvent: (eventType: 'mainButtonClicked', eventHandler: () => void) => void;
  HapticFeedback: TelegramHapticFeedback;
  MainButton: BottomButton;
 };

 
 export type Window = {
  Telegram?: {
    WebApp: TelegramWebapp;
  };
 } | null;
 
export type WeekDayName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type CalendarDay = {
  number: number, 
  active: boolean, 
  hl: boolean,
  id: string,
}
 // export const window: Window;