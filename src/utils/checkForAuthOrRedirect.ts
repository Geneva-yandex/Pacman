import getUserInfo from "./api/AuthApi/getUserInfo";

type userData = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    avatar: string;
    phone: string;
};


type PromiseResolver = {
    user: userData | null,
    redirectUrl: string
}

async function checkForAuthOrRedirect(redirectUrl: string): Promise<PromiseResolver> {
    return new Promise<PromiseResolver>((resolve, reject) => {
        const rawUserString = localStorage.getItem('user');
        let user = null;
        if (rawUserString !== null) {
            user = JSON.parse(rawUserString);
        }
        if (user) {
            resolve({
                user: user,
                redirectUrl: '',
            });
        } else {
            getUserInfo()
                .then(res => {
                    if (res.status === 200) {
                        const userInfo = res.data;
                        localStorage.setItem('user', JSON.stringify(userInfo));
                        resolve({
                            user: userInfo,
                            redirectUrl: '',
                        })
                    }
                })
                .catch(() => {
                    reject({
                        user: {},
                        redirectUrl,
                    });
                });
        }
    })
}


export default checkForAuthOrRedirect;