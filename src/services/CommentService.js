import axios from 'axios';

const COMMENT_REST_API ='http://localhost:8080/api/comment';

class CommentService{
    getComments(postID){
        return axios.get(COMMENT_REST_API +"/" + postID);
    }

    createComment(comment){
        return axios.post(COMMENT_REST_API,comment);
    }

    updateComment(commentID,comment){
        return axios.put(COMMENT_REST_API + "/" + commentID,comment);
    }
    deleteComments(commentID){
        return axios.delete(COMMENT_REST_API + "/" + commentID);
    }
}

export default new CommentService();