import { useState } from "react";
import { CHEFS } from "../data/people";
import { ChefCard } from "../components/cards/ChefCard";
import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";
import { Ornament } from "../components/common/Ornament";

export default function Chefs() {
  const [done, setDone] = useState(false);
  return (
    <>
      <PageBanner title="Our Chef" />
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-8 md:py-20">
        <div className="text-center">
          <p className="flex items-center justify-center gap-2 font-display text-[0.7rem] font-bold uppercase tracking-wider text-brand-orange"><span className="h-px w-5 bg-brand-orange" />Our chefs<span className="h-px w-5 bg-brand-orange" /></p>
          <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">Meet our expert <span className="text-brand-red">chef</span></h2>
          <Ornament className="mt-2" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5">
          {CHEFS.map((c) => <ChefCard key={c.name + c.image} chef={c} />)}
        </div>
        <div className="mt-10 text-center">
          <Button variant="pill" onClick={() => setDone(true)} disabled={done}>{done ? "Whole team shown" : "Load more member"}</Button>
          {done && <p role="status" className="mt-3 text-xs text-neutral-500">That's our whole kitchen team — more chefs joining soon!</p>}
        </div>
      </section>
    </>
  );
}
