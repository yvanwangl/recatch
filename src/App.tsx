import * as React from 'react';
import { renderRoutes } from 'react-router-config'
import './App.css';

//const logo = require('./logo.svg');
// export interface RouteType {
//     route: RouteConfig[] | undefined
// }

function App({ route }: any) {
    return (
        <div>
            {renderRoutes(route.routes)}
        </div>
    );
}

export default App;
