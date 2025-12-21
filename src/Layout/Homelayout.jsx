import React from 'react';
import Herolayout from './Herolayout';
import Mosthypecontest from '../Component/Mosthypecontest';
import WinnerBanner from '../Component/Winnerbanner';
import Extrastatic from '../Component/Extrastatic';

const Homelayout = () => {
    return (
        <div>
            <Herolayout></Herolayout>
            <Mosthypecontest></Mosthypecontest>
            <WinnerBanner></WinnerBanner>
            <Extrastatic></Extrastatic>
        </div>
    );
};

export default Homelayout;