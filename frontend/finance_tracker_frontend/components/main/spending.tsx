import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function SpendingSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Description */}
          <div className="order-2 md:order-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
              Stay on top of your everyday spending
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get real-time insights into your spending patterns. Smart alerts
              warn you before you overspend, and detailed breakdowns help you
              understand where your money goes.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
              Track my spending
            </Button>
          </div>

          {/* Right side: Spending cards preview */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">☕</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Coffee Budget
                      </p>
                      <p className="text-xs text-muted-foreground">$45/month</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    45%
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📦</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Amazon
                      </p>
                      <p className="text-xs text-muted-foreground">$156.50</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-xl border border-destructive/20">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Balance Alert
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Low balance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
