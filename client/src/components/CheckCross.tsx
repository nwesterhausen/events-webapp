import { Component } from 'solid-js';
import { RiSystemCheckboxCircleFill, RiSystemCloseCircleFill } from 'solid-icons/ri';

const CheckCross: Component<{ check: boolean }> = (props) => {
  if (props.check) {
    return <RiSystemCheckboxCircleFill size='1rem' color='var(--bs-success)' />;
  }
  return <RiSystemCloseCircleFill size='1rem' color='var(--bs-danger)' />;
};

export default CheckCross;
