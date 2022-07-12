import { For, ParentComponent } from 'solid-js';
import { SectionDateTitle } from '../lib/time-funcs';
import { ItinerarySectionData } from '../types';
import ItineraryArticle from './ItineraryArticle';

export type ItinerarySectionProps = {
  title?: string;
  section?: ItinerarySectionData;
};

const ItinerarySection: ParentComponent<ItinerarySectionProps> = (props) => {
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
      <h3 class='text-warning itinerary-subtitle'>{SectionDateTitle(props.section.date)}</h3>
      <article class='itinerary-details'>
        <For each={props.section.articles}>{(article) => <ItineraryArticle article={article} />}</For>
      </article>
    </section>
  );
};

export default ItinerarySection;
