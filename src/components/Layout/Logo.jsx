import Image from 'next/image';
import logo from '../../assests/logo.png'

const Logo = () => {
    return (
        <div className='flex items-center justify-center'>
            <Image src={logo} className='w-6 lg:w-24' alt="" />
        </div>
    );
};

export default Logo;