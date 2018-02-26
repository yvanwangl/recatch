import { Model, attr } from 'redux-orm';
import { FETCH_USER_SUCCESS, LOCK_USER_SUCCESS } from './constants';

export interface UserListProps {
    id: string | number;
    username: string;
    email: string;
    admin: boolean;
    status: string;
}

class UserList extends Model<UserListProps> {

    static modelName = 'UserList';

    static fields = {
        id: attr(),
        username: attr(),
        email: attr(),
        admin: attr(),
        status: attr()
    };

    static reducer(action: any, UserList: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_USER_SUCCESS:
                payload.map((user: any) => UserList.upsert({ id: user['_id'], ...user }));
                break;
            case LOCK_USER_SUCCESS:
                UserList.upsert({ id: payload['_id'], ...payload });
                break;
        }
    }
}

export default UserList;