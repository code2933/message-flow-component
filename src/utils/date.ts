// [input]invalid time => [output]'Invalid'
export function formateTime(time: number) {
  return new Date(time).toTimeString().split(' ')[0]
}
