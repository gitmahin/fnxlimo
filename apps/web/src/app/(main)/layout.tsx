import { Header } from '@/components/core'
import React from 'react'

type MainLayoutPropsType = {
    children: React.ReactNode
}

export default function Layout({
    children
}: MainLayoutPropsType){
  return (
    <>
      <Header/>
      {children}
    </>
  )
}


