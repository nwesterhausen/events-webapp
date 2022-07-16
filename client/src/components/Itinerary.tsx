import { OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { TbCalendar, TbEdit, TbX } from 'solid-icons/tb';
import { For, ParentComponent } from 'solid-js';
import { ItineraryData } from '../../../common/types/api';
import { useAuthContext } from '../providers/Auth';
import ItineraryArticle from './ItineraryArticle';
import ItinerarySection from './ItinerarySection';

const Itinerary: ParentComponent<{ itinerary?: ItineraryData }> = (props) => {
  const [auth] = useAuthContext();
  if (!props.itinerary) {
    return <Stack gap={3}>{props.children}</Stack>;
  }
  return (
    <Stack gap={3}>
      <div class='d-flex'>
        <h2>{props.itinerary.title}</h2>
        {auth.user.MODIFY_ALL ? (
          <Stack class='modify-action d-flex px-3 align-items-center' gap={2} direction='horizontal'>
            <OverlayTrigger overlay={<Tooltip>Edit Title</Tooltip>}>
              <a class='action-button text-center'>
                <TbEdit class='icon-fix' />
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Edit Dates</Tooltip>}>
              <a class='action-button text-center'>
                <TbCalendar class='icon-fix' />
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
      <For each={props.itinerary.sections}>{(section) => <ItinerarySection section={section} />}</For>
    </Stack>
  );
};

const ItineraryTitle: ParentComponent = (props) => {
  return <h2>{props.children}</h2>;
};

export default Object.assign(Itinerary, {
  Title: ItineraryTitle,
  Section: ItinerarySection,
  Article: ItineraryArticle,
});
