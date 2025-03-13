"use client";

import React, { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import UserAvatar from "./avatar";
import { suggestedUsers } from "@ui/lib/mockdata";
import { Button } from "@ui/components/ui/button";

const Stories: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setShowLeftScroll(container.scrollLeft > 0);
    setShowRightScroll(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
    setScrollPosition(container.scrollLeft);
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('stories-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#0a0f1c]/40 backdrop-blur-xl rounded-xl p-4 mb-6
                    shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-blue-500/20
                    animate-fade-in">
      {/* Scroll Buttons */}
      {showLeftScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8
                     bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm
                     border border-blue-500/30 rounded-full
                     transition-all duration-300 animate-fade-in"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-5 w-5 text-blue-400" />
        </Button>
      )}
      {showRightScroll && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8
                     bg-blue-500/10 hover:bg-blue-500/20 backdrop-blur-sm
                     border border-blue-500/30 rounded-full
                     transition-all duration-300 animate-fade-in"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-5 w-5 text-blue-400" />
        </Button>
      )}

      {/* Stories Container */}
      <div
        id="stories-container"
        className="flex items-center space-x-4 overflow-x-auto scrollbar-hide pb-2"
        onScroll={handleScroll}
      >
        {/* Create Story Card */}
        <div className="flex-shrink-0 group">
          <div className="relative cursor-pointer">
            <div className="w-28 h-40 rounded-xl bg-gradient-to-b from-blue-500/10 to-blue-500/5
                          border border-blue-500/30 hover:border-blue-500/50
                          flex flex-col items-center justify-center gap-2
                          transition-all duration-300 group-hover:transform group-hover:scale-[1.02]
                          shadow-[0_4px_20px_rgba(0,0,0,0.2)] group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-400
                            flex items-center justify-center shadow-lg
                            group-hover:shadow-blue-500/30 transition-all duration-300">
                <Plus className="w-6 h-6 text-white transform transition-transform duration-300 group-hover:rotate-180" />
              </div>
              <p className="text-sm font-medium text-blue-300/90 group-hover:text-blue-200
                          transition-colors duration-300">
                Create Story
              </p>
            </div>
          </div>
        </div>

        {/* User Stories */}
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex-shrink-0 group">
            <div className="relative cursor-pointer">
              <div className="w-28 h-40 rounded-xl overflow-hidden
                            shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                            transition-transform duration-300
                            group-hover:transform group-hover:scale-[1.02]">
                {/* Story Image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-110"
                />
                
                {/* User Avatar */}
                <div className="absolute top-3 left-3 ring-[3px] ring-blue-500 rounded-full
                              shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                              transform transition-transform duration-300
                              group-hover:scale-110">
                  <UserAvatar src={user.avatar} name={user.name} size="sm" />
                </div>

                {/* User Name */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white truncate
                              transform transition-all duration-300
                              group-hover:translate-y-[-2px]">
                    {user.name}
                  </p>
                  <p className="text-xs text-blue-200/80 truncate mt-0.5
                              transform transition-all duration-300
                              group-hover:translate-y-[-2px]">
                    2h ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;