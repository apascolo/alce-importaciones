const env = 'prod';

export const environment = {
  firebase: {
    apiKey: 'AIzaSyDr1nzEJo9az0xHBr5w4trekpIPcVSlG6E',
    authDomain: 'alce-importaciones.firebaseapp.com',
    projectId: 'alce-importaciones',
    storageBucket: 'alce-importaciones.appspot.com',
    messagingSenderId: '100628648620',
    appId: '1:100628648620:web:4cbf54906800f38c1f4509',
    locationId: 'us-central',
  },
  production: true,
  useEmulators: false,
  api: 'https://us-central1-alce-importaciones.cloudfunctions.net/api',
  //ALGOLIA CONFIG
  algolia: {
    appId: '546IS39Q3P',
    searchKey: 'db65a7bb4dea1607caf300a79eb90e97',
    indexes: {
      entities: `${env}_entities`,
      users: `${env}_users`,
      operations: `${env}_operations`,
      products: `${env}_products`,
    },
  },
};
