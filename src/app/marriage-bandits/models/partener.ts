export interface Partener{
        _id: string,
        firstName: string,
        lastName: string,
        dateOfBirth: string,
        marriages: [
            {
                dateOfMarriage: string;
                divorce: any
            }
        ]
}