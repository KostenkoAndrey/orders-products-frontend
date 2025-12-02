import React from 'react';

export interface SvgIconProps {
  name: string;
  className: string;
}

const SvgIcon = ({ name, className }: SvgIconProps) => {
  return (
    <svg className={`transition-all duration-700 ease-in-out ${className}`}>
      <use href={`/svg/sprite.svg#${name}`} />
    </svg>
  );
};

export default SvgIcon;
