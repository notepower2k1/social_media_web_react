import rootInstance from "./utilsService/rootInstance";

const readAllGroups = async () => {
    return await rootInstance.get("/group/all");
}

const readGroupById = async (id) => {
    return await rootInstance.get("/group/" + id);
}

const createGroup = async (group) => {
    return await rootInstance.post("/group/add", group);
}

const deleteGroup = async (id) => {
    return await rootInstance.delete("/group/remove/" + id);
}

const updateGroup = async (id,group) => {
    return await rootInstance.put("/group/update/"+id, group);
}

const readTotalMembersById = async (groupId) => {
    return await rootInstance.get(`/group/${groupId}/total-member/`);
}

const readGroupsUserJoined = async (userId) => {
    return await rootInstance.get(`/group/user-joined/${userId}`);
}


const GroupService = {
    readAllGroups,
    readGroupById,
    createGroup,
    deleteGroup,
    updateGroup,
    readTotalMembersById,
    readGroupsUserJoined
};
  
export default GroupService;