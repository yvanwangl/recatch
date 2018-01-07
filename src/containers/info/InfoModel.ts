import { Model, attr } from 'redux-orm';
import { FETCH_USER_SUCCESS, MODIFY_EMAIL_SUCCESS } from './constants';

export interface InfoProps {
    id: string | number;
    username: string;
    email: string;
}

class Info extends Model<InfoProps> {

    static modelName = 'Info';

    static fields = {
        id: attr(),
        username: attr(),
        email: attr()
    };

    static reducer(action: any, Info: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_USER_SUCCESS:
            case MODIFY_EMAIL_SUCCESS:
                Info.upsert({id: payload['_id'], ...payload})
                break;
        }
    }
}

export default Info;