const key = "usuario";

export function getUser() {
    return JSON.parse(localStorage.getItem(key));
}

export function setUser(user) {
    localStorage.setItem(key, JSON.stringify(user));
}

export function removeUser() {
    localStorage.removeItem(key)
}
