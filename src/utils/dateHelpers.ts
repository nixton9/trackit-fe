import moment from 'moment'

export const displayDateString = (date: string) => {
  if (moment(date).isSame(moment(), 'day')) {
    return 'Today'
  } else if (moment(date).isSame(moment().add(1, 'day'), 'day')) {
    return 'Tomorrow'
  } else if (moment(date).isSame(moment().subtract(1, 'day'), 'day')) {
    return 'Yesterday'
  } else {
    return moment(date).format('DD MMM')
  }
}
