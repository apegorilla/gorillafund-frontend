import API from "./config";

const CommentAPI = {
    create: data => API.post('/comment/create', data),
}

export default CommentAPI;