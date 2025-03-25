export type UserType = {
    name: string,
    surname: string,
    credentials: {
        username: string,
        passphrase: string,
    },
    active: boolean,
    created: number,
    _comment: string
}
