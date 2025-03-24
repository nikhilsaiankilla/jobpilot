import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";

export default function CoinBalance() {
    return (
        <Card className="w-auto px-2 py-0.5 shadow-sm bg-blue-50 border border-blue-300 rounded-full">
            <CardContent className="flex items-center gap-1 p-1">
                <Coins className="text-blue-500 w-4 h-4" />
                <h5 className="text-sm font-semibold text-blue-700">10 Coins</h5>
            </CardContent>
        </Card>
    );
}
