import embedApi from "../lib/embedAxios";
// import api from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetChatbotConfig = (token) => {
    return useQuery({
        queryKey: ["get-chatbot-config", token], // include token so it refetches when it changes
        queryFn: async () => {                   // remove the (token) param here — it was shadowing
            const res = await embedApi.get(`/api/widget/config?token=${token}`);
            return res.data.metadata;
        },
        enabled: !!token, // don't run until token exists
    });
};