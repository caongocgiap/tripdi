import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterIcon } from "lucide-react";

export default function AlbumSearch() {
  return (
    <>
      <Label className="text-lg font-bold mb-2 flex items-center gap-2">
        <FilterIcon className="w-4 h-4" />
        Filters
      </Label>
      <div className="border rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label className="text-sm font-bold mb-2 flex items-center gap-2">
              Name Trip
            </Label>
            <Input type="text" placeholder="Name Trip" />
          </div>
          <div>
            <Label className="text-sm font-bold mb-2 flex items-center gap-2">
              Place
            </Label>
            <Input type="text" placeholder="Place" />
          </div>
          <div>
            <Label className="text-sm font-bold mb-2 flex items-center gap-2">
              Date
            </Label>
            <Input type="date" placeholder="Date" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline" className="mr-2">Reset</Button>
          <Button variant="default">Search</Button>
        </div>
      </div>
    </>
  )
}