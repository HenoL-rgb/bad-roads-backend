import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'email@email.com', description: 'email'})
    @IsString({message: "Must be string"})
    @IsEmail({}, {message: "Govno email"})
    readonly email: string;

    @ApiProperty({example: '1234', description: 'password'})
    @IsString({message: "Must be string"})
    @Length(4, 16, {message: "4 to 16"})
    readonly password: string;
}