/**********************************************
console.log('before');
getUser((user) => {
    console.log(user);
}, 1);
console.log('after');

function getUser(calback, id) {
    console.log('get user row from database...');
    setTimeout(() => {
        calback({ id: id, githubUserName: 'inawi' });
    }, 2000);
}*/
/********************** Prmises *************************/
/*

let p1 = Promise.reject(new Error('message1'));
let p2 = Promise.reject(new Error('message'));

Promise.race([p1, p2])
    .then((res) => console.log('res', res))
    .catch((err) => console.log(err));

async function getData() {
    return Promise.resolve('data');
}

async function getMoreData(data) {
    return Promise.resolve(data + 'more data');
}

function getAll() {
    const data = await getData();
    const moreData = await getMoreData(data);
    return `All the data: data, moreData`;
}

getAll().then((all) => {
    console.log('all the data')
})*/