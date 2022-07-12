import { Stack } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { ArticleTimeFromDate } from '../lib/time-funcs';
import { ItenearyArticleData } from '../types';
import Link from './Link';
import Setlist from './Setlist';

export type ItineraryArticleProps = { timeRange?: string; name?: string; items?: string[]; article?: ItenearyArticleData };

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
  return (
    <Stack gap={1} class='itinerary-item mt-3'>
      <p class='fw-bold fs-4 text-info mb-0'>{props.article.title}</p>
      <strong class='mb-3 ps-2'>
        {ArticleTimeFromDate(props.article.start_time)} - {ArticleTimeFromDate(props.article.end_time)}
      </strong>
      <For each={props.article.items}>{(item) => <p>{item.text}</p>}</For>
      <For each={props.article.links}>{(link) => <Link type='article' link={link} />}</For>
      <For each={props.article.setlists}>{(setlist) => <Setlist setlist={setlist} />}</For>
    </Stack>
  );
};

export default ItineraryArticle;
