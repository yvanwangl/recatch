import { Model, attr } from 'redux-orm';
import { FETCH_LABEL_SUCCESS } from './constants';

export interface LabelProps {
    id: string | number;
    name: string;
}

class Label extends Model<LabelProps> {

    static modelName = 'Label';

    static fields = {
        id: attr(),
        name: attr()
    };

    static reducer(action: any, Label: any) {
        let { type, payload: labels } = action;
        switch (type) {
            case FETCH_LABEL_SUCCESS:
                labels.map((label: any)=> {
                    let newLabel = {id: label['_id'], name: label['name']};
                    Label.upsert(newLabel);
                });
                break;
        }
    }
}

export default Label;