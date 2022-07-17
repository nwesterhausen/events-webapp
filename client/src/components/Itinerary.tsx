import { Stack } from 'solid-bootstrap';
import { For, ParentComponent } from 'solid-js';
import { ItineraryData } from '../../../common/types/api';
import { useAuthContext } from '../providers/Auth';
import EditMenu from './EditMenu';
import ItineraryArticle from './ItineraryArticle';
import ItinerarySection from './ItinerarySection';

const Itinerary: ParentComponent<{ itinerary?: ItineraryData }> = (props) => {
  const [auth] = useAuthContext();
  if (!props.itinerary) {
    return <Stack gap={3}>{props.children}</Stack>;
  }
  return (
    <>
      <EditMenu itinerary_id={props.itinerary.id} variant='itinerary' />
      <Stack gap={3}>
        <h2>{props.itinerary.title}</h2>
        <For each={props.itinerary.sections}>{(section) => <ItinerarySection section={section} />}</For>
      </Stack>
    </>
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
