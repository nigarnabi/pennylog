import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
            The money app that works for you
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Penny Log helps you track spending, organize your budget, and
            understand your financial habits. Built to give you clarity and
            control.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
            Start tracking smarter
          </Button>
        </div>

        {/* Right side: Dashboard preview */}
        <div className="flex justify-center">
          <div className="bg-card rounded-3xl shadow-lg p-6 w-full max-w-sm border border-border">
            <div className="bg-accent/10 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-foreground">Monthly Spend</h3>
                <span className="text-sm text-muted-foreground">Nov 2025</span>
              </div>
              <div className="text-3xl font-bold text-primary">$2,450</div>
              <div className="h-24 bg-gradient-to-t from-primary/20 to-primary/5 rounded-lg flex items-end justify-between px-2 py-2">
                <div
                  className="w-1 bg-primary rounded-full"
                  style={{ height: "40%" }}
                ></div>
                <div
                  className="w-1 bg-primary rounded-full"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="w-1 bg-primary rounded-full"
                  style={{ height: "50%" }}
                ></div>
                <div
                  className="w-1 bg-primary rounded-full"
                  style={{ height: "75%" }}
                ></div>
                <div
                  className="w-1 bg-primary rounded-full"
                  style={{ height: "55%" }}
                ></div>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Groceries</span>
                <span className="font-semibold text-foreground">$450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="text-sm text-foreground">Entertainment</span>
                <span className="font-semibold text-foreground">$280</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
