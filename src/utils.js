const slugToAnchor = (slug) => `#${slug.substring(1, slug.length - 1)}`;

const getRandomIndex = (max) => Math.floor(Math.random() * max);
const getRandomShift = ({
  from, offset, to, alwaysPositive
}) => {
  let min = from - offset;
  if (alwaysPositive && min < 0) {
    min = 0;
  }

  let max = from + offset;
  if (max > to) {
    max = to;
  }

  return Math.floor(Math.random() * (max - min) + min);
};

const slugToTitle = (slug) => {
  if (slug === '/') {
    return 'Main page';
  }

  const title = slug
    .substring(1)
    .split('-')
    .map((str) => `${str[0].toUpperCase()}${str.substring(1)}`)
    .join(' ');

  return title.endsWith('/') ? title.substring(0, title.length - 1) : title;
};

export {
  slugToAnchor, slugToTitle, getRandomIndex, getRandomShift
};
