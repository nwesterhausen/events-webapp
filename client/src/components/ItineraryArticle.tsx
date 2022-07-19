import { Col, Row, Stack } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { ItineraryArticleData } from '../../../common/types/api';
import { ArticleTimeFromDate } from '../lib/time-funcs';
import { useAuthContext } from '../providers/Auth';
import EditMenu from './EditMenu';
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
  const [auth] = useAuthContext();
  return (
    <Stack gap={1} class='itinerary-item mt-3'>
      <Row class='align-items-center'>
        <Col md='auto'>
          <p class='fw-bold fs-4 text-info mb-0'>{props.article.title}</p>
        </Col>
        <Col>
          <EditMenu targetId={props.article.id} variant='article' />
        </Col>
      </Row>
      <strong class='ps-2'>
        {ArticleTimeFromDate(props.article.start_time)}
        {props.article.end_time ? ' - ' + ArticleTimeFromDate(props.article.end_time) : ''}
      </strong>
      <Stack gap={2}>
        <Stack direction='horizontal' gap={2}>
          <For each={props.article.action_links}>{(link) => <Link type='article_action' link={link} />}</For>
        </Stack>
        <For each={props.article.items}>{(item) => <ItineraryItem text={item.text} />}</For>
        <For each={props.article.links}>{(link) => <Link type='article' link={link} />}</For>
        <For each={props.article.setlists}>{(setlist) => <Setlist setlist={setlist} />}</For>
      </Stack>
    </Stack>
  );
};

export default ItineraryArticle;
