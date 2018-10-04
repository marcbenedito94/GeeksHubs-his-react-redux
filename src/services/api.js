const users = JSON.parse(localStorage.getItem( 'users' )) || [ {
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



const histories =JSON.parse( localStorage.getItem('histories')) || [];
console.log('histories', histories)

const api = {
    login(username, password) {
        return users.find(user => user.username === username && user.password === password);
    },
    createUser(user){
       users.push(user);
       localStorage.setItem('users', JSON.stringify(users));
    },
    getUser() {
        
    },
    createHistory(history) {
        histories.push(history);
        localStorage.setItem('histories', JSON.stringify(histories));
    },
    getHistories() {
        return histories;
    },
    getPatients() {
        return users.filter(item => item.role === 'patient')
     
    },
    getHistory(id) {
        return histories.filter(item => item.uid === id)
       
    }
}


export default api;