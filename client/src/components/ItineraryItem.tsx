import { Component } from 'solid-js';
import { useAuthContext } from '../providers/Auth';

const ItineraryItem: Component<{ text: string }> = (props) => {
  const [auth] = useAuthContext();
  return <span>{props.text}</span>;
};

export default ItineraryItem;
