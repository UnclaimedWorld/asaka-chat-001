export const parseMessageDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  }
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
  return dateTimeFormat.format(date);
}
export const parseHeaderDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'long'
  }
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options);
  return dateTimeFormat.format(date);
}