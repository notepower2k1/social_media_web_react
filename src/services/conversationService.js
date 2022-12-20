import rootInstance from "./utilsService/rootInstance";


const getAllConversation = async (userID) => {
    return await rootInstance.get("/conversation/" + userID);
}


const getConversationBetweenUser = async (conversationID) => {
    return await rootInstance.get(`/conversation/reply/user/${conversationID}`);
}

const getLastConversationReply = async (conversationID) => {
    return await rootInstance.get(`/conversation/reply/${conversationID}`);

}

const createConversationReply = async (conversationReply) => {
    return await rootInstance.post("conversation/reply/add", conversationReply);
}

const deleteConversationReply = async (conversationID) => {
    return await rootInstance.delete("conversation/reply/remove/"+ conversationID);
}

const ConversationService = {
    getAllConversation,
    getConversationBetweenUser,
    getLastConversationReply,
    createConversationReply,
    deleteConversationReply
};
export default ConversationService;