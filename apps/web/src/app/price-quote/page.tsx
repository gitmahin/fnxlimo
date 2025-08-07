import React from 'react'
import { TogglePQType } from './toggle-pg-type'
import { Input, Label } from '@fnx/ui'
import { Calendar29 } from './date-picker'

const PriceQuote = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='mt-28 flex justify-center gap-5 items-center defualt_layout_width'>
        <div className='w-full border rounded-2xl h-[300px] '>
          <div className='px-5 py-5 flex justify-between items-start'>
              <h2 className='text-xl font-medium'>Price Quote</h2>
              <div>
                <TogglePQType/>
              </div>
          </div>

          <div className='border-t flex justify-center items-center gap-5 px-5 py-5 border-b'>
<Calendar29/>

<div className="flex flex-col gap-3">
   
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="10:30:00"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
          </div>

        </div>
        <div className='max-w-[500px] h-[300px] w-full border overflow-hidden rounded-2xl '>
          <div className='w-full h-[50px] px-4 flex justify-start items-center border-b bg-accent'>
            <h2 className='text-xl font-medium'>Route Map</h2>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default PriceQuote
