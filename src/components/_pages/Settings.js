import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Heading from '../titles/Heading';
import BaseButton from '../buttons/BaseButton';

const Settings = ({ dispatch, history, storeSettings }) => {
  const [settings, setSettings] = useState(storeSettings);

  const filters = [
    'normal', 'clarendon', 'gingham', 'moon', 'lark', 'reyes',
    'juno', 'slumber', 'crema', 'ludwig', 'aden', 'perpetua',
    'amaro', 'mayfair', 'rise', 'hudson', 'valencia', 'xpro2',
    'sierra', 'willow', 'lofi', 'inkwell', 'hefe', 'nashville',
    'stinson', 'vesper', 'earlybird', 'brannan', 'sutro', 'toaster',
    'walden', '1977', 'kelvin', 'maven', 'ginza', 'skyline',
    'dogpatch', 'brooklyn', 'helena', 'ashby', 'charmes',
  ];

  async function save() {
    await dispatch({
      type: 'SET_SETTINGS',
      payload: settings,
    });
    history.goBack();
  }

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
      <input type="text" value={settings.camera} onChange={e => setSettings({ ...settings, camera: e.target.value })} />
      <Heading>Ffmpeg</Heading>
      <input type="text" value={settings.ffmpeg} onChange={e => setSettings({ ...settings, ffmpeg: e.target.value })} />
      <Heading>Node-canvas</Heading>
      <input type="text" value={settings.canvas} onChange={e => setSettings({ ...settings, canvas: e.target.value })} />
      <Heading>Frames</Heading>
      <input type="text" value={settings.canvas} onChange={e => setSettings({ ...settings, canvas: e.target.value })} />
      <Heading>Filters</Heading>
      <div className={css`display: flex; flex-flow: wrap; max-width: 70vw; align-items: center;`}>
        {renderFilters()}
      </div>
      <Heading>Theme Colors</Heading>
      <div>
        <div>
          Primary Color:
          {' '}
          <input type="color" value={settings.colors.primary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, primary: e.target.value } })} />
        </div>
        <div>
          Secondary Color:
          {' '}
          <input type="color" value={settings.colors.secondary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, secondary: e.target.value } })} />
        </div>
        <div>
          Tertiary Color:
          {' '}
          <input type="color" value={settings.colors.tertiary} onChange={e => setSettings({ ...settings, colors: { ...settings.colors, tertiary: e.target.value } })} />
        </div>
      </div>
      <Heading>Text</Heading>
      <div>
        Footer text
        <input type="text" value={settings.text.footer} onChange={e => setSettings({ ...settings, text: { ...settings.text, footer: e.target.value } })} />
      </div>
      <hr className={css` margin-bottom: 80px;`} />
    </div>
  );
};

const mapStateToProps = state => ({
  storeSettings: state.settings,
});

export default connect(mapStateToProps)(Settings);
