
import React from 'react';

export function PoweredByBanner() {
  return (
    <div className="py-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        <div className="inline-block">
          <span className="mx-4 text-sm font-semibold text-primary">
            Powered By Blizon Technologies
          </span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-sm font-semibold text-primary">
            Trading with AI Intelligence
          </span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-sm font-semibold text-primary">
            Powered By Blizon Technologies
          </span>
          <span className="mx-4">•</span>
          <span className="mx-4 text-sm font-semibold text-primary">
            Trading with AI Intelligence
          </span>
          <span className="mx-4">•</span>
        </div>
      </div>
    </div>
  );
}

export default PoweredByBanner;
