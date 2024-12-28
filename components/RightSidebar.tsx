"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  title: string; // Dynamic title
  sections: Array<{
    title: string;
    icon?: ReactNode; // Optional icon for sections
    content: ReactNode; // Content for each section
  }>;
}

export default function RightSidebar({
  isOpen,
  onClose,
  title,
  sections,
}: RightSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-96 bg-muted fixed right-0 top-0 z-50 shadow-lg"
      >
        <SheetHeader className="flex justify-between items-center p-4 border-b">
          <SheetTitle className="text-lg font-semibold">{title}</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                {section.icon && (
                  <div className="h-5 w-5 text-gray-700">{section.icon}</div>
                )}
                <h3 className="text-base font-medium text-muted-foreground">
                  {section.title}
                </h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
