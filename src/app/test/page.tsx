"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { TooltipTrigger, Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ArrowRight, HelpCircle, Info } from "lucide-react"
import { useState } from "react"


const page = () => {
  const [clickedService, setClickedService] = useState(null);
  const [steps, setSteps] = useState(1);

  const serviceList = [
    {
      anbefalt: "true",
      service: "Kort hår klypp",
      description: "Professionell klipp av kort hår for en stilig og frisk look.",
      info: ["Passer både for menn og kvinner."]
    },
    {
      anbefalt: "false",
      service: "Lang hår klypp",
      description: "Langvarig klipp og stell for de som ønsker å bevare lengden på håret.",
      info: ["Passer både for menn og kvinner."]
    },
    {
      anbefalt: "false",
      service: "Rensing av hår",
      description: "Dyprengjøring av håret for en frisk og sunn hodebunn.",
      info: ["Passer både for menn og kvinner."]
    }
  ];

  const handleOnClick = (service: string) => {
    setClickedService(service);
    console.log(service)
  }

    return(
      <>
      <MaxWidthWrapper>
        <div className='w-full mt-24 flex justify-center'>
           <div className='flex flex-col items-center gap-2'>
             <h3 className='font-semibold text-3xl'>
               Velg Avtale Type
             </h3>
             <p>Velg en avtaletype hos vår buttik i hamar.</p>
           </div>
         </div>

        <div className='mt-16 flex flex-col items-center gap-2'>
          {/* first list */}
          <TooltipProvider>

          {serviceList.map(
             ({ service, description, info, anbefalt}) => {
              return <div
              key={service}
              onClick={() => handleOnClick(service)}
              className={cn(
                'relative rounded-md bg-white border-gray-200 hover:border-black transition-all p-6 w-full',
                {
                  'border-2 shadow-green-200':
                    anbefalt === "true",
                  'border-2 border-gray-200 mt-3':
                    anbefalt !== "true",
                    'border-black': clickedService === service,
                }
              )}
              >
                 {anbefalt === "true" && (
                    <div className='absolute -top-5 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-black to-black px-3 py-2 text-sm font-medium text-white'>
                      Anbefalt
                    </div>
                  )}

                  <div>
                    <div className="flex justify-between">
                    <h3 className='my-3 text-3xl font-bold'>
                      {service}
                    </h3>
                    <Tooltip
                      delayDuration={300}>
                      <TooltipTrigger className='cursor-default ml-1.5'>
                        <Info className='ml-2 h-5 w-5  text-gray-500' />
                      </TooltipTrigger>
                        <TooltipContent className='w-fit p-2 '>
                          {info}
                        </TooltipContent>
                    </Tooltip>
                    </div>
                    <p>{description}</p>
                  </div>
              </div>
             }
          )}
          </TooltipProvider>

          <Button
            className={buttonVariants({ size: "lg", className: "mt-8 " })}
            disabled={clickedService === null}
          >
            Bestill Time</Button>
        </div>
        </MaxWidthWrapper>
      </>
    )
}

export default page