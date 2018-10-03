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
    role: 'patient',
    username: 'notoca',
    name: 'Noemi',
    password: '12345',
    uid:'3'
},
{
    role: 'technical',
    username: 'jobepo',
    name: 'Joan',
    password: '153',
    uid:'4'
} ];



const histories = localStorage.getItem('histories') || [ {
}];

const api = {
    login(username, password) {
        return users.find(user => user.username === username && user.password === password);
    },
    createUser(user){
       users.push(user);
       localStorage.setItem('users', users);
    },
    getUser() {
        
    },
    createHistory(history) {
        histories.push(history);
        localStorage.setItem('histories', histories);
    },
    getHistories() {
        //return histories.filter(item => item.name === 'patient');
    },
    getPatients() {
        return users.filter(item => item.role === 'patient')
        console.log(users);
    }
}


export default api;