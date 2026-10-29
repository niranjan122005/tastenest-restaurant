import { Button } from "../components/ui/Button";
import { PageBanner } from "../components/ui/PageBanner";

export default function NotFound() {
  return (
    <>
      <PageBanner title="Error Page" crumb="Error" />
      <section className="px-4 py-14 text-center md:py-20">
        <img src="/images/decor/avocado-404.svg" alt="404" className="mx-auto w-64 sm:w-80" />
        <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">Opp's That Page Can't be Found</h2>
        <p className="mx-auto mt-2 max-w-sm text-xs text-neutral-500">It looks like nothing was found at this location. Maybe try one of the links below or a search?</p>
        <Button to="/" variant="dark" className="mt-5">Back to home</Button>
      </section>
    </>
  );
}
