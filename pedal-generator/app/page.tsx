'use client';

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import InfoTooltip from "../components/InfoTooltip";

export default function Home() {
  const [rpm, setRpm] = useState<number>(120); // Revolutions per minute
  const [weightKg, setWeightKg] = useState<number>(75);
  const [resistance, setResistance] = useState<number>(5);
  const [durationSec, setDurationSec] = useState<number>(600);
  const [batteryCapacityWh, setBatteryCapacityWh] = useState<number>(50);

  // Calculate total rotations from RPM and duration
  const rotations = useMemo(() => Math.round((rpm * durationSec) / 60), [rpm, durationSec]);

  function computeMetrics() {
    const tauNm = 3 + 2 * (resistance - 1); // 3..21 N·m
    const workJ = rotations * tauNm * 2 * Math.PI; // J = τ * θ
    const wh = workJ / 3600; // Wh
    const pAvgW = durationSec > 0 ? workJ / durationSec : 0; // W
    const batteryPct = Math.min(100, Math.max(0, (wh / batteryCapacityWh) * 100));
    const MET = 3 + 0.7 * resistance; // ~3.7..10 MET
    const kcal = MET * weightKg * (durationSec / 3600);
    return { workJ, wh, pAvgW, batteryPct, kcal, rotations };
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
      <main className="w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Pedal Generator Simulator</h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Adjust inputs to see real-time energy, battery, and calorie metrics with smooth animations.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">Inputs</h2>
            <div className="mt-4 space-y-4 sm:space-y-5">
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  RPM (Revolutions Per Minute)
                  <InfoTooltip content="Your pedal speed in revolutions per minute. Average: 60-120 RPM. Total rotations = RPM × Duration (minutes)." />
                </label>
                <input 
                  type="number" 
                  min={1} 
                  max={200} 
                  value={rpm} 
                  onChange={(e) => setRpm(Number(e.target.value))} 
                  className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" 
                />
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">Total rotations: {rotations.toLocaleString()}</div>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Duration (seconds)
                  <InfoTooltip content="How long you pedal. Total rotations = RPM × (Duration / 60) is calculated automatically." />
                </label>
                <input 
                  type="number" 
                  min={1} 
                  value={durationSec} 
                  onChange={(e) => setDurationSec(Number(e.target.value))} 
                  className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" 
                />
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{Math.round(durationSec / 60)} minutes</div>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  User weight (kg)
                  <InfoTooltip content="Your body weight. Only used for calorie calculation. Heavier people burn more calories." />
                </label>
                <input 
                  type="number" 
                  min={30} 
                  max={200} 
                  value={weightKg} 
                  onChange={(e) => setWeightKg(Number(e.target.value))} 
                  className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" 
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Resistance level (1–10)
                  <InfoTooltip content="Pedal resistance level. 1 = easy, 10 = very hard. This is a simulation value; real pedal generators depend on motor type, efficiency, and friction losses." />
                </label>
                <input 
                  type="range" 
                  min={1} 
                  max={10} 
                  value={resistance} 
                  onChange={(e) => setResistance(Number(e.target.value))} 
                  className="mt-2 w-full" 
                />
                <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">Current: <span className="font-semibold">{resistance}</span></div>
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Battery capacity (Wh)
                  <InfoTooltip content="Capacity of the battery to be charged. Examples: 50 Wh = small power bank, 500 Wh = e-bike battery." />
                </label>
                <input 
                  type="number" 
                  min={1} 
                  value={batteryCapacityWh} 
                  onChange={(e) => setBatteryCapacityWh(Number(e.target.value))} 
                  className="mt-2 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 outline-none focus:border-zinc-500" 
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100">Real-time Metrics</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2">
              {/* Calories - Featured, larger card */}
              <div className="rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/30 dark:to-rose-800/30 border-2 border-rose-200 dark:border-rose-700 p-4 sm:p-5 sm:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-semibold text-rose-700 dark:text-rose-300 uppercase tracking-wide">Calories Burned</div>
                  <div className="text-xs text-rose-600 dark:text-rose-400">MET ≈ {(3 + 0.7 * resistance).toFixed(1)}</div>
                </div>
                <div className="mt-1 text-3xl sm:text-4xl font-bold text-rose-600 dark:text-rose-400">
                  <motion.span>{animKcal.toFixed(1)}</motion.span> <span className="text-xl sm:text-2xl">kcal</span>
                </div>
                <div className="mt-2 text-xs sm:text-sm text-rose-600/80 dark:text-rose-400/80">
                  Based on your weight ({weightKg} kg) and resistance level
                </div>
              </div>

              {/* Energy - Blue */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-2 border-blue-200 dark:border-blue-700 p-3 sm:p-4">
                <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">Energy</div>
                <div className="mt-1 text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  <motion.span>{animWh.toFixed(2)}</motion.span> <span className="text-lg sm:text-xl">Wh</span>
                </div>
                <div className="text-xs sm:text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">({animJ.toFixed(0)} J)</div>
              </div>

              {/* Battery - Green */}
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-800/30 border-2 border-emerald-200 dark:border-emerald-700 p-3 sm:p-4">
                <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-2">Battery Restored</div>
                <div className="mt-1 text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  <motion.span>{animPct.toFixed(1)}</motion.span><span className="text-lg sm:text-xl">%</span>
                </div>
                <div className="text-xs sm:text-sm text-emerald-600/70 dark:text-emerald-400/70 mt-1">capacity: {batteryCapacityWh} Wh</div>
              </div>

              {/* Avg Power - Purple/Indigo */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-800/30 border-2 border-indigo-200 dark:border-indigo-700 p-3 sm:p-4 sm:col-span-2">
                <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide mb-2">Average Power</div>
                <div className="mt-1 text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  <motion.span>{animP.toFixed(1)}</motion.span> <span className="text-lg sm:text-xl">W</span>
                </div>
                <div className="text-xs sm:text-sm text-indigo-600/70 dark:text-indigo-400/70 mt-1">duration: {Math.round(durationSec / 60)} minutes</div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 sm:mt-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <strong className="font-semibold">Note:</strong> Results are approximate. Real pedal generators depend on motor type, efficiency, friction, and transmission losses. These calculations use simplified physical and metabolic models (MET-based calorie estimation). Adjust inputs to explore different scenarios; values animate smoothly on change.
          </p>
        </div>
      </main>
    </div>
  );
}