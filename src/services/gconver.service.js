import rootInstance from "./utilsService/rootInstance";

const readAllGroupConvers = async () => {
    return await rootInstance.get("/group-conv/all");
}

const readGroupConverById = async (id) => {
    return await rootInstance.get("/group-conv/" + id);
}

const createGroupConvers = async (groupConver) => {
    return await rootInstance.post("/group-conv/add", groupConver);
}

/* 
const deleteGroup = async (id) => {
    return await rootInstance.delete("/group-conv/remove/" + id);
}

const updateGroup = async (group, groupId) => {
    return await rootInstance.put(`/group-conv/update/${groupId}`, group);
} */

const GroupConverService = {
    readAllGroupConvers,
    readGroupConverById,
    createGroupConvers,
};
  
export default GroupConverService;