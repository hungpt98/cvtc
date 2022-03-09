export const getDateByTimestamp = (timestamp) => {
  if (typeof timestamp !== 'number' || !timestamp) return new Date()

  const dateTime = new Date(timestamp * 1000)
  const date = new Date(timestamp)

  const hhMMss = dateTime.toLocaleTimeString('vi-VN')
  const ddMMyy = date.toLocaleDateString('vi-VN')

  return {
    hhMMss,
    ddMMyy,
  }
}
