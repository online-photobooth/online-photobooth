import React from 'react';

class PrivacyPage extends React.Component {
    render = () => {
        return (
            <div className="wrapper">
              <div>
                <h1>Privacy Policy Google Photos Photobooth</h1>
                <p>Welcome to the Google Photos Photobooth. If you login with your account, we will load in your shared albums. You can select or create a new album.</p> <br></br>
                <p>You can take a picture and upload it to the selected album. Then you can send a mail with the picture attached and a link to the shared album, from you gmail which you've logged in with. There's also a QR code that links to the shared album.</p> <br></br>
                <p>We do not save any of this data and it's only used in your current session.</p>
              </div>
            </div>
        )
    }
}

export default PrivacyPage;