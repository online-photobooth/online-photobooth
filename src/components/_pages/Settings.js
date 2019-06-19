import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import Heading from '../titles/Heading';
import BaseButton from '../buttons/BaseButton';

const Settings = ({ dispatch, history, storeSettings }) => {
  const [settings, setSettings] = useState(storeSettings);
  const [selectedFrame, setSelectedFrame] = useState('');

  const filters = [
    'normal', 'clarendon', 'gingham', 'moon', 'lark', 'reyes',
    'juno', 'slumber', 'crema', 'ludwig', 'aden', 'perpetua',
    'amaro', 'mayfair', 'rise', 'hudson', 'valencia', 'xpro2',
    'sierra', 'willow', 'lofi', 'inkwell', 'hefe', 'nashville',
    'stinson', 'vesper', 'earlybird', 'brannan', 'sutro', 'toaster',
    'walden', '1977', 'kelvin', 'maven', 'ginza', 'skyline',
    'dogpatch', 'brooklyn', 'helena', 'ashby', 'charmes',
  ];

  function setFilter(filter) {
    if (settings.filters.includes(filter)) {
      setSettings({ ...settings, filters: settings.filters.filter(item => item !== filter) });
    } else {
      setSettings({ ...settings, filters: [...settings.filters, filter] });
    }
  }

  function renderFilters() {
    return filters.map(filter => (
      <BaseButton
        size="small"
        onClick={() => setFilter(filter)}
        activated={settings.filters.includes(filter)}
        key={filter}
      >
        {filter}
      </BaseButton>
    ));
  }

  function removeFrame(frameId) {
    setSettings({ ...settings, frames: settings.frames.filter(frame => frame !== frameId) });
  }

  function renderFrames() {
    return settings.frames.map(frame => (
      <div
        className={css`display: flex; flex-direction: column; margin: 5px;`}
        key={frame}
      >
        <Image
          cloudName="perjor"
          publicId={frame}
          width="200"
          height="100"
          crop="scale"
          className={css`border: 2px solid black; margin-bottom: 5px;`}
        />
        <BaseButton size="small" onClick={() => removeFrame(frame)}>Remove</BaseButton>
      </div>
    ));
  }

  async function uploadFrame(e) {
    e.preventDefault();
    const url = 'https://api.cloudinary.com/v1_1/perjor/upload';
    const uploadPreset = 'sjvk75pb';

    const data = new FormData();
    data.append('file', selectedFrame);
    data.append('upload_preset', uploadPreset);
    data.append('tags', 'photobooth');

    try {
      const resp = await axios.post(url, data);
      console.log('TCL: uploadFrame -> resp', resp);
      setSettings({ ...settings, frames: [...settings.frames, resp.data.public_id] });
      setSelectedFrame('');
    } catch (error) {
      console.log('TCL: uploadFiles -> error', error);
    }
  }

  function addFrame(e) {
    e.persist();
    setSelectedFrame(e.target.files[0]);
  }

  async function save() {
    await dispatch({
      type: 'SET_SETTINGS',
      payload: settings,
    });
    history.goBack();
  }

  return (
    <div className={css`display: flex;  flex-direction: column; align-items: center;`}>
      <div className={css`align-self: flex-end; margin: 10px;`}>
        <BaseButton
          size="small"
          onClick={() => save()}
        >
      Save
        </BaseButton>
      </div>
      <Heading type="heading--5" className="mt-8">Formats</Heading>
      <p className={css`margin-bottom: 10px;`}>Please choose at least 1 format.</p>
      <div className={css`display: flex;`}>
        <div className={css`margin-right: 10px;`}>
          <BaseButton
            size="small"
            onClick={() => setSettings({ ...settings, format: { ...settings.format, single: !settings.format.single } })}
            activated={settings.format.single}
          >
Single Picture
            {' '}
            { settings.format.single ? 'Enabled' : 'Disabled'}
          </BaseButton>
        </div>
        <BaseButton
          size="small"
          onClick={() => setSettings({ ...settings, format: { ...settings.format, gif: !settings.format.gif } })}
          activated={settings.format.gif}
        >
          Gif
          {' '}
          { settings.format.gif ? 'Enabled' : 'Disabled'}
        </BaseButton>
      </div>
      <Heading type="heading--5" className="mt-8">Camera</Heading>
      <p className={css`margin-bottom: 10px;`}>You need the gphoto2 server running if you want to use a DSLR camera.</p>
      <BaseButton
        size="small"
        onClick={() => setSettings({ ...settings, camera: 'webcam' })}
      >
          Webcam
      </BaseButton>
      <input className={css`margin-top: 10px;`} type="text" value={settings.camera} onChange={e => setSettings({ ...settings, camera: e.target.value })} />
      <Heading type="heading--5" className="mt-8">Ffmpeg Server</Heading>
      <p className={css`margin-bottom: 10px;`}>You need this to use the Gif format and to add overlays.</p>
      <BaseButton
        size="small"
        onClick={() => setSettings({ ...settings, ffmpeg: 'online' })}
      >
          Online
      </BaseButton>
      <input className={css`margin-top: 10px;`} type="text" value={settings.ffmpeg} onChange={e => setSettings({ ...settings, ffmpeg: e.target.value })} />
      <Heading type="heading--5" className="mt-8">Node-canvas Server</Heading>
      <p className={css`margin-bottom: 10px;`}>You need this to use the filters.</p>
      <BaseButton
        size="small"
        onClick={() => setSettings({ ...settings, canvas: 'online' })}
      >
          Online
      </BaseButton>
      <input className={css`margin-top: 10px;`} type="text" value={settings.canvas} onChange={e => setSettings({ ...settings, canvas: e.target.value })} />
      <Heading type="heading--5" className="mt-8">Frames</Heading>
      <p className={css`margin-bottom: 10px;`}>These will be used as an overlay.</p>
      <div className={css`display: flex;`}>
        { renderFrames() }
      </div>
      <form encType="multipart/form-data" onSubmit={e => uploadFrame(e)}>
        <input type="file" onChange={e => addFrame(e)} />
        <BaseButton size="small" type="submit">Add Frame</BaseButton>
      </form>
      <Heading type="heading--5" className="mt-8">Filters</Heading>
      <div className={css`display: flex; flex-flow: wrap; max-width: 70vw; align-items: center;`}>
        {renderFilters()}
      </div>
      <Heading type="heading--5" className="mt-8">Theme Colors</Heading>
      <div>
        <div className={css`margin-top: 5px;`}>
          Primary Color:
          {' '}
          <input type="color" value={settings.colors.primary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value } })} />
        </div>
        <div className={css`margin-top: 5px;`}>
          Secondary Color:
          {' '}
          <input type="color" value={settings.colors.secondary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, secondary: e.target.value } })} />
        </div>
        <div className={css`margin-top: 5px;`}>
          Tertiary Color:
          {' '}
          <input type="color" value={settings.colors.tertiary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, tertiary: e.target.value } })} />
        </div>
      </div>
      <Heading type="heading--5" className="mt-8">Text</Heading>
      <div>
        <span>Footer text</span>
        <p className={css`margin-bottom: 10px;`}>Here you can add a privacy statement.</p>
        <textarea value={settings.text.footer} className={css`min-height: 100px; margin-left: 10px;`} onChange={e => setSettings({ ...settings, text: { ...settings.text, footer: e.target.value } })} />
      </div>
      <hr className={css` margin-bottom: 80px;`} />
    </div>
  );
};

const mapStateToProps = state => ({
  storeSettings: state.settings,
});

export default connect(mapStateToProps)(Settings);
