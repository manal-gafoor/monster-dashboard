export class Data {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public favourited: boolean,
        public viewed: boolean,
    ) {}
}

export const data = [
    new Data(1, 'Data 1', 'Description 1', false, false),
    new Data(2, 'Data 2', 'Description 2', false, false),
    new Data(3, 'Data 3', 'Description 3', false, false),
];