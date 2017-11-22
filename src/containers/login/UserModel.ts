import { Model, attr } from 'redux-orm';
import { LOGIN_SUCCESS } from './constants';

export interface UserProps {
    id: number | string;
    userId: string;
    username: string;
    admin: boolean;
}
class User extends Model<UserProps> {

    static modelName = 'User';

    static fields = {
        id: attr(),
        userId: attr(),
        username: attr(),
        admin: attr()
    };

    static reducer(action: any, User: any) {
        const { type, payload: userInfo } = action;
        switch (type) {
            case LOGIN_SUCCESS:
                User.create(userInfo);
                break;
        }
    }
}

export default User;