
// init github

    const github = new Github();

// init UI

    const ui = new UI();

// init search input

    const searchIput = document.getElementById('searchUser');

// add event listener

    searchIput.addEventListener('keyup', (e) => {
        // get input Text
        const userText = e.target.value;

        if (userText !== ''){
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

                    github.getUserAsync(userText)
                        .then(info => {
                            if (info.userData.message === 'Not found') {
                                // Show Alert
                                ui.showAlert(`user: ${userText} not found`, 'alert alert-danger');
                                // Clear profile
                                ui.clearProfile();
                                ui.hideLoader();
                            } else {
                                // Show profile
                                ui.showProfile(info.userData);
                                ui.showRepos(info.reposData);
                            }
                        })
                        .then(() => ui.hideLoader())
                } else {
                    // Clear profile
                        ui.clearProfile();
                }
    });






// async/await

    async function getName() {
        // await
        let user = await github.getUser('element985');
        let repos = await github.getRepos(user);
        return {user, repos};
    }

    // console.log(getName(), new Date());
    //
    // getName()
    //     .then(value => console.log(value, new Date()));


    function request1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve ({
                data: 'Data',
                makeAnotherRequest: true
            }), 2000);
        });
    }

    function request2() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve ({
                data: 'Another Data'
            }), 2000);
        });
    }
    
    
    function makeRequests() {
        request1()
            .then(data => {
                if (data.makeAnotherRequest) {
                    return request2()
                            .then(moreDate => {
                                return moreDate;
                            })
                } else {
                    return data;
                }
            })
            .then(result => console.log(result));
    }

    // makeRequests();
    

    async function makeRequests2() {
        // throw new Error('Error');
        // return Promise.reject('Error');
        const data = await request1();
        if (data.makeAnotherRequest) {
            const moreDate = await request2();
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


    
    
    
    