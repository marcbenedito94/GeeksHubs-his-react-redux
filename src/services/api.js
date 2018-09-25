const users = localStorage.getItem( 'users' ) || [ {
    role: 'doctor',
    username: 'jupegarnica',
    name: 'Juan',
    password: '1234',
    uid:'1'
},
{
    role: 'doctor',
    username: 'mabepo',
    name: 'Marc',
    password: '123',
    uid:'2'
},
{
    role: 'doctor',
    username: 'notoca',
    name: 'Noemi',
    password: '12345',
    uid:'3'
} ];


const api = {
    login(username, password) {
        return users.find(user => user.username === username && user.password === password)
    },
    createUser(user){
       users.push(user);
       localStorage.setItem('users', users);
    }
}


export default api;