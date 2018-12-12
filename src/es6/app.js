'use strict';

// init github

var github = new Github();

// init UI

var ui = new UI();

// init search input

var searchIput = document.getElementById('searchUser');

// add event listener

searchIput.addEventListener('keyup', function (e) {
    // get input Text
    var userText = e.target.value;

    if (userText !== '') {
        ui.showLoader();
        // Make http request
        //     github.getUser(userText)
        //         .then(user => {
        //             if (user.message === 'Not Found'){
        //                 // Show Alert
        //                     ui.showAlert(`user: ${userText} not found`, 'alert alert-danger');
        //                     // Clear profile
        //                     ui.clearProfile();
        //                     ui.hideLoader();
        //             } else {
        //                 // Show profile
        //                 ui.showProfile(user);
        //                 ui.clearAlert();
        //             }
        //             return user;
        //         })
        //         .then(user => github.getRepos(user))
        //         .then(repos => ui.showRepos(repos))
        //         .then(() => ui.hideLoader())
        //         .catch(err => console.log(err));

        github.getUserAsync(userText).then(function (info) {});
    } else {
        // Clear profile
        ui.clearProfile();
    }
});

// async/await

async function getName() {
    // await
    var user = await github.getUser('element985');
    var repos = await github.getRepos(user);
    return { user: user, repos: repos };
}

// console.log(getName(), new Date());
//
// getName()
//     .then(value => console.log(value, new Date()));


function request1() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                data: 'Data',
                makeAnotherRequest: true
            });
        }, 2000);
    });
}

function request2() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return resolve({
                data: 'Another Data'
            });
        }, 2000);
    });
}

function makeRequests() {
    request1().then(function (data) {
        if (data.makeAnotherRequest) {
            return request2().then(function (moreDate) {
                return moreDate;
            });
        } else {
            return data;
        }
    }).then(function (result) {
        return console.log(result);
    });
}

// makeRequests();


async function makeRequests2() {
    // throw new Error('Error');
    // return Promise.reject('Error');
    var data = await request1();
    if (data.makeAnotherRequest) {
        var moreDate = await request2();
        return moreDate;
    } else {
        return data;
    }
}

// makeRequests2()
//         .then(rezult => console.log(rezult))
//         .catch(error => console.log(error));

// let data = '{"name": "Denis"}';
//
// try {
//     let json = JSON.parse(data);
//    if (!json.age) {
//        throw new Error('Error');
//    }
// } catch (e) {
//     console.log(e);
// } finally {
//     console.log('finally');
// }
//
//
// console.log('hello');