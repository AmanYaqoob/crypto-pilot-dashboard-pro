
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sun, Moon, Laptop, User, Settings, LogOut } from 'lucide-react';

export function Header() {
  const { currentUser, signout } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-2">
        {/* Mobile logo - only shown on mobile when sidebar is collapsed */}
        <div className="lg:hidden flex items-center">
          <span className="font-bold text-xl">🚀</span>
          <span className="font-bold ml-2">Crypto Pilot</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              {theme === 'default' && <Moon size={16} />}
              {theme === 'light' && <Sun size={16} />}
              {theme === 'high-contrast' && <Laptop size={16} />}
              <span className="hidden md:inline">Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => changeTheme('default')} className="gap-2">
              <Moon size={16} /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeTheme('light')} className="gap-2">
              <Sun size={16} /> Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeTheme('high-contrast')} className="gap-2">
              <Laptop size={16} /> High Contrast
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {currentUser ? (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(currentUser.name || currentUser.email)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {currentUser.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <User size={16} /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings size={16} /> Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signout} className="flex items-center gap-2 cursor-pointer">
                <LogOut size={16} /> Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
