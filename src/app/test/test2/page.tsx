"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import {add, format} from "date-fns";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface indexProps {}

interface DateTypes {
    justDate: Date | null
    dateTime: Date | null
}

const page = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const daysToAdd = 5;

    const formatDate = (date) => {
        const daysOfWeek = ['søn', 'man', 'tir', 'ons', 'tor', 'fre', 'lør'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayNumber = date.getDate();
    
        return `${dayOfWeek} ${dayNumber}`;
      };

      const formatFullDate = (date) => {
        const daysOfWeek = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayNumber = date.getDate();
        const month = date.toLocaleString('da-DK', { month: 'long' }); // Full month name
        const year = date.getFullYear();
      
        return `${dayOfWeek} ${dayNumber} ${month}, ${year}`;
      };

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentDate(new Date());
        }, 60000); // Update every minute
    
        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(interval);
      }, []);

      const handleDateChange = (direction) => {
        const newDate = new Date(currentDate);
    
        if (direction === 'prev') {
          newDate.setDate(currentDate.getDate() - daysToAdd);
        } else if (direction === 'next') {
          newDate.setDate(currentDate.getDate() + daysToAdd);
        }
    
        setCurrentDate(newDate);
      };

    return(
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
           ): (
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
                            <div key={index} className="text-sm font-semibold hover:font-extrabold hover:text-base transition-all">
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
                <div className="bg-gray-100 w-full p-4">
                    <h3 className="text-center ">
                        date
                    </h3>
                     {/* buttons */}
                    {/*container div dislaying colums that are responsive fks: max-sm:grid-cols-3*/}
                    <div className="grid grid-cols-3 gap-4 mt-6 max-sm:grid-cols-2">
                        <Button className={buttonVariants({size: "sm"})}>12:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>13:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>14:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>15:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>16:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>17:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>18:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>19:00</Button>
                        <Button className={buttonVariants({size: "sm"})}>20:00</Button>
                    </div>
                </div>
            </div>
            </>
           )}

        </>
    )
}

export default page