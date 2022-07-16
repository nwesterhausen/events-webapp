import { Button, OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { FiMusic } from 'solid-icons/fi';
import { RiMapDirectionFill } from 'solid-icons/ri';
import { SiSpotify, SiYoutube } from 'solid-icons/si';
import { TbEdit, TbExternalLink, TbX } from 'solid-icons/tb';
import { Component, createMemo } from 'solid-js';
import { LinkData } from '../../../common/types/api';
import { UltimateGuitarIcon } from '../icons/UtilmateGuitar';
import { useAuthContext } from '../providers/Auth';

export type LinkComponentProps = {
  link: LinkData;
  type: 'song' | 'article' | 'article_action';
};

const Link: Component<LinkComponentProps> = (props) => {
  const [auth] = useAuthContext();
  const btnVariant = createMemo(() => {
    if (props.type === 'article') {
      return 'outline-info';
    }
    if (props.type === 'article_action') {
      return 'primary';
    }
    return 'primary';
  });
  const btnContent = createMemo(() => {
    let buttonText = '';
    switch (props.link.type) {
      case 'Navigation':
        return (
          <>
            <RiMapDirectionFill class='icon-fix' /> Directions
          </>
        );
      case 'Youtube':
        buttonText = `Listen${props.link.text ? ' to ' + props.link.text : ''}`;
        return (
          <>
            <SiYoutube class='icon-fix' /> {buttonText}
          </>
        );
      case 'Spotify':
        buttonText = `Listen${props.link.text ? ' to ' + props.link.text : ''}`;
        return (
          <>
            <SiSpotify class='icon-fix' /> {buttonText}
          </>
        );
      case 'Ultimate Guitar':
        return (
          <>
            <UltimateGuitarIcon class='icon-fix' /> Tab
          </>
        );
      case 'Generic':
        buttonText = `${props.link.text ? props.link.text : ''}`;
        return (
          <>
            <TbExternalLink class='icon-fix' /> {buttonText}
          </>
        );
      case 'No Icon':
        buttonText = `${props.link.text ? props.link.text : ''}`;
        return <>{buttonText}</>;
      case 'Music':
        buttonText = `Listen${props.link.text ? ' to ' + props.link.text : ''}`;
        return (
          <>
            <FiMusic class='icon-fix' /> {buttonText}
          </>
        );
    }
  });
  return (
    <div class='d-flex'>
      <Button variant={btnVariant()} size='sm' href={props.link.url} target='_blank'>
        {btnContent()}
      </Button>
      {auth.user.MODIFY_ALL ? (
        <Stack class='modify-action d-flex px-3 align-items-center' direction='horizontal' gap={2}>
          <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
            <a class='action-button text-center'>
              <TbEdit class='icon-fix' />
            </a>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
            <a class='action-button delete text-center'>
              <TbX class='icon-fix' />
            </a>
          </OverlayTrigger>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Link;
