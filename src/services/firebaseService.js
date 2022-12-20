import {storage} from '../utils/firebaseConfig';
import {ref,getDownloadURL} from "firebase/storage";


const getAvatarFromFirebase= async (avatar)=>{
    const avatarRef = ref(storage,`avatarImages/${avatar}`);
    
    var result  = await getDownloadURL(avatarRef).then((url) => {
        return url

    }).catch((error) => {
        console.log(error);
    });

    console.log(result);

    return result;
}

const getBackGroundFromFirebase= async (background)=>{

    const backgroundRef = ref(storage,`backGroundImages/${background}`);
    var result = await getDownloadURL(backgroundRef).then((url) => {
        return url
}).catch((error) => {
    console.log(error);
});

    console.log(result);
    return result;

}

const FirebaseSerive = {
    getAvatarFromFirebase,
    getBackGroundFromFirebase
};

export default FirebaseSerive