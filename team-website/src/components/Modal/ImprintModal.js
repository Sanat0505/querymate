import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ImprintModal() {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-white py-2 px-4 text-sm font-semibold text-black focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Imprint
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 lg:p-10 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle className="font-medium text-black">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">Imprint</span>
                  <XMarkIcon
                    className="text-black h-6 w-6 hover:cursor-pointer"
                    onClick={close}
                  />
                </div>
              </DialogTitle>
              <div className="mt-4 text-black space-y-4">
                <h2 className="font-bold">Administration</h2>
                <p>
                  Team TechBlend <br />
                  Str. der Nationen 62 <br />
                  09111, Chemnitz, Germany <br />
                  Mobile: +49 176 48733397 <br />
                  team.techblend@gmail.com
                </p>
                <h2 className="font-bold">Responsible person</h2>
                <p>Sanatkumar Kakadiya</p>
                <h2 className="font-bold">Disclaimer</h2>
                <p className="leading-relaxed text-justify">
                  This site is for team website for simulated project for educational purposes
                  within the Planspiel-2024/2025 Web Engineering at the Technical
                  University of Chemnitz. It is not affiliated with an actual
                  business.
                </p>
              </div>
              <div className="mt-6">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-black py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
