'use client';

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function Home() {
  const [rotations, setRotations] = useState<number>(1200);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [resistance, setResistance] = useState<number>(5);
  const [durationSec, setDurationSec] = useState<number>(600);
  const [batteryCapacityWh, setBatteryCapacityWh] = useState<number>(50);

  function computeMetrics() {
    const tauNm = 3 + 2 * (resistance - 1); // 3..21 N·m
    const workJ = rotations * tauNm * 2 * Math.PI; // J = τ * θ
    const wh = workJ / 3600; // Wh
    const pAvgW = durationSec > 0 ? workJ / durationSec : 0; // W
    const batteryPct = Math.min(100, Math.max(0, (wh / batteryCapacityWh) * 100));
    const MET = 3 + 0.7 * resistance; // ~3.7..10 MET
    const kcal = MET * weightKg * (durationSec / 3600);
    return { workJ, wh, pAvgW, batteryPct, kcal };
  }

  const metrics = useMemo(computeMetrics, [rotations, weightKg, resistance, durationSec, batteryCapacityWh]);

  function useAnimatedNumber(value: number, opts: { duration?: number } = {}) {
    const mv = useMotionValue(0);
    const [display, setDisplay] = useState(0);
    useEffect(() => {
      const controls = animate(mv, value, { duration: opts.duration ?? 0.6, ease: [0.2, 0.8, 0.2, 1] });
      const unsub = mv.on("change", (v) => setDisplay(v));
      return () => {
        controls.stop();
        unsub();
      };
    }, [value]);
    return Math.round(display * 100) / 100;
  }

  const animWh = useAnimatedNumber(metrics.wh);
  const animJ = useAnimatedNumber(metrics.workJ);
  const animPct = useAnimatedNumber(metrics.batteryPct);
  const animKcal = useAnimatedNumber(metrics.kcal);
  const animP = useAnimatedNumber(metrics.pAvgW);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <main className="w-full max-w-5xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Pedal Generator Simulator</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Adjust inputs to see real-time energy, battery, and calorie metrics with smooth animations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-6">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Inputs</h2>
            <div className="mt-4 space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Pedal rotations</label>
                <input type="number" min={0} value={rotations} onChange={(e) => setRotations(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">User weight (kg)</label>
                <input type="number" min={30} max={200} value={weightKg} onChange={(e) => setWeightKg(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Resistance level (1–10)</label>
                <input type="range" min={1} max={10} value={resistance} onChange={(e) => setResistance(Number(e.target.value))} className="mt-2 w-full" />
                <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Current: <span className="font-semibold">{resistance}</span></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Duration (seconds)</label>
                <input type="number" min={1} value={durationSec} onChange={(e) => setDurationSec(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Battery capacity (Wh)</label>
                <input type="number" min={1} value={batteryCapacityWh} onChange={(e) => setBatteryCapacityWh(Number(e.target.value))} className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-6">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">Real-time Metrics</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Energy</div>
                <div className="mt-1 text-3xl font-semibold text-zinc-900 dark:text-zinc-50"><motion.span>{animWh.toFixed(2)}</motion.span> Wh</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">({animJ.toFixed(0)} J)</div>
              </div>
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Battery Restored</div>
                <div className="mt-1 text-3xl font-semibold text-emerald-600 dark:text-emerald-400"><motion.span>{animPct.toFixed(1)}</motion.span>%</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">capacity: {batteryCapacityWh} Wh</div>
              </div>
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Calories Burned</div>
                <div className="mt-1 text-3xl font-semibold text-rose-600 dark:text-rose-400"><motion.span>{animKcal.toFixed(1)}</motion.span> kcal</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">MET≈ {(3 + 0.7 * resistance).toFixed(1)}</div>
              </div>
              <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800 p-4">
                <div className="text-xs text-zinc-600 dark:text-zinc-400">Avg Power</div>
                <div className="mt-1 text-3xl font-semibold text-indigo-600 dark:text-indigo-400"><motion.span>{animP.toFixed(1)}</motion.span> W</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">duration: {durationSec}s</div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          Calculations use simplified physical and metabolic models. Adjust inputs to explore scenarios; values animate smoothly on change.
        </div>
      </main>
    </div>
  );
}