import { Container, Stack } from 'solid-bootstrap';
import { Component, ParentComponent } from 'solid-js';

const Itenerary: ParentComponent = (props) => {
  return <Stack gap={3}>{props.children}</Stack>;
};

const IteneraryItem: ParentComponent<{ timeRange?: string; name: string }> = (props) => {
  return (
    <Stack gap={1} class='itenerary-item mt-3'>
      <p class='fw-bold fs-4 text-info mb-0'>{props.name}</p>
      {props.timeRange ? <strong class='mb-3 ps-2'>{props.timeRange}</strong> : <></>}
      <section class='text-secondary'>{props.children}</section>
    </Stack>
  );
};

const ItenerarySection: ParentComponent<{ title: string }> = (props) => {
  return (
    <article class='itenary-section'>
      <h3 class='text-warning itenary-subtitle'>{props.title}</h3>
      <section class='itenerary-details'>{props.children}</section>
    </article>
  );
};
const IteneraryTitle: ParentComponent = (props) => {
  return <h2>{props.children}</h2>;
};

export default Object.assign(Itenerary, {
  Title: IteneraryTitle,
  Section: ItenerarySection,
  Item: IteneraryItem,
});
