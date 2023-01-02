import rootInstance from "./utilsService/rootInstance";


const getProfile = async (userID) => {
    return await rootInstance.get("/profile/" + userID);
}

const createProfile = async (profile) => {
    return await rootInstance.post("/profile/add", profile);
}


const updateProfile = async (userID,profile) => {
    return await rootInstance.put("/profile/update/" + userID, profile);
}


const getFriendProfile = async (userID) => {
<<<<<<< HEAD
    return await rootInstance.get("/profile/friendprofile" + userID);
=======
    return await rootInstance.get("/profile/friendprofile/" + userID);
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193

}

const ProfileService = {
    getProfile,
    createProfile,
    updateProfile,
    getFriendProfile,
};
  
export default ProfileService;
