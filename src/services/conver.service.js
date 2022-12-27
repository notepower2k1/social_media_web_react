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
    return await rootInstance.post("/conversation/reply/add", conversationReply);
}

const deleteConversationReply = async (conversationID) => {
    return await rootInstance.put("/conversation/reply/remove/"+ conversationID);
}

const getLastConversationReplyID = async ()=>{
    return await rootInstance.get("/conversation/reply/getlast");

}

const getCountNewMessage = async (conversationID,senderID)=>{
    return await rootInstance.get(`/conversation/reply/countnewmessage/${conversationID}/${senderID}`);

}

const updateStatus = async (conversationID,senderID)=>{
    return await rootInstance.put(`conversation/reply/updatestatus/${conversationID}/${senderID}`);

} 

const ConversationService = {
    getAllConversation,
    getConversationBetweenUser,
    getLastConversationReply,
    createConversationReply,
    deleteConversationReply,
    getLastConversationReplyID,
    getCountNewMessage,
    updateStatus,
    
};
export default ConversationService;