import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
        
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            console.log(bearer);
            
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'u r dolbobeb'});
            } 
            const user = this.jwtService.verify(token);
            req.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException({message: error.message})
        }
    }
}