export const sortOpts = [
  {
    name: 'Best Selling',
    sortKey: 'best_selling',
    reverse: false
  },
  {
    name: 'Newest',
    sortKey: 'created_at',
    reverse: true
  },
  {
    name: 'Oldest',
    sortKey: 'created_at',
    reverse: false
  },
  {
    name: 'Price (Low > High)',
    sortKey: 'price',
    reverse: false
  },
  {
    name: 'Price (High > Low)',
    sortKey: 'price',
    reverse: true
  },
  {
    name: 'Title (A - Z)',
    sortKey: 'title',
    reverse: false
  },
  {
    name: 'Title (Z - A)',
    sortKey: 'title',
    reverse: true
  }
];
