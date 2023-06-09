import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
        
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            const [bearer, token] = authHeader.split(' ');
            
            if(bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'Unauthorized'});
            } 
            const user = this.jwtService.verify(token, {secret: process.env.JWT_ACCESS_SECRET});
            req.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException({message: error.message})
        }
    }
}