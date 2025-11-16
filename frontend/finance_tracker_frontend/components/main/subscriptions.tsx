import { Button } from "@/components/ui/button";

export default function SubscriptionsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: Subscription preview */}
          <div className="flex justify-center">
            <div className="bg-card rounded-2xl p-6 border border-border shadow-lg w-full max-w-sm">
              <h4 className="font-semibold text-foreground mb-4">
                Your Subscriptions
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎵</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Spotify
                      </p>
                      <p className="text-xs text-muted-foreground">
                        $12.99/month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎬</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Netflix
                      </p>
                      <p className="text-xs text-muted-foreground">
                        $16.99/month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🛒</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Walmart+
                      </p>
                      <p className="text-xs text-muted-foreground">
                        $14.98/month
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📺</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        Hulu
                      </p>
                      <p className="text-xs text-muted-foreground">
                        $7.99/month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Description */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight text-balance">
              Get control over your subscriptions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Penny Log automatically detects and tracks all your recurring
              payments. Never miss a subscription you forgot about, and easily
              cancel services you don't use anymore.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base">
              Manage my subscriptions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
