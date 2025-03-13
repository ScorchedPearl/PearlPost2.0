"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Home, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Sparkles 
} from "lucide-react";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import UserAvatar from "./avatar";
import { useIsMobile } from "@hooks/isMobile";
import { usePathname } from "next/navigation"; 
import { User } from "gql/graphql";

export default function Header({user}:{user:User}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname(); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-500 ${
          scrolled 
            ? "bg-[#0a0f1c]/90 backdrop-blur-xl shadow-lg border-b border-blue-500/30" 
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-blue-400" />
            <span className="text-white text-lg font-semibold tracking-wide">PostPearl</span>
          </Link>

          {!isMobile && (
            <nav className="flex items-center space-x-6">
              <NavItem icon={<Home className="h-5 w-5" />} label="Home" path="/" active={pathname === "/"} />
              <NavItem icon={<Users className="h-5 w-5" />} label="Network" path="/network" active={pathname === "/network"} />
              <NavItem icon={<Briefcase className="h-5 w-5" />} label="Jobs" path="/jobs" active={pathname === "/jobs"} />
              <NavItem icon={<MessageSquare className="h-5 w-5" />} label="Messages" path="/messages" active={pathname === "/messages"} />
              <NavItem icon={<Bell className="h-5 w-5" />} label="Notifications" path="/notifications" active={pathname === "/notifications"} />
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isMobile && (
              <div className="relative group">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400 transition-all group-hover:text-blue-300" />
                <Input
                  placeholder="Search..."
                  className="w-40 bg-[#131b2e]/50 border border-blue-500/30 
                             focus:w-64 transition-all duration-300 pl-9 
                             text-white placeholder-blue-200/50 focus-visible:ring-2 
                             focus-visible:ring-blue-500/50 rounded-full shadow-md"
                />
              </div>
            )}


            <UserAvatar src={user.profileImageURL} name={user.name} size="sm" />
            
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        </div>
      </header>


      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0f1c]/95 backdrop-blur-lg shadow-lg border-t border-blue-500/30">
          <div className="flex justify-around py-3">
            <NavItem icon={<Home className="h-6 w-6" />} label="Home" path="/" active={pathname === "/"} />
            <NavItem icon={<Users className="h-6 w-6" />} label="Network" path="/network" active={pathname === "/network"} />
            <NavItem icon={<Briefcase className="h-6 w-6" />} label="Jobs" path="/jobs" active={pathname === "/jobs"} />
            <NavItem icon={<MessageSquare className="h-6 w-6" />} label="Messages" path="/messages" active={pathname === "/messages"} />
            <NavItem icon={<Bell className="h-6 w-6" />} label="Notifications" path="/notifications" active={pathname === "/notifications"} />
          </div>
        </nav>
      )}
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, active }) => {
  return (
    <Link href={path} passHref>
      <Button
        variant="ghost"
        className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 ${
          active
            ? "bg-blue-500/20 text-blue-300 shadow-md border border-blue-500/40" 
            : "text-blue-300/70 hover:bg-blue-500/10 hover:text-blue-200"
        }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Button>
    </Link>
  );
};

