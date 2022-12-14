import axios from 'axios';

const REPLY_REST_API ='http://localhost:8080/api/reply';

class ReplyService{
    getReplies(postCommentID){
        return axios.get(REPLY_REST_API +"/" + postCommentID);
    }

    createReply(reply){
        return axios.post(REPLY_REST_API,reply);
    }

    updateReply(postCommentID,reply){
        return axios.put(REPLY_REST_API + "/" + postCommentID,reply);
    }
    deleteReply(postCommentID){
        return axios.delete(REPLY_REST_API + "/" + postCommentID);
    }
}

export default new ReplyService();