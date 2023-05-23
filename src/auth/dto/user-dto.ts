import { Role } from "src/roles/roles.model";
import { Route } from "src/routes/routes.model";

export class UserDto {
    email: string;
    id: number;
    banned: boolean;
    banReason: string;
    roles: Role[];
    routes: Route[];
    likes: Route[];
    dislikes: Route[];

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.banned = model.banned;
        this.banReason = model.banReason;
        this.roles = model.roles;
        this.routes = model.routes;
        this.likes = model.likes;
        this.dislikes = model.dislikes;
    }
}