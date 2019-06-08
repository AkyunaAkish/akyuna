import React, { PureComponent } from 'react';

import SideNav from '../SideNav/SideNav';

class Home extends PureComponent {
    render = () => {
        return (
            <div>
                <SideNav />

                <div className=' home float-right'>            
                    Home
                </div>
            </div>
        );
    };
}

export default Home;