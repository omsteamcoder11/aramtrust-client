"use client";

import { create } from "zustand";

export const useChildStore = create((set) => ({
  selectedChild: null,
  setChild: (child: any) => set({ selectedChild: child }),
}));

