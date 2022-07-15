import { OverlayTrigger, Stack, Tooltip } from 'solid-bootstrap';
import { BiText } from 'solid-icons/bi';
import { TbClock, TbCursorText, TbLink, TbX } from 'solid-icons/tb';
import { For, ParentComponent } from 'solid-js';
import { ArticleTimeFromDate } from '../lib/time-funcs';
import { useAuthContext } from '../providers/Auth';
import { ItineraryArticleData } from '../../../common/types/api';
import ItineraryItem from './ItineraryItem';
import Link from './Link';
import Setlist from './Setlist';

export type ItineraryArticleProps = { timeRange?: string; name?: string; items?: string[]; article?: ItineraryArticleData };

const ItineraryArticle: ParentComponent<ItineraryArticleProps> = (props) => {
  if (!props.article) {
    return (
      <Stack gap={1} class='itinerary-item mt-3'>
        <p class='fw-bold fs-4 text-info mb-0'>{props.name}</p>
        {props.timeRange ? <strong class='mb-3 ps-2'>{props.timeRange}</strong> : <></>}
        <For each={props.items}>{(item) => <p>{item}</p>}</For>
        <section>{props.children}</section>
      </Stack>
    );
  }
  const authContext = useAuthContext();
  return (
    <Stack gap={1} class='itinerary-item mt-3'>
      <div class='d-flex'>
        <p class='fw-bold fs-4 text-info mb-0'>{props.article.title}</p>
        {authContext.auth.permissions.MODIFY_ALL ? (
          <Stack class='modify-actions d-flex px-3 align-items-center' direction='horizontal' gap={2}>
            <OverlayTrigger overlay={<Tooltip>Edit Title</Tooltip>}>
              <a class='action-button text-center'>
                <TbCursorText class='icon-fix' />
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Edit Time</Tooltip>}>
              <a class='action-button text-center'>
                <TbClock class='icon-fix' />
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Add Note</Tooltip>}>
              <a class='text-decoration-none create action-button text-center'>
                <BiText class='icon-fix' />+
              </a>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip>Add Link</Tooltip>}>
              <a class='text-decoration-none create action-button text-center'>
                <TbLink class='icon-fix' />+
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
      <strong class='mb-3 ps-2'>
        {ArticleTimeFromDate(props.article.start_time)} - {ArticleTimeFromDate(props.article.end_time)}
      </strong>
      <For each={props.article.items}>{(item) => <ItineraryItem text={item.text} />}</For>
      <For each={props.article.links}>{(link) => <Link type='article' link={link} />}</For>
      <For each={props.article.setlists}>{(setlist) => <Setlist setlist={setlist} />}</For>
    </Stack>
  );
};

export default ItineraryArticle;
