import { Link } from 'react-router';
import { Separator } from '@radix-ui/react-separator';

export default function Home() {    
    return (
        <div className='h-screen w-full p-4 flex justify-center items-center gap-2 text-blue-900'>
            <Link to="/sign-in">Sign In</Link>
            <Separator orientation='vertical' className='text-blue-100' />
            <Link to="/sign-up">Sign Up</Link>
        </div>
    );
}
