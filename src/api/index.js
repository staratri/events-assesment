const events = [
  {
    id: 1,
    name: 'Event 1',
    date: '20-May-2020',
    availableSeats: 10,
    img: '121214.png'
  },
  {
    id: 2,
    name: 'Event 2',
    date: '20-May-2020',
    availableSeats: 5,
    img: '121214.png'
  },
  {
    id: 3,
    name: 'Event 3',
    date: '20-May-2020',
    availableSeats: 15,
    img: '121214.png'
  },
  {
    id: 4,
    name: 'Event 4',
    date: '20-May-2020',
    availableSeats: 0,
    img: '121214.png'
  },
  {
    id: 5,
    name: 'Event 4',
    date: '20-May-2020',
    availableSeats: 0,
    img: '121214.png'
  }
]

export const fetchEvents = async (search = '') => {
  if (search) {
    return events.filter(event => event.name.toLowerCase().includes(search.toLowerCase()))
  }
  return events
}
