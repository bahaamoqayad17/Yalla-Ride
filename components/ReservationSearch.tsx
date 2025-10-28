import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Clock } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { getLocations } from "@/actions/hq-actions";

export default async function ReservationSearch() {
  const locations = await getLocations();
  console.log({ locations });
  return (
    <div className="relative max-w-7xl mx-auto mb-8 px-4 sm:px-6 lg:px-8">
      {/* Gradient Border Container */}
      <div className="relative bg-transparent rounded-2xl">
        <div
          className="backdrop-blur-sm rounded-2xl p-3 sm:p-4"
          style={{
            backgroundColor: "#00091D",
          }}
        >
          <div className="space-y-3 sm:space-y-0">
            {/* Mobile: 2-column grid, Desktop: single row */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row sm:items-center gap-3 sm:gap-2">
              {/* Pickup Location */}
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[150px] sm:min-w-[160px]">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Pickup</span>
              </div>

              {/* Pickup Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer min-w-[120px] sm:min-w-[100px]">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">
                      Pickup Location
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={undefined}
                    onSelect={() => {}}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>

              {/* Pickup Time */}
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 min-w-[100px] sm:min-w-[100px]">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">2:00 am</span>
              </div>

              {/* Return Location */}
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 flex-1 min-w-[150px] sm:min-w-[160px]">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">return</span>
              </div>

              {/* Return Date */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 cursor-pointer min-w-[120px] sm:min-w-[100px]">
                    <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">
                      Return Location
                    </span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                  <CalendarComponent
                    mode="single"
                    selected={undefined}
                    onSelect={() => {}}
                    className="bg-slate-800 text-white"
                  />
                </PopoverContent>
              </Popover>

              {/* Return Time */}
              <div className="flex items-center space-x-2 bg-slate-700/50 rounded-lg p-3 border border-slate-600/50 min-w-[100px] sm:min-w-[100px]">
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">2:00 am</span>
              </div>

              {/* Explore Button - Full width on mobile, auto width on desktop */}
              <Button
                size="lg"
                className="px-6 sm:px-8 lg:px-12 w-full md:w-auto md:col-span-1 sm:col-span-2 hidden md:block"
              >
                Explore
              </Button>
            </div>

            <Button
              size="lg"
              className="px-6 sm:px-8 lg:px-12 w-full md:w-auto md:col-span-1 sm:col-span-2 block md:hidden"
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
