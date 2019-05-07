

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgJ8eB7-hbsTXRHhxgzaYPKpZmitgDlik",
  authDomain: "cospedia-fae3c.firebaseapp.com",
  databaseURL: "https://cospedia-fae3c.firebaseio.com",
  projectId: "cospedia-fae3c",
  storageBucket: "cospedia-fae3c.appspot.com",
  messagingSenderId: "44656942311",
  appId: "1:44656942311:web:7081bb63aa7b0134"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// set the picture data
let addPicture = (name, imgCode)=> {
  return firebase.database().ref('works/').push({
    username: name,
    imgCode 
  })
}

let updateTime = 0;

let getAllPictures = ()=> {
  return new Promise((resolve, reject)=>{
    firebase.database().ref('/works/').on('value', (e)=>{
      //alert when update again
      updateTime++;
      if(updateTime > 1) {
        updateTime = 0;
        window.updateData();
      }

      //get all works
      let allWorks = e.val();
      resolve(allWorks)
    }, (e)=>{
      console.log('error',e)
      reject(e)
    })
  })
}

const API = {
  addPicture,
  getAllPictures
}

export default API



// firebase.database().ref('users/').set({
//   username: 'ha',
//   email: 'email',
//   profile_picture : 'imageUrl'
// });