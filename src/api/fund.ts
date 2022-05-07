import API from "./config";

const FundAPI = {
    create: data => API.post('/fund/create', data),
    update: data => API.put('/fund/' + data.uid, data),
    findByUid: uid => API.get('/fund/' + uid),
    overview: () => API.get('/fund/overview'),
    getMyFunds: () => API.get('/fund/my'),
    myFund: uid => API.get('/fund/my/' + uid),
    topRated: count => API.get('/fund/top_rated', { params: { count: count }}),
    search: condition => API.get('/fund/search', { params: condition }),
    photoUpload: formData => API.post('/fund/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete: uid => API.delete('/fund/' + uid),
    isNftVerify: () => API.get('/fund/isNftVerify')
}

export default FundAPI;