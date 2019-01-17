export const UserService = {
    getUserInfo,
}

function getUserInfo(){
    return fetch('/user/getUser')
        .then(res=>res.json())
        .then(data=>{ return data })
        .catch(err=>{ throw new Error(err) });
}