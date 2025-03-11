import i18next from "i18next";

export const getPresetsCopilotButton = (send: (message: string) => void) => [
  {
    label: i18next.t("chat.button1", "What can you do?"),
    onClick: () => send(i18next.t("chat.button1", "What can you do?")),
  },
  {
    label: i18next.t("chat.button2", "Analyze my account"),
    onClick: () => send(i18next.t("chat.button2", "Analyze my account")),
  },
  {
    label: i18next.t("chat.button3", "Analyze @therock"),
    onClick: () => send(i18next.t("chat.button3")),
  },
  {
    label: i18next.t("chat.button4", "Top 5 sounds in USA?"),
    onClick: () => send(i18next.t("chat.button4")),
  },
  {
    label: i18next.t("chat.button5", "Top 5 sounds in my country?"),
    onClick: () => send(i18next.t("chat.button5", "Top 5 sounds in my country?")),
  },
  {
    label: i18next.t("chat.button6", "Top 5 sounds in category Music?"),
    onClick: () => send(i18next.t("chat.button6", "Top 5 sounds in category Music?")),
  },
  {
    label: i18next.t("chat.button7", "Top 5 hooks in category Entertainment?"),
    onClick: () => send(i18next.t("chat.button7", "Top 5 hooks in category Entertainment?")),
  },
  {
    label: i18next.t("chat.button8", "Time for posting in my country?"),
    onClick: () => send(i18next.t("chat.button8", "Time for posting in my country?")),
  },
  {
    label: i18next.t("chat.button9", "Hashtags in category Business in my country?"),
    onClick: () => send(i18next.t("chat.button9", "Hashtags in category Business in my country?")),
  },
  {
    label: i18next.t("chat.button10", "Best personalized Hashtags for me?"),
    onClick: () => send(i18next.t("chat.button10", "Best personalized Hashtags for me?")),
  },
];
