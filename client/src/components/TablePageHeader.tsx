import { Component, ParentComponent } from 'solid-js';

const TablePageHeader: ParentComponent = (props) => {
  return <div class='mb-3'>{props.children}</div>;
};

export default TablePageHeader;
