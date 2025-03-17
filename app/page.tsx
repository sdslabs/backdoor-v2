"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Bookmark from "@/lib/components/icons/Bookmark";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <main className="bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              <div className="flex items-center space-x-4">
                <h1 className="text-5xl font-bold leading-tight">
                  Be a part of XYZ
                </h1>

                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={() => setIsActive((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <Bookmark hover={isHovered} active={isActive} />
                </div>

                {/* Info Icon */}
              </div>

              {/* Other Content */}
              <p className="text-xl">{"Loading..."}</p>
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-secondary-foreground">
                    Starting Time
                  </h2>
                  <p className="text-xl font-semibold text-muted-foreground"></p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-secondary-foreground">
                    Ending Time
                  </h2>
                  <p className="text-xl font-semibold text-muted-foreground"></p>
                </div>
              </div>

              {/* Register Button */}
              <Link
                href="/register"
                className="inline-block px-8 py-3 text-lg font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-colors duration-200"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
