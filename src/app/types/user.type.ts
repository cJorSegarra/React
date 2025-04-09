export type User = {
    id: number;
    name: string;
    password?: string | null;
};

export type NewUser = Omit<User, "id">;
