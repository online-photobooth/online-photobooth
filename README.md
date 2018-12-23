# KDG Photobooth
A photobooth client, that takes a picture with a canon camera and uploads it to google photos.  
Best used on a raspberry pi that's running the [Photobooth Server](https://github.com/KdG-Photobooth/Server)

## Installation
git clone https://github.com/KdG-Photobooth/Photobooth.git  
cd Photobooth  
yarn install  

touch .env
```bash
REACT_APP_CLIENT_ID = get the oAuth2 client id from the console
REACT_APP_SERVER_URL = http://192.168.1.42:8888 // IP Address of the Photobooth server hosted on your Raspberry pi
```

yarn start