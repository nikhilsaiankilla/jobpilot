import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-blue-50 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card border border-blue-400 shadow-sm">
        <CardHeader>
          <CardDescription className="text-blue-700">Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-blue-800 @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="border-blue-300 text-blue-700">
              <IconTrendingUp className="text-blue-500" />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm text-blue-700">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <IconTrendingUp className="size-4 text-blue-500" />
          </div>
          <div className="text-blue-600">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
