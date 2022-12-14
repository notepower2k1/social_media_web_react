import axios from 'axios';

const POST_REST_API ='http://localhost:8080/api/post';

class PostService{
    getPost(){
        return axios.get(POST_REST_API);
    }

    getPostWithUserID(userID){
        return axios.get(POST_REST_API +"/" + userID);

    }
}

export default new PostService();