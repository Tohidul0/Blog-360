import { Footer } from 'flowbite-react';
import React from 'react';

function Footercompo(props) {
    return (
        <Footer className='text-center bg-slate-500 -mb-20 p-6 '>
           
        <div  className='text-center mx-auto '>
        <p>&copy; {new Date().getFullYear()} Blog360 By Tohidul. All Rights Reserved.</p>
        <p>Terms of Service | Privacy Policy |<a href='https://github.com/Tohidul0' > Contact Me </a></p>
      </div>
        </Footer>
    );
}

export default Footercompo;