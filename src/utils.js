const slugToAnchor = (slug) => `#${slug.substring(1, slug.length - 1)}`

const slugToTitle = (slug) =>
  slug
    .substring(1)
    .split("-")
    .map((str) => `${str[0].toUpperCase()}${str.substring(1)}`)
    .join(" ")

export { slugToAnchor, slugToTitle }
