export class Data {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public region: string,
        public country: string,
        public representative: string,
        public typeOfCustomer: string,
        public favourited: boolean,
        public viewed: boolean,
    ) {}
}

export const DATA = [
    new Data(1, 'Alfreds Futterkiste', 'Obere Str. 57', 'Europe', 'GER', 'Maria Anders', 'Wholesale', false, true),
    new Data(2, 'Ana Trujillo', 'Avda. de la 2222', 'North America', 'CND', 'Ana Trujillo', 'Retail', true, true),
    new Data(3, 'Antonio Moreno', 'Mataderos 2312', 'North America', 'CND', 'Antonio Moreno', 'Retail', false, true),
    new Data(4, 'Around the Horn', '120 Hanover Sq.', 'Europe', 'UK', 'Thomas Hardy', 'Wholesale', false, true),
    new Data(5, 'Berglunds', 'Berguvsvägen 8', 'Europe', 'UK', 'Christina Berglund', 'Retail', true, true),
    new Data(6, 'Blauer Delikatessen', 'Forsterstr. 57', 'Europe', 'GER', 'Hanna Moos', 'Retail', false, true),
    new Data(7, 'Blondel père et fils', '24, place Kléber', 'Europe', 'FRN', 'Frédérique Citeaux', 'Retail', false, true),
    new Data(8, 'Bónido Comidas', 'C/ Araquil, 67', 'Europe', 'FRN', 'Martín Sommer', 'Retail', false, true),
    new Data(9, "Bon app'", '12, rue des Bouchers', 'Europe', 'FRN', 'Laurence Lebihan', 'Retail', false, true),
    new Data(10, 'Dollar Marketse', '23 Tsawassen Blvd.', 'North America', 'CND', 'Elizabeth Lincoln', 'Retail', false, true),
    new Data(11, "Cactus Comidas", 'Cerrito 333', 'South America', 'BRZ', 'Patricio Simpson', 'Retail', true, true),
    new Data(12, 'Centro Moctezuma', 'Granada 9993', 'North America', 'CND', 'Francisco Chang', 'Retail', false, true),
    new Data(13, 'Chop-suey Chinese', 'Hauptstr. 31', 'Europe', 'GER', 'Yang Wang', 'Retail', false, true),
    new Data(14, 'Comércio Mineiro', 'Av. dos Lusíadas, 23', 'South America', 'BRZ', 'Pedro Afonso', 'Retail', false, true),
    new Data(15, 'Consolidated Holdings', '12 Berkeley Gardens', 'Europe', 'UK', 'Elizabeth Brown', 'Wholesale', false, true),
    new Data(16, 'Drachenblut Delikatessend', 'Walserweg 21', 'Europe', 'GER', 'Sven Ottlieb', 'Retail', false, true),
    new Data(17, 'Du monde entier', '67, rue des Cinquante Otages', 'Europe', 'FRN', 'Janine Labrune', 'Retail', false, true),
    new Data(18, 'Eastern Connection', '35 King George', 'Europe', 'UK', 'Ann Devon', 'Retail', false, true),
    new Data(19, 'Fa monde entier', '88, Cinquante Otages', 'Europe', 'FRN', 'La Qua', 'Retail', false, true),
    new Data(20, 'Faster Connection', '53 King George V', 'Europe', 'UK', 'Charles Clay', 'Retail', false, true),
];