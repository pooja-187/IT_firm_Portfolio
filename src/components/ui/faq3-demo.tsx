"use client";

import React, { useState, useEffect } from "react";
import { Faq3, faqItems } from "@/components/ui/faq3";
import { contentService } from "@/services/ContentService";
import { STORAGE_KEYS } from "@/services/StorageService";
import { FaqItemData } from "@/types/portfolio";

export function Faq3Demo() {
  const [items, setItems] = useState<FaqItemData[]>(faqItems as FaqItemData[]);

  useEffect(() => {
    // Hydrate client-side
    const loaded = contentService.getFaq(true);
    if (loaded && loaded.length > 0) {
      setItems(loaded);
    }

    const unsubscribe = contentService.subscribe(STORAGE_KEYS.FAQ, (updated: FaqItemData[]) => {
      if (updated && Array.isArray(updated)) {
        setItems(updated.filter((f) => f.isPublished !== false));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Faq3
      heading="Questions before we start?"
      items={items}
    />
  );
}

export default Faq3Demo;
