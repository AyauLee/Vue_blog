// 本地存储 用户token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}

// 获取用户token
export const getToken = () => {
    return localStorage.getItem('TOKEN') || '';
}

// 清除用户token
export const removeToken = () => {
    localStorage.removeItem('TOKEN');
}

// 更新uid

export const setUid = (uid) => {
    localStorage.setItem('UID', uid);
}
// 获取uid
export const getUid = () => {
    return localStorage.getItem('UID');
}
// 清除uid
export const removeUid = () => {
    localStorage.removeItem('UID');
}