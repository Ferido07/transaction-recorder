export class DateRange {
    private readonly start: Date;
    private readonly end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    isDateWithinRange(date: Date): boolean {
        return this.start <= date && date <= this.end;
    }

    equals(other: DateRange): boolean {
        return this.start === other.start && this.end === other.end;
    }
}
