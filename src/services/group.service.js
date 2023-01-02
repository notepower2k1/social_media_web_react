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

<<<<<<< HEAD
const updateGroup = async (id,group) => {
    return await rootInstance.put("/group/update/"+id, group);
=======
const updateGroup = async (group, groupId) => {
    return await rootInstance.put(`/group/update/${groupId}`, group);
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
}

const readTotalMembersById = async (groupId) => {
    return await rootInstance.get(`/group/${groupId}/total-member`);
}

const readGroupsUserJoined = async (userId) => {
    return await rootInstance.get(`/group/user-joined/${userId}`);
}

const readMembersProfile = async (groupId) => {
    return await rootInstance.get(`/group/${groupId}/member-profile`);
}

const GroupService = {
    readAllGroups,
    readGroupById,
    createGroup,
    deleteGroup,
    updateGroup,
    readTotalMembersById,
    readGroupsUserJoined,
    readMembersProfile
};
  
export default GroupService;