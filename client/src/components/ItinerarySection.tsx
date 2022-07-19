import { Col, Row } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { ItinerarySectionData } from '../../../common/types/api';
import { SectionDateTitle } from '../lib/time-funcs';
import { useAuthContext } from '../providers/Auth';
import EditMenu from './EditMenu';
import ItineraryArticle from './ItineraryArticle';

export type ItinerarySectionProps = {
  title?: string;
  section?: ItinerarySectionData;
};

const ItinerarySection: ParentComponent<ItinerarySectionProps> = (props) => {
  const [auth] = useAuthContext();

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
      <Row class='align-items-center'>
        <Col md='auto'>
          <span class='fs-3 text-warning itinerary-subtitle'>{SectionDateTitle(props.section.date, props.section.tod_modifier)}</span>
        </Col>
        <Col>
          <EditMenu targetId={props.section.id} variant='section' />
        </Col>
      </Row>
      <article class='itinerary-details'>
        <For each={props.section.articles}>{(article) => <ItineraryArticle article={article} />}</For>
      </article>
    </section>
  );
};

export default ItinerarySection;
