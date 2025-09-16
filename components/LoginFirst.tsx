import React from 'react'
import { Card } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'

export default function LoginFirst() {
  return (
    <div className="h-screen w-full flex justify-center items-start">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl sm:mt-80 mt-32">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Login to Continue
          </h1>
          <p className="text-sm text-gray-600">
            Access your account and continue where you left off.
          </p>

          <Link href="/signin" className="w-full">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md">
              Login
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
