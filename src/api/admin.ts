import axios from "axios";

const API = axios.create({ baseURL: '/api' });
API.interceptors.request.use(config => {
    if(!config.headers) config.headers = {};
    config.headers.Authorization = localStorage.getItem('s_token') || '';
    return config;
});

const AdminAPI = {
    login: credential => API.post('/admin/auth', credential),
    check: () => API.get('/admin/check'),
    funds: () => API.get('/admin/funds'),
    fund: (uid: string) => API.get('/admin/fund/' + uid),
    approve: (uid: string) => API.put('/admin/approve/' + uid),
    users: () => API.get('/admin/users'),
    deleteUser: (id: number) => API.delete('/admin/user/' + id),
    donates: () => API.get('/admin/donates'),
    setNftVerify: (enable: boolean) => API.put('/admin/setNftVerify', { nftVerify: enable }),
    counts: () => API.get('/admin/counts')
}

export default AdminAPI;