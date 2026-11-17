"use client";

import { useState } from "react";
import Upper from "./components/Upper";
import Lower from "./components/lower";
import MilestoneModal, { MilestoneItem } from "./components/MilestoneModal";

export default function JourneyPage() {
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneItem | null>(null);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Top half / White section (milestones 01 - 03) */}
      <Upper onSelectMilestone={setSelectedMilestone} />

      {/* Bottom half / Black section (milestones 04 - 06) */}
      <Lower onSelectMilestone={setSelectedMilestone} />

      {/* Floating Preview Modal (Text Left, Image Right) */}
      <MilestoneModal
        milestone={selectedMilestone}
        onClose={() => setSelectedMilestone(null)}
      />
    </div>
  );
}
