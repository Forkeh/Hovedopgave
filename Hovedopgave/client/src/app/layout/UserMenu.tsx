import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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
                    <AvatarFallback className='bg-slate-500'>
                        {currentUser?.displayName}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
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
