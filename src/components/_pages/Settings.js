import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import axios from 'axios';
import Heading from '../titles/Heading';
import BaseButton from '../buttons/BaseButton';

const Settings = ({ dispatch, history, storeSettings }) => {
  const [settings, setSettings] = useState(storeSettings);
  const [frames, setFrames] = useState([]);

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

  async function uploadFiles() {
    const url = 'https://api.cloudinary.com/v1_1/perjor/upload';
    try {
      await Promise.all(frames.forEach((frame) => {
        axios.post(url, {
          file: frame,
          tags: 'photobooth',
        });
      }));
    } catch (error) {
      console.log('TCL: uploadFiles -> error', error);
    }
  }

  function addFile(e) {
    e.persist();
    console.log('TCL: addFile -> e', e);
    setFrames([...frames, e.target.files[0]]);
  }

  async function save() {
    uploadFiles();
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
      <Heading>Settings</Heading>
      <Heading>Formats</Heading>
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
      <Heading>Camera</Heading>
      <p className={css`margin-bottom: 10px;`}>You need the gphoto2 server running if you want to use a DSLR camera.</p>
      <BaseButton
        size="small"
        onClick={() => setSettings({ ...settings, camera: 'webcam' })}
      >
          Webcam
      </BaseButton>
      <input className={css`margin-top: 10px;`} type="text" value={settings.camera} onChange={e => setSettings({ ...settings, camera: e.target.value })} />
      <Heading>Ffmpeg Server</Heading>
      <p className={css`margin-bottom: 10px;`}>You need this to use the Gif format and to add overlays.</p>
      <input type="text" value={settings.ffmpeg} onChange={e => setSettings({ ...settings, ffmpeg: e.target.value })} />
      <Heading>Node-canvas Server</Heading>
      <p className={css`margin-bottom: 10px;`}>You need this to use the filters.</p>
      <input type="text" value={settings.canvas} onChange={e => setSettings({ ...settings, canvas: e.target.value })} />
      <Heading>Frames</Heading>
      <p className={css`margin-bottom: 10px;`}>These will be used as an overlay.</p>
      <input type="file" multiple onChange={e => addFile(e)} />
      <Heading>Filters</Heading>
      <div className={css`display: flex; flex-flow: wrap; max-width: 70vw; align-items: center;`}>
        {renderFilters()}
      </div>
      <Heading>Theme Colors</Heading>
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
      <Heading>Text</Heading>
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
