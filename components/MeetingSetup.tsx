"use client"

import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

export default function MeetingSetup({setIsSetupIsComplete} : {setIsSetupIsComplete: (value: boolean) => void}) {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState<boolean>(false)

    const call = useCall()

    if(!call){
        throw new Error('Call is not available')   
    }

    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMicCamToggledOn])
    
    
  return (
    <div className=' flex h-screen w-full flex-col items-center justify-cener gap-3 text-white'>
        <h1 className='text-2xl font-bold'>
            Setup
        </h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>
                <input type='checkbox' checked = {isMicCamToggledOn} onChange={(e) => e.target.checked} />
                Join with mic and camera off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-green-500 px-4 py-2.5' onClick={() => {
            call.join()

            setIsSetupIsComplete(true)
        }}>
            Join Meeting    
        </Button>
    </div>
  )
}
