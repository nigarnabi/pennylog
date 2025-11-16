import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function FinancialGoalsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Goal cards */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">
                    Emergency Fund
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    $5,000 of $10,000
                  </p>
                </div>
                <span className="text-2xl">🏦</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-1/2"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Next deposit: $500
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-foreground">
                    Vacation Fund
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    $2,800 of $5,000
                  </p>
                </div>
                <span className="text-2xl">✈️</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-1/2"></div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Next deposit: $300
              </p>
            </div>
          </div>

          {/* Right side: Description */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
              Put your financial goals on autopilot
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Automate your savings with intelligent rules. Set up recurring
              transfers for your goals and watch your progress grow. Penny Log
              keeps you accountable and motivated.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
              Automate my savings
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
