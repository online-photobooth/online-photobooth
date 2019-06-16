import React from 'react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import BaseButton from '../buttons/BaseButton';
import Heading from '../titles/Heading';

const Overview = ({
  settings, album, history,
}) => (
  <div className={
    css`
    min-height: 100vh;
  `}
  >
    <div className={css` position: absolute; top: 10px; right: 10px;`}>
      <BaseButton
        size="small"
        onClick={() => history.push('/settings')}
      >
  Settings
      </BaseButton>
    </div>
    <Heading type="heading--3">Overview</Heading>
    <div className={
      css`
      display: flex;
      justify-content: center;
      height: 60%;
    `}
    >
      <ul>
        <li>
Album:
          {' '}
          { album.title }
        </li>
        <li>
Camera server:
          {' '}
          { settings.camera }
        </li>
        <li>
Canvas Server:
          {' '}
          { settings.canvas }
        </li>
        <li>
Ffmpeg Server:
          {' '}
          { settings.ffmpeg }
        </li>
        <li>
Filters:
          {' '}
          { settings.filters.join(', ') }
        </li>
        <li>
Single Picture:
          {' '}
          { settings.format.single ? 'enabled' : 'disabled' }
        </li>
        <li>
Gif:
          {' '}
          { settings.format.gif ? 'enabled' : 'disabled' }
        </li>
        <li>
Primary color:
          {' '}
          { settings.colors.primary }
        </li>
        <li>
Secondary color:
          {' '}
          { settings.colors.secondary }
        </li>
        <li>
Tertiary color:
          {' '}
          { settings.colors.tertiary }
        </li>
        <li>
Footer text:
          {' '}
          { settings.text.footer }
        </li>
      </ul>

      <div>
        <BaseButton
          size="small"
          onClick={() => history.push('/')}
        >
Start the application!
        </BaseButton>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  settings: state.settings,
  album: state.album,
});

export default connect(mapStateToProps)(Overview);
