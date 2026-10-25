import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ExploreToursMenu({ label, tours }: { label: string; tours: { path: string; label: string }[] }) {
  const navigate = useNavigate();
  return <DropdownMenu defaultOpen>
    <DropdownMenuTrigger asChild>
      <Button size="lg" variant="outline" className="text-base px-8 gap-2 border-primary/30 text-primary hover:bg-primary/10">
        <ChevronDown className="w-5 h-5" />{label}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="bg-card border-border min-w-[220px]">
      {tours.map((tour) => <DropdownMenuItem key={tour.path} onClick={() => navigate(tour.path)} className="cursor-pointer text-foreground hover:text-primary focus:text-primary">{tour.label}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>;
}