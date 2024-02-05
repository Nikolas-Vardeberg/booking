"use client"

import { FC, useEffect, useState } from'react'
import ReactCalendar from "react-calendar";
import {add, format} from "date-fns";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Info, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface indexProps {}

interface DateTypes {
    justDate: Date | null
    dateTime: Date | null
}


const index: FC<indexProps> = ({}) => {
  const [clickedService, setClickedService] = useState(null);
  const [steps, setSteps] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDatePassed, setIsDatePassed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const daysToAdd = 5;

  

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

  const handleDateChange = (direction) => {
  const newHeaderDate = new Date(currentDate);

  if (direction === 'prev') {
    newHeaderDate.setDate(newHeaderDate.getDate() - daysToAdd);
  } else if (direction === 'next') {
    newHeaderDate.setDate(newHeaderDate.getDate() + daysToAdd);
  }

  setCurrentDate(newHeaderDate);
};

const handleDateClick = (index) => {
  const clickedDate = new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000);

  // Check if the clicked date is in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to compare only the date part

  if (clickedDate < today) {
    setIsDatePassed(true);
    setSelectedDate(null);
  } else {
    setIsDatePassed(false);
    setSelectedDate(clickedDate);

    // If clicked date is today, log availability for each hour and minute
    if (
      clickedDate.getDate() === today.getDate() &&
      clickedDate.getMonth() === today.getMonth() &&
      clickedDate.getFullYear() === today.getFullYear()
    ) {
      const currentHour = today.getHours();
      const currentMinute = today.getMinutes();
      const remainingHours = 24 - currentHour; // Total hours remaining in the day

      console.log('Availability for each hour and minute:');
      for (let i = currentHour; i < 24; i++) {
        for (let j = (i === currentHour ? currentMinute : 0); j < 60; j++) {
          // Replace this condition with your logic to check availability
          const isAvailable = i > currentHour || (i === currentHour && j >= currentMinute);

          const formattedHour = String(i).padStart(2, '0'); // Format as two digits
          const formattedMinute = String(j).padStart(2, '0'); // Format as two digits

          console.log(`${formattedHour}:${formattedMinute}: ${isAvailable ? 'available' : 'not available'}`);
        }
      }
    }
  }
};

  

  
  
  const formatDate = (date) => {
    const daysOfWeek = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayNumber = date.getDate();

    return `${dayOfWeek} ${dayNumber}`;
  };

  const formatClickedDate = (date) => {
    if (!date) {
      return "No date selected"; // or any default value or message
    }
  
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

    return(
        <div>
            {steps === 1 && (
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
            )}
            {steps === 2 && (
                <>
                    {isLoading ? (
                        <>
                         <div className='w-full mt-24 flex justify-center'>
                            <div className='flex flex-col items-center gap-2'>
                                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                                <h3 className='font-semibold text-xl'>
                                    Henter ledige tidspunkter
                                </h3>
                                <p>You will be redirected automatically.</p>
                            </div>
                        </div>
                        </>
                    ) : (
                        <>
                         <MaxWidthWrapper>
                            <div className='w-full mt-24 flex justify-center'>
                                <div className='flex flex-col items-center gap-2'>
                                    <h3 className='font-semibold text-3xl'>
                                    Velg Tid for din service
                                    </h3>
                                    <p>Velg en avtaletype hos vår buttik i hamar.</p>
                                </div>
                            </div>
                        </MaxWidthWrapper>

                        <div className="mt-12 border w-[600px] max-sm:w-screen mx-auto items-center justify-center flex flex-col">
                            <div className="border-b w-full h-12 mt-2">
                            <div className="flex items-center justify-between m-2">
                                <button
                                    onClick={() => handleDateChange('prev')}
                                    className="flex items-center justify-center "
                                >
                                    <svg className="w-6 h-6 text-gray-900 stroke-current" fill="none">
                                    <path
                                        d="M13.25 8.75L9.75 12l3.5 3.25"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    </svg>
                                </button>

                                {[0, 1, 2, 3, 4].map((index) => (
                                    <div
                                    key={index}
                                    className="text-sm font-semibold hover:font-extrabold cursor-pointer"
                                    onClick={() => handleDateClick(index)}
                                    >
                                        {formatDate(new Date(currentDate.getTime() + index * 24 * 60 * 60 * 1000))}
                                    </div>
                                ))}
                                <button
                                    className="flex items-center justify-center "
                                    onClick={() => handleDateChange('next')}
                                >
                                    <svg className="w-6 h-6 text-gray-900 stroke-current" fill="none">
                                    <path
                                        d="M10.75 8.75l3.5 3.25-3.5 3.25"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    </svg>
                                </button>
                            </div>
                            </div>

                            {/* content */}
                            {isDatePassed ? (
                                <>
                                    <div className='h-80 bg-gray-200 w-full'>
                                        <div className='w-full mt-24 flex justify-center'>
                                            <div className='flex flex-col items-center text-center gap-2'>
                                                <h3 className='font-semibold text-2xl'>
                                                Datoen er ikke tilgjengelig
                                                </h3>
                                                <p>Beklager ulempen. Det kan være at de har utgått eller er utilgjengelige for øyeblikket.</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ): (
                                <>
                                    <div className='h-80 bg-gray-200 w-full'>
                                        <div className='w-full mt-24 flex justify-center'>
                                            <div className='flex flex-col items-center text-center gap-2'>
                                                <h3 className='font-semibold text-2xl'>
                                                    {formatClickedDate(selectedDate)}
                                                </h3>
                                                <p>
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            </div>
                        </>
                    )}
                </>
            )}
            {steps === 3 && (
                <div>
                     <MaxWidthWrapper className='flex flex-col items-center'>
                        <div className='w-full mt-24 flex justify-center'>
                            <div className='flex flex-col items-center gap-2'>
                                <h3 className='font-semibold text-3xl text-center'>
                                    Tell us who is coming
                                </h3>
                                <p>All fields marked with * are mandatory.</p>
                            </div>
                        </div>

                        <div className='mt-12 mb-10 flex flex-col items-center border p-10 bg-gray-50 rounded-lg'>
                            
                        <div className=' w-full'>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="fornavn">First Name*</Label>
                                <Input type="text" id="fornavn" placeholder="First Name" className='outline-none' />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <Label htmlFor="etternavn">Last Name*</Label>
                                    <Input type="text" id="etternavn" placeholder="Last Name" className='outline-none' />
                                </div>
                            </div>
                        </div>

                            <div className="grid w-full items-center mt-5 gap-4">
                                <Label htmlFor="email">Email*</Label>
                                <Input type="email" id="email" placeholder="Email" className='outline-none' />
                            </div>
                            <div className="grid w-full items-center mt-5 gap-4">
                                <Label htmlFor="telefon">Phone*</Label>
                                <Input type="telefon" id="telefon" placeholder="Phone" className='outline-none' />
                            </div>


                        </div>

                        <Button disabled className={buttonVariants({size: "lg"})}>Se Din Booking</Button>

                        </MaxWidthWrapper>
                </div>
            )}
            {steps === 4 && (
                <div>
                    <h1>step 4</h1>
                </div>
            )}
        </div>
    )
}

export default index