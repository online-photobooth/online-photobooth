# Online Photobooth
> 4 April 2019

[online-photobooth.com](https://online-photobooth.netlify.app/)

The Online Photobooth is an online application that runs your photo-booth software.  
It takes pictures and stores them in your google account, inside a shared album that you have specified.  
You can let the users of your photo-booth decorate their images with frames and filters.  
There's also an option to take a GIF, which takes 4 photos in rapid succession, and combines this to an mp4.

## Server

To use a DSLR camera, make gifs and apply frames and filters, you will need to run our [server](https://github.com/online-photobooth/server) on the device you are running the website on. This can either be a raspberry pi, or a laptop with MacOS or Linux.

## Online

If you don't want to run any Servers and still make use of the Online Photobooth, you can choose to use your webcam as camera, and our online servers to convert your images.

## Separate Servers

You can also choose to only allow certain features, thus not needing all the servers in the complete package.

### Gphoto2

If you want to use a DSLR camera, you will need to run the [Gphoto2 server](https://github.com/online-photobooth/server-gphoto2).

### Filterous

If you want to use filters, you can opt in to use the online server when you start the application, or host our [Filterous Server](https://github.com/online-photobooth/server-filterous) yourself for an optimal experience.

### Ffmpeg

To create GIFS and add overlays, you need to run our [Ffmpeg Server](https://github.com/online-photobooth/server-ffmpeg) to convert images into a video sequence.  
Here you can once again choose for an online version when you are inside of the application.
