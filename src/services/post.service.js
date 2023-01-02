import rootInstance from "./utilsService/rootInstance";

const readAllPosts = async () => {
    return await rootInstance.get("/post/all");
}

<<<<<<< HEAD

const readPostById = async (id) => {
    return await rootInstance.get("/post/detail/" + id);
}
 
=======
const readPostById = async (id) => {
    return await rootInstance.get("/post/detail/" + id);
}
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193

const createPost = async (post) => {
    return await rootInstance.post("/post/add", post);
}

const createPostGroup = async (post,groupID) => {
    return await rootInstance.post("/post/add-post-group/"+ groupID, post);
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

const getPostByUserID = async (userID) =>{
    return await rootInstance.get("/post/" + userID);
}

const getFriendPostByUserID = async (userID) =>{
    return await rootInstance.get("/post/get-by-friend/" + userID);
}

const getPostsGroup = async (groupID) =>{
    return await rootInstance.get("/post/get-post-group/" + groupID);
}

<<<<<<< HEAD

const getYearByPost = () => {
    return rootInstance.get("/post/year-register");
  };
  
  const countPostByYear = () => {
    return rootInstance.get(`/post/count-by-year`);
  };
  
  const getMonthByPost = (year) => {
    return rootInstance.get(`/post/month-register/${year}`, {year: year});
  };
  
  const countPostByMonth = (year) => {
    return rootInstance.get(`/post/count-by-month/${year}`, {year: year});
  };
  
=======
const getYearByPost = () => {
    return rootInstance.get("/post/year-register");
};

const countPostByYear = () => {
    return rootInstance.get(`/post/count-by-year`);
};

const getMonthByPost = (year) => {
    return rootInstance.get(`/post/month-register/${year}`, {year: year});
};

const countPostByMonth = (year) => {
    return rootInstance.get(`/post/count-by-month/${year}`, {year: year});
};

>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
const PostService = {
    readPostById,
    readAllPosts,
    readPostByUserID,
    readEditHistoryByPostId,
    createPostGroup,
    createPost,
    updatePost,
    deletePost,
<<<<<<< HEAD
    getFriendPostByUserID,
    readPostById,
    getPostsGroup,
    createPostGroup,
    getYearByPost,
    countPostByYear,
    getMonthByPost,
    countPostByMonth,
=======
    getPostByUserID,
    getFriendPostByUserID,
    getPostsGroup,
    getYearByPost,
    countPostByYear,
    getMonthByPost,
    countPostByMonth
>>>>>>> 011f4c225c0dd8ea303285014bf400362909f193
};
  
export default PostService;