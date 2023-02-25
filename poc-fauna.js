const faunadb = require('faunadb');
const q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAE9LxzX-ACVQL6SsvIQhnuas74OeDKT_kG1Ftp'
});

const createContact = data => {
    return client.query(
        q.Create(
            q.Collection('contacts'),
            { data }
        )
    )
}

createContact({
    name: 'Joir Neto',
    email: 'joir@joir.com',
    title: 'dev',
}).then(res => {
    console.log(res);
})