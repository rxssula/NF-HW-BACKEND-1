
import { IUser } from '../src/models/User'; // Adjust the path as necessary to point to your IUser interface

declare global {
    namespace Express {
        interface Request {
            user?: IUser; // Use the IUser interface to ensure type consistency
        }
    }
}
