import { Model, attr } from 'redux-orm';
import { FETCH_LINK_SUCCESS, AUDIT_LINK_SUCCESS } from './constants';

export interface LinkProps {
    id: string | number;
    name: string;
    link: string;
    description: string;
    reason: string;
    status: string;
}

class Link extends Model<LinkProps> {

    static modelName = 'Link';

    static fields = {
        id: attr(),
        name: attr(),
        link: attr(),
        description: attr(),
        reason: attr(),
        status: attr()
    };

    static reducer(action: any, Link: any) {
        let { type, payload } = action;
        switch (type) {
            case FETCH_LINK_SUCCESS:
                payload.map((link: any) => Link.upsert({ id: link['_id'], ...link }));
                break;
            case AUDIT_LINK_SUCCESS:
                Link.upsert({ id: payload['_id'], ...payload });
                break;
        }
    }
}

export default Link;