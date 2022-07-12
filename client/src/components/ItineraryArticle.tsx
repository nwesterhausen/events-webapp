import { Stack } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { ItenearyArticleData } from '../types';

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
      <pre>{JSON.stringify(props.article.items, null, 2)}</pre>
      <pre>{JSON.stringify(props.article.links, null, 2)}</pre>
      <pre>{JSON.stringify(props.article.setlists, null, 2)}</pre>
    </Stack>
  );
};

export default ItineraryArticle;
