const FILTERS = [
  {
    name: 'Newest to Oldest',
    fn: (arr) =>
      [...arr].sort((b, a) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }),
  },
  {
    name: 'Oldest to Newest',
    fn: (arr) =>
      [...arr].sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }),
  },
  {
    name: 'Alphabetically',
    fn: (arr) =>
      [...arr].sort((a, b) =>
        a.language_entry
          .toLowerCase()
          .localeCompare(b.language_entry.toLowerCase())
      ),
  },
  {
    name: 'Reverse Alph.',
    fn: (arr) =>
      [...arr].sort((b, a) =>
        a.language_entry
          .toLowerCase()
          .localeCompare(b.language_entry.toLowerCase())
      ),
  },
  {
    name: 'Hidden',
    fn: (arr) => [...arr].filter((a) => !a.public),
  },
  {
    name: 'No Recordings',
    fn: (arr) => [...arr].filter((a) => a.recordings.length === 0),
  },
  {
    name: 'No Images',
    fn: (arr) => [...arr].filter((a) => a.images.length === 0),
  },
  {
    name: 'No Tags',
    fn: (arr) => [...arr].filter((a) => a.tags.length === 0),
  },
]

export default FILTERS
