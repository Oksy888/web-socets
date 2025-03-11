//Example with 2 websockets

//
//  import { isAxiosError } from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useState, useEffect, memo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useGlobalStore } from "../../../globalStore";
// import { useLayoutStore } from "../../../layoutStore";
// import { ApiMessage } from "../../../requests/conversation/message";
// import { ApiLLM } from "../../../requests/llm";
// import { addMessage } from "../store";
// import { useAIAuthorAnalyticStore } from "../../../pages/accountAnalytics/store/accountAnalyticAI";
// import axios from "axios";
// import { Presets } from "../../presets";
// import { v4 as uuidv4 } from "uuid";
// import { addMessageAI, useChatStoreAI } from "../storeAI";
// import { useWebSockets } from "./useWebSockets";
// import { useMediaQuery } from "@mantine/hooks";

// type Payload = Pick<ApiMessage.IPostMessagesRequest, "conversationId" | "text" | "date">;

// export const getUserInfo = async (link: string) => {
//   return await axios.get(link, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("BEARER_TOKEN")}`,
//     },
//   });
// };
// const userRegion = navigator.language;

// export const useSendMessageAI = ({
//   setIsLoadingNewMessages,
// }: {
//   setIsLoadingNewMessages: (isLoading: boolean) => void;
// }) => {
//   const [newCopilotOpen, setNewCopilotOpen] = useState<boolean>(false);
//   const [firstContext, setFirstContext] = useState<string>("");
//   const {
//     sendJsonMessage: sendJsonMessageNew,
//     readyState: readyStateNew,
//     lastMessage: lastMessageNew,
//     lastJsonMessageCopilot: lastJsonMessageNewCopilot,
//     connectionStatusCopilot: connectionStatusNewCopilot,
//   } = useWebSockets({
//     WS_URL: "wss://gi-llm.gromus.io/v2/copilot/connect",
//     newCopilotOpen,
//     firstCopilotOpen: false,
//   });

//   const {
//     sendMessage: sendFirstCopilotMessage,
//     readyState: FirstCopilotReadyState,
//     lastJsonMessageCopilot: FirstCopilotlastJsonMessage,
//     lastMessage: FirstCopilotLastMessage,
//     connectionStatusCopilot: connectionStatusFirstCopilot,
//   } = useWebSockets({
//     WS_URL: "wss://gi-llm.gromus.io/v2/new_copilot/connect/",
//     newCopilotOpen: false,
//     firstCopilotOpen: !newCopilotOpen,
//   });

//   const { userInfo } = useGlobalStore();
//   const used = useGlobalStore((state) => state.used);
//   const navigate = useNavigate();
//   const [prompt, setPrompt] = useState("");
//   const chatStoreAI = useChatStoreAI();
//   const { presetButtons, defaultButtons } = Presets();
//   const queryClient = useQueryClient();
//   const [messageQueue, setMessageQueue] = useState<string[]>([]);
//   const [isBotEnd, setIsBotEnd] = useState(false);
//   const isMobile = useMediaQuery(`(max-width: 992px)`);

//   useEffect(() => {
//     if (FirstCopilotlastJsonMessage) {
//       const Text = FirstCopilotlastJsonMessage.Text;

//       setMessageQueue((prevQueue) => {
//         const updatedQueue = [...prevQueue, Text];
//         //const allData = [...prevQueue, FirstCopilotlastJsonMessage];

//         collectMessages(FirstCopilotlastJsonMessage, updatedQueue);
//         return updatedQueue;
//       });

//       if (Text === "<|copilotend|>") {
//         setNewCopilotOpen(true);
//         setMessageQueue([]);
//         setIsBotEnd(true);
//       }
//     }
//   }, [FirstCopilotlastJsonMessage]);

//   useEffect(() => {
//     if (lastJsonMessageNewCopilot) {
//       const trimmedMessage = lastJsonMessageNewCopilot.Text;

//       setMessageQueue((prevQueue) => {
//         const updatedQueue = [...prevQueue, lastJsonMessageNewCopilot.Text];
//         //const allData = [...prevQueue, lastJsonMessageNewCopilot];
//         collectMessages(lastJsonMessageNewCopilot, updatedQueue);
//         return updatedQueue;
//       });

//       if (trimmedMessage === "<|endoftext|>") {
//         setMessageQueue([]);
//       }
//     }
//   }, [lastJsonMessageNewCopilot]);

//   async function collectMessages(data: ApiLLM.IResponse, updatedQueue: string[] | null) {
//     const date = new Date().toISOString();
//     const firstContext =
//       updatedQueue &&
//       updatedQueue.join("").split("<|copilotstart|>").length > 1 &&
//       updatedQueue.join("").split("<|copilotstart|>")[1].split("<|copilotend|>").length > 0
//         ? updatedQueue.join("").split("<|copilotstart|>")[1].split("<|copilotend|>")[0]
//         : "";

//     setFirstContext(firstContext);
//     const messageData = {
//       isCopilot: true,
//       data: data && data.Data,
//       dataType: data && data.DataType,
//       message: updatedQueue
//         ? updatedQueue
//             .join("")
//             .replace(/<\|endoftext\|>|<\|copilotstart\|>|<\|copilotend\|>/g, "")
//             .trim()
//         : "", //data?.Text.trim()  updatedQueue.join("").replace("<|endfirstcopilot|>", "").trim(),
//       date,
//     };
//     let savedMessage: ApiMessage.ISavedMessage = {
//       id: "",
//       actions: "",
//       conversationId: "",
//       isCopilotMessage: true,
//       date: "",
//       text: "",
//       data: null,
//       dataType: null,
//       raiting: 0,
//       context: "",
//     };

//     const GrouppedMsg =
//       updatedQueue &&
//       updatedQueue
//         .join("")
//         .replace(/<\|endoftext\|>|<\|copilotstart\|>|<\|copilotend\|>/g, "")
//         .trim();

//     if (data?.Text === "<|endoftext|>" || data?.Text === "<|copilotend|>") {
//       if (GrouppedMsg) {
//         savedMessage = await ApiMessage.fromCopilot({
//           conversationId: data.ConversationId,
//           date,
//           text: GrouppedMsg,
//           data: JSON.stringify(data.Data),
//           dataType: data.DataType,
//           context: data.Context,
//           actions: JSON.stringify(data.Actions),
//         });
//       }
//     }
//     if (data.Actions) {
//       savedMessage = await ApiMessage.fromCopilot({
//         conversationId: data.ConversationId,
//         date,
//         text: data.Text,
//         data: JSON.stringify(data.Data),
//         dataType: data.DataType,
//         context: data.Context,
//         actions: JSON.stringify(data.Actions),
//       });

//       if (savedMessage) {
//         queryClient.invalidateQueries({
//           queryKey: ["chatHistory"],
//         });
//       }
//     }
//     if (data.Data) {
//       savedMessage = await ApiMessage.fromCopilot({
//         conversationId: data.ConversationId,
//         date,
//         text: data.Text,
//         data: JSON.stringify(data.Data),
//         dataType: data.DataType,
//         context: data.Context,
//         actions: JSON.stringify(data.Actions),
//       });
//     }

//     if (!data.Actions) {
//       addMessageAI({
//         ...messageData,
//         //message: GrouppedMsg ?? "",
//         messageId: uuidv4(),
//         //messageId: savedMessage?.id,
//       });
//       setIsLoadingNewMessages(false);
//     } else {
//       const buttons =
//         data.Actions?.map((el: { label?: string; link?: string }) => ({
//           label: el.label ?? "",
//           link: el.link ?? "",
//           dataType: data.DataType,
//           /*onClick: () => {
//             handleButtonClick(el.link, data.DataType);
//           },*/
//         })) ?? [];
//       addMessageAI({
//         ...messageData,
//         messageId: savedMessage.id,
//         buttons,
//       });
//       setIsLoadingNewMessages(false);
//     }
//     if (
//       (data.DataType === "HashtagsGeneral" || data.DataType === "HashtagsPersonal") &&
//       data.Data
//     ) {
//       useChatStoreAI.setState({
//         dataHashtags: data.Data,
//       });

//       //navigate("/ai-hashtags");
//     }
//     if (
//       data.DataType === "AuthorAnalytic" ||
//       (data.DataType === "AuthorAnalyticPersonal" && data.Data && Array.isArray(data.Data))
//     ) {
//       const authorAnalyticItem = data.Data.find((item: any) => item.DataType === "AuthorData").Data;
//       const authorAuthorStatesAnalytic = data.Data.find(
//         (item: any) => item.DataType === "AuthorStatesAnalytic",
//       ).Data;
//       const authorSongsUsedByAuthor = data.Data.find(
//         (item: any) => item.DataType === "SongsUsedByAuthor",
//       ).Data;

//       const authorId = authorAnalyticItem.author.authorId || "";
//       //(authorId);

//       useAIAuthorAnalyticStore.setState(() => ({
//         chatId: data.ConversationId,
//         authorId: authorId,
//         data: {
//           authorData: { ...authorAnalyticItem },
//           authorStatesAnalytic: { ...authorAuthorStatesAnalytic },
//           songsUsedByAuthor: { ...authorSongsUsedByAuthor },
//         },
//       }));

//       useChatStoreAI.setState({
//         dataAuthor: data.Data,
//       });

//       //navigate("/ai-data-my-account-analytics");
//     }

//     if (data.DataType === "SoundSearch" && data.Data) {
//       useChatStoreAI.setState({
//         data: data.Data,
//       });

//       //navigate("/ai-data");
//     }
//     if (data.DataType === "TimePost" && data.Data) {
//       useChatStoreAI.setState({
//         timePostData: data.Data,
//       });
//       //navigate("/ai-data");
//     }
//   }

//   const { mutate, isPending } = useMutation({
//     mutationFn: ({ conversationId, text }: Payload): Promise<ApiLLM.IResponse> => {
//       const user_prompt =
//         firstContext.length > 0
//           ? "<|copilotstart|> " + firstContext + "<|copilotend|>" + " <user>" + text + " </user>"
//           : text;
//       if (newCopilotOpen) {
//         const Message = {
//           user_id: userInfo.id,
//           conversation_id: conversationId,
//           user_prompt,
//           is_user_authorized_through_tiktok: false,
//           user_region: userRegion,
//           authorization: `Bearer ${localStorage.getItem("BEARER_TOKEN")}`,
//         };
//         //console.log("Message to new Chat", Message);
//         sendJsonMessageNew(Message);
//         setFirstContext("");
//         return lastMessageNew && JSON.parse(lastMessageNew.data);
//       } else {
//         const Message = {
//           user_id: userInfo.id,
//           conversation_id: conversationId,
//           user_prompt: text,
//           is_user_authorized_through_tiktok: false,
//           user_region: userRegion,
//           authorization: `Bearer ${localStorage.getItem("BEARER_TOKEN")}`,
//         };

//         sendFirstCopilotMessage(JSON.stringify(Message));
//         return FirstCopilotLastMessage && JSON.parse(FirstCopilotLastMessage.data);
//       }
//       //useGlobalStore.setState((state) => ({ used: state.used + 1 }));
//     },
//     onMutate: (data: { text: string; date: string; conversationId: string }) => {
//       setPrompt("");
//       addMessageAI({
//         messageId: "",
//         isCopilot: false,
//         message: data.text,
//         date: data.date,
//         data: null,
//         dataType: null,
//       });
//       ApiMessage.fromUser({
//         conversationId: data.conversationId,
//         date: data.date,
//         text: data.text,
//       });
//     },

//     onSettled(data, error, variables, context) {
//       if (isAxiosError(error)) {
//         if (error.response?.status === 500 || error.response?.status === 520) {
//           addMessage({
//             date: new Date().toISOString(),
//             messageId: "",
//             isCopilot: true,
//             message:
//               "Please try another request, as I was unable to process this one. I'm working on your previous request and I will provide you with the answer shortly.",
//             buttons: defaultButtons,
//           });
//         } else if (error.response?.statusText === "Unauthorized") {
//           addMessage({
//             date: new Date().toISOString(),
//             messageId: "",
//             isCopilot: true,
//             message:
//               "I noticed that you are not logged in or something happened with your authorization. In order to continue our work together , please try to log in one more time.",
//             buttons: [{ label: "Sign In", onClick: () => navigate("/auth") }],
//           });
//         } else if (error.response?.status === 403) {
//           addMessage({
//             date: new Date().toISOString(),
//             messageId: "",
//             isCopilot: true,
//             message: `You've reached the limit of interactions available under your current monthly subscription. It's been a pleasure to communicate and collaborate with you! I'll keep an eye on your music and account. If you'd like to resume immediately, consider upgrading your subscription tier. Otherwise, we can pick things up again at the beginning of next month.`,
//             buttons: [
//               ...presetButtons,
//               {
//                 label: "Switch to Menu",
//                 onClick: () =>
//                   useLayoutStore.setState({
//                     chatOpened: false,
//                     mobileNavbarOpened: isMobile && true,
//                     desktopNavbarOpened: !isMobile && true,
//                   }),
//               },
//             ],
//           });
//         } else {
//           addMessage({
//             date: new Date().toISOString(),
//             messageId: "",
//             isCopilot: true,
//             message: "Please try another request, as I was unable to process this one.",
//             buttons: defaultButtons,
//           });
//         }

//         return;
//       }
//     },
//   });

//   return {
//     send: (p: string) => {
//       const prompt = p.trim();
//       if (prompt && prompt === "first") {
//         mutate({
//           conversationId: useChatStoreAI.getState().chatId,
//           date: new Date().toISOString(),
//           text: "",
//         });
//       } else {
//         if (prompt) {
//           setIsLoadingNewMessages(true);
//           mutate({
//             conversationId: useChatStoreAI.getState().chatId,
//             date: new Date().toISOString(),
//             text: prompt,
//           });
//         }
//       }
//     },
//     messageQueue,
//     isPending,
//     prompt,
//     setPrompt,
//     readyStateNew,
//     connectionStatusFirstCopilot,
//     isBotEnd,
//   };
// };
