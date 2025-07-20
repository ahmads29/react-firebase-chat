import {
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
    ref
} from "firebase/storage";
import {
    storage
} from "./firebase";

const upload = async (file) => {
    // Use the already initialized storage instance
    // const storage = getStorage(); // Not needed, use imported 'storage'

    /** @type {any} */
    const metadata = {
        contentType: 'image/jpeg'
    };
    const date = new Date().getTime();
    const storageRef = ref(storage, `images/${date}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
                reject("Something went wrong! " + error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
}

export default upload;