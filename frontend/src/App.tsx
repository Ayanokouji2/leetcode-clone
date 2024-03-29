import { useEffect } from 'react';
import './App.css';
// import { Landing } from './Components/Landing';
import { Signin } from './Components/SignIn';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './utils/firebase';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userAtom } from './store/atmos/users';

function App() {
    return(
        <RecoilRoot >
            <StoreApp/>
        </RecoilRoot>
    )
}

function StoreApp() {
    const [user, setUser] = useRecoilState(userAtom);

    useEffect(() => {
        onAuthStateChanged(auth, function (user) {
            if (user && user.email) {
                setUser({
                    loading: false,
                    user: {
                        email: user.email
                    }
                });
                // console.log('This is the user: ', user);
            } else {
                setUser({
                    loading: true
                });
                // console.log('There is no logged in user');
            }
        });
    }, []);

    if(user.loading){
        return <div>isLoading...!!</div>
    }
    if (!user.user) {
        return <div>{<Signin/>}</div>
    }

    return (
        <div >Current User {user.user.email}</div>
    )
    
}

export default App;
