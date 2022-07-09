import { OverlayTrigger, Tooltip } from 'solid-bootstrap';
import { Component } from 'solid-js';
import UGLogo from '../UltimateGuitarIcon.svg';

const TabLink: Component<{ href: string }> = (props) => {
  const hiddenId = Math.floor(100 * Math.random());
  return (
    <OverlayTrigger overlay={<Tooltip id={'guitar-tab' + hiddenId}>Tab on Ultimate Guitar</Tooltip>}>
      <a href={props.href} target='_blank' class='text-decoration-none'>
        <img src={UGLogo} style={{ width: '16px', height: '16px' }} />
      </a>
    </OverlayTrigger>
  );
};

export default TabLink;
