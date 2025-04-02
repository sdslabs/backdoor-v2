'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <Image
        src="/backdoor.png"
        alt="backdoor"
        width={150}
        height={40}
        className="h-8 w-auto"
      />
      <div className="flex items-center space-x-8">
        <div className="flex items-center text-gray-400">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12L11 14L15 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Challenges
        </div>
        <div className="flex items-center text-white">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M3 21C3 17.134 7.13401 14 12 14C16.866 14 21 17.134 21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Leaderboard
        </div>
        <div className="flex items-center text-gray-400">
          <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 17H9V10H15V17Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 7V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 21V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 7H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Notification
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="rounded-full p-2 h-10 w-10 bg-secondary border-gray-700 hover:bg-gray-800"
        >
          <Search className="h-5 w-5 text-gray-400" />
        </Button>
        <Button
          variant="outline"
          className="rounded-full p-2 h-10 w-10 bg-secondary border-gray-700 hover:bg-gray-800"
        >
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4C12.5523 4 13 4.44772 13 5V5.01C13 5.56228 12.5523 6.01 12 6.01C11.4477 6.01 11 5.56228 11 5.01V5C11 4.44772 11.4477 4 12 4Z"
              fill="currentColor"
            />
            <path
              d="M12 8C12.5523 8 13 8.44772 13 9V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V9C11 8.44772 11.4477 8 12 8Z"
              fill="currentColor"
            />
          </svg>
        </Button>
        <div className="rounded-full bg-orange-500 text-white font-bold h-10 w-10 flex items-center justify-center">
          R
        </div>
      </div>
    </div>
  );
}
