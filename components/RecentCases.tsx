'use client';

import { useCaseStore } from '@/store/caseStore';

export function RecentCases() {
  const cases = useCaseStore(state => state.cases);
  const recentCases = cases.slice(0, 5);

  return (
    <div className="space-y-8">
      {recentCases.map((c) => (
        <div key={c.id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{c.patientName}</p>
            <p className="text-sm text-muted-foreground">
              {c.status} - Last updated: {new Date(c.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}