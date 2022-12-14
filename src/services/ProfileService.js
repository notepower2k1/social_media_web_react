import axios from 'axios';

const PROFILE_REST_API ='http://localhost:8080/api/profile';

class ProfileService{
    getProfile(userID){
        return axios.get(PROFILE_REST_API +"/" + userID);
    }

    createProfile(profile){
        return axios.post(PROFILE_REST_API,profile);
    }

    updateProfile(userID,profile){
        return axios.put(PROFILE_REST_API + "/" + userID,profile);
    }
   
}

export default new ProfileService();