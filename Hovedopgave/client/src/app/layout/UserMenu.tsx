import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAccount } from '@/lib/hooks/useAccount';

export default function UserMenu() {
    const { logoutUser, currentUser } = useAccount();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className='size-12 cursor-pointer'>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback className='bg-slate-600'>
                        {currentUser?.displayName}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-gray-700 bg-gray-800 text-yellow-100'>
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                    className='cursor-pointer hover:bg-gray-700 focus:bg-gray-700 focus:text-white'
                    onClick={() => {
                        logoutUser.mutate();
                    }}
                >
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
