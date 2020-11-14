export class DateRange {
    private readonly start: Date;
    private readonly end: Date;

    constructor(start: Date, end: Date) {
        this.start = start;
        this.end = end;
    }

    static BEGINNING_OF_DATE: Date = new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 0));

    isDateWithinRange(date: Date): boolean {
        return this.start <= date && date <= this.end;
    }

    equals(other: DateRange): boolean {
        return this.start === other.start && this.end === other.end;
    }

    get startDate(): Date {
        return new Date(this.start);
    }

    get endDate(): Date {
        return new Date(this.end);
    }
}
