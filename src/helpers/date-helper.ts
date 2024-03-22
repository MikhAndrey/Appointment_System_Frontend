export class DateHelper {
    public static ToLocalISOString(date: Date) {
        const offset: number = date.getTimezoneOffset() * 60 * 1000;
        const localTime = date.getTime() - offset;
        const localDate = new Date(localTime);
        return localDate.toISOString();
    }
}
