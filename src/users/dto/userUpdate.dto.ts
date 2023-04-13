import { PartialType } from "@nestjs/mapped-types";
import { UserDTO } from "./user.dto";

export class UserUpdateDTO extends PartialType(UserDTO) { 
    
}