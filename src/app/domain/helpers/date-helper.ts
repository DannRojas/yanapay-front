export class DateHelper {
  public static filterDate(
    dateStart: Date,
    dateEnd: Date,
    date: Date
  ): boolean {
    if (
      date.getFullYear() >= dateStart.getFullYear() &&
      date.getFullYear() <= dateEnd.getFullYear()
    ) {
      if (
        date.getMonth() >= dateStart.getMonth() &&
        date.getMonth() <= dateEnd.getMonth()
      ) {
        if (
          date.getDate() >= dateStart.getDate() &&
          date.getDate() <= dateEnd.getDate()
        ) {
          return true;
        }
      } else return false;
    } else return false;
    return false;
  }
}
