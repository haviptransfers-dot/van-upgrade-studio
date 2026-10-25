import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ExploreToursMenu({ label, tours }: { label: string; tours: { path: string; label: string }[] }) {
  const navigate = useNavigate();
  return <DropdownMenu defaultOpen>
    <DropdownMenuTrigger asChild>
      <Button size="lg" variant="ghost" className="home-hero-secondary text-base gap-2 text-foreground hover:bg-foreground/10">
        <ChevronDown className="w-5 h-5" />{label}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="center" className="bg-card border-border min-w-[220px]">
      {tours.map((tour) => <DropdownMenuItem key={tour.path} onClick={() => navigate(tour.path)} className="cursor-pointer text-foreground hover:text-primary focus:text-primary">{tour.label}</DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>;
}