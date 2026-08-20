"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Search,
  Layers,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  targetId: string;
  title: string;
  description: string;
  icon: React.ElementType;
  position: "bottom" | "top" | "center";
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "tour-syllabus-target",
    title: "Structured Academic Syllabus",
    description:
      "Explore comprehensive veterinary disciplines, subjects, and topic modules organized for sequential study.",
    icon: BookOpen,
    position: "bottom",
  },
  {
    targetId: "tour-search-target",
    title: "Instant Clinical Search",
    description:
      "Search veterinary reference notes by disease, clinical sign, diagnostic protocol, or drug dosage using '/' or Cmd+K.",
    icon: Search,
    position: "bottom",
  },
  {
    targetId: "tour-academic-areas-target",
    title: "Curriculum Disciplines",
    description:
      "Dive into specific branches including Clinical Sciences, Pre-Clinical Disciplines, Pathology, and Pharmacology.",
    icon: Layers,
    position: "top",
  },
  {
    targetId: "tour-recent-notes-target",
    title: "Clinical Reference Feed",
    description:
      "Discover the latest published diagnostic guidelines, study notes, and peer-referenced surgical protocols.",
    icon: FileText,
    position: "top",
  },
  {
    targetId: "tour-structure-target",
    title: "Knowledge Organization",
    description:
      "Understand how Vetulan connects disciplines to subjects, topic modules, and structured reading articles.",
    icon: Sparkles,
    position: "top",
  },
];

const ONBOARDING_STORAGE_KEY = "vetulan-onboarding-complete";

export function OnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Check if first-time visitor
  useEffect(() => {
    try {
      const isCompleted = localStorage.getItem(ONBOARDING_STORAGE_KEY);
      if (!isCompleted) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage unavailable
    } finally {
      setHasCheckedStorage(true);
    }
  }, []);

  // Keyboard navigation (ESC to close, Arrow keys to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStepIndex]);

  const handleClose = useCallback(() => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    } catch {}
    setIsOpen(false);
  }, []);

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      scrollToTarget(TOUR_STEPS[nextIndex].targetId);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      scrollToTarget(TOUR_STEPS[prevIndex].targetId);
    }
  };

  const scrollToTarget = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const startTour = () => {
    setCurrentStepIndex(0);
    setIsOpen(true);
    scrollToTarget(TOUR_STEPS[0].targetId);
  };

  if (!hasCheckedStorage) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];
  const IconComponent = currentStep.icon;

  return (
    <>
      {/* Floating Re-Open Tour Help Trigger */}
      {!isOpen && (
        <button
          type="button"
          onClick={startTour}
          className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 border border-border text-text-secondary hover:text-primary hover:border-sky-300 text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-150 backdrop-blur-md cursor-pointer"
          aria-label="Start platform tour"
          title="Take quick tour of Vetulan"
        >
          <HelpCircle className="w-3.5 h-3.5 text-primary" />
          <span className="hidden sm:inline">Platform Tour</span>
        </button>
      )}

      {/* Active Onboarding Tour Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-end sm:items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Subtle Screen Dimmer */}
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Tour Card Box */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Platform Tour"
            className="relative pointer-events-auto w-full max-w-md bg-white rounded-2xl border border-border/80 shadow-float p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-primary-subtle text-primary flex items-center justify-center border border-primary/20 shadow-2xs">
                  <IconComponent className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Welcome Tour
                  </span>
                  <span className="text-xs font-semibold text-foreground">
                    Step {currentStepIndex + 1} of {TOUR_STEPS.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-subtle transition-colors cursor-pointer"
                aria-label="Skip and close tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Body */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight mb-2">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Step Indicators & Action Controls */}
            <div className="flex items-center justify-between pt-3 border-t border-border/80">
              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === currentStepIndex
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {currentStepIndex > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    className="h-8 px-3 text-xs rounded-xl"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
                    <span>Back</span>
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 px-3.5 text-xs bg-primary text-white hover:bg-primary-hover rounded-xl"
                >
                  <span>
                    {currentStepIndex === TOUR_STEPS.length - 1
                      ? "Finish"
                      : "Next"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
