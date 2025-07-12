// Template for adding v0.dev components
// Replace this with your actual v0.dev component code

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function CustomV0Component() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>V0.dev Component Template</CardTitle>
        <CardDescription>
          Replace this with your actual v0.dev component code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="input" className="text-sm font-medium">
            Example Input
          </label>
          <Input id="input" placeholder="Enter something..." />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Example Badge</Badge>
          <Badge variant="outline">Another Badge</Badge>
        </div>
        <Button className="w-full">Example Button</Button>
      </CardContent>
    </Card>
  )
}

// To use this component:
// 1. Replace the content above with your v0.dev component code
// 2. Import and use it in your pages like:
//    import { CustomV0Component } from '@/components/CustomV0Component'
//    <CustomV0Component /> 