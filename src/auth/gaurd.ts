import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../auth/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<Roles[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log('Roles required:', roles);       
        console.log('User object:', user);           
        console.log('User roles:', user?.roles);     
        if (!user || !user.roles || roles.every(role => !user.roles.includes(role))) {
            if(!user){
                console.log("error");
            }
            if(!user.roles){
                console.log("error1");
            }
            if(!roles.every(role => !user.roles.includes(role))){
                console.log("error2");
            }
            console.log('User does not have required roles');  
            throw new ForbiddenException("You are not allowed");
        }
        return true;
    }
}
