import { Model, attr } from 'redux-orm';
import { FETCH_LABEL_SUCCESS, FETCH_POST_SUCCESS, ADD_LABEL_SUCCESS, MODIFY_LABEL_SUCCESS, DELETE_LABEL_SUCCESS } from './constants';

export interface LabelProps {
    id: string | number;
    name: string;
}

class Label extends Model<LabelProps> {

    static modelName = 'Label';

    static fields = {
        id: attr(),
        name: attr(),
        bgColor: attr(),
        fontColor: attr(),
        enabled: attr()
    };

    static reducer(action: any, Label: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_LABEL_SUCCESS:
                payload.map((label: any) => Label.upsert({ id: label['_id'], ...label }));
                break;
            case FETCH_POST_SUCCESS:
                payload.lables.map((label: any) => Label.upsert({ id: label['_id'], ...label }));
                break;
            case ADD_LABEL_SUCCESS:
            case MODIFY_LABEL_SUCCESS:
                Label.upsert({ id: payload['_id'], ...payload });
                break;
            case DELETE_LABEL_SUCCESS:
                Label.withId(payload['_id']).delete();
                break;
        }
    }
}

export default Label;