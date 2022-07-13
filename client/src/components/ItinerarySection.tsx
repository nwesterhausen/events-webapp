import { OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { TbCalendar, TbSunrise, TbX } from 'solid-icons/tb';
import { For, ParentComponent } from 'solid-js';
import { SectionDateTitle } from '../lib/time-funcs';
import { useAuthContext } from '../providers/Auth';
import { ItinerarySectionData } from '../types';
import ItineraryArticle from './ItineraryArticle';

export type ItinerarySectionProps = {
  title?: string;
  section?: ItinerarySectionData;
};

const ItinerarySection: ParentComponent<ItinerarySectionProps> = (props) => {
  const authContext = useAuthContext();

  if (props.title || !props.section) {
    return (
      <article class='itenary-section'>
        <h3 class='text-warning itenary-subtitle'>{props.title}</h3>
        <section class='itinerary-details'>{props.children}</section>
      </article>
    );
  }
  return (
    <section class='itinerary-section'>
      <div class='d-flex'>
        <h3 class='text-warning itinerary-subtitle'>{SectionDateTitle(props.section.date)}</h3>
        {authContext.auth.permissions.MODIFY_ALL ? (
          <Stack class='modify-action d-flex px-3 align-items-center' gap={2} direction='horizontal'>
            <OverlayTrigger overlay={<Tooltip>Edit Time of Day</Tooltip>}>
              <a class='action-button text-center'>
                <TbSunrise class='icon-fix' />
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Edit Date</Tooltip>}>
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
      <article class='itinerary-details'>
        <For each={props.section.articles}>{(article) => <ItineraryArticle article={article} />}</For>
      </article>
    </section>
  );
};

export default ItinerarySection;
