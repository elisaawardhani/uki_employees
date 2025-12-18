import { Employee } from "./employee";

export interface Response {
    success: string;
    message: string;
    data: Employee[]
}
