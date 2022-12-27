import rootInstance from "./utilsService/rootInstance";

const readAllPosts = async () => {
    return await rootInstance.get("/post/all");
}


/* const readPostById = async (id) => {
    return await rootInstance.get("/post/" + id);
}
 */

const createPost = async (post) => {
    return await rootInstance.post("/post/add", post);
}

const deletePost = async (id) => {
    return await rootInstance.delete("/post/remove/" + id);
}

const updatePost = async (post, id) => {
    return await rootInstance.put(`/post/update/${id}`, post);
}

const readPostByUserID = async (userID) => {
    return await rootInstance.get("/post/" + userID);
}

const readEditHistoryByPostId = async (postID) => {
    return await rootInstance.get("/post/get-history/" + postID);
}

const PostService = {
    readAllPosts,
    readPostByUserID,
    readEditHistoryByPostId,
    createPost,
    updatePost,
    deletePost
};
  
export default PostService;